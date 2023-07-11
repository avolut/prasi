import { DeepProxy } from "@qiwi/deep-proxy";
import { addExitCallback } from "catch-exit";
import chalk from "chalk";
import { dir } from "dir";
import { pkg } from "pkg";
import { connectRPC, createRPC } from "rpc";
import { RPCActionResult } from "rpc/src/types";
import { attachSpawnCleanup } from "utility/spawn";
import type { actions } from "../../app/gen/service/actions";
import { rootAction } from "./src/action";
import { svc } from "./src/global";
import { SERVICE_NAME } from "./src/types";

export * from "./src/create-service";
export * from "./src/service-module";

export const initialize = async (fn: () => Promise<void>) => {
  attachSpawnCleanup("root");

  await pkg.install(dir.path(), { deep: true });
  process.removeAllListeners("warning");

  const root = await createRPC("root", rootAction);
  await svc.init();

  await fn();

  if (process.send) process.send("::RUNNING::");

  if ((await connectRPC("base")).connected) {
  } else {
    addExitCallback(() => {
      root.destroy();
    });
  }
};

type ProcessAction = {
  isRunning: boolean;
  start: () => Promise<boolean>;
  restart: () => Promise<boolean>;
  stop: () => Promise<boolean>;
};

const manageProcess = (name: SERVICE_NAME, pid?: string) => {
  return {
    get isRunning() {
      return false;
    },
    async start() {
      return await svc.root.start({ name, pid: pid || name });
    },
    async restart() {
      return true;
    },
    async stop() {
      return true;
    },
  } as ProcessAction;
};

const executeAction = (arg: { name: string; pid?: string; entry: string }) => {
  const { name, entry } = arg;
  let pid = arg.pid || name;
  const def = svc.definitions[name];

  if (def) {
    if (def[entry] === "function") {
      return async (...args: any[]) => {
        return await svc.root.executeAction({
          name: name as SERVICE_NAME,
          pid,
          path: [entry],
          args,
        });
      };
    } else if (def[entry] === "object") {
      return new DeepProxy({}, ({ path, key, PROXY }) => {
        const objkey = [entry, ...path, key as string];

        if (def[objkey.join(".")] === "function") {
          return async (...args: any[]) => {
            return await svc.root.executeAction({
              name: name as SERVICE_NAME,
              pid,
              path: objkey,
              args,
            });
          };
        }
        return PROXY({});
      });
    }
  } else {
    console.error(
      `Failed to call ${chalk.magenta(
        `service.${name}.${entry}`
      )}\n Service ${chalk.green(
        name
      )} not started yet. \n\n Please put your service call inside onServiceReady(() => {})`
    );
  }
};

export const service = new DeepProxy({}, ({ PROXY, path, key }) => {
  return PROXY({}, ({ path, key, PROXY }) => {
    if (key === "then") return PROXY({});

    if (key === "_process" || key === "_all") {
      return manageProcess(path[0] as any);
    }

    if (key === "_pid") {
      return PROXY({}, ({ path, key }) => {
        const pid = key as string;
        return PROXY({}, async ({ key }) => {
          if (key === "_process") {
            return manageProcess(path[0] as any, key as string);
          }

          return executeAction({
            name: path[0],
            pid: pid,
            entry: key as string,
          });
        });
      });
    }

    return executeAction({ name: path[0], entry: key as string });
  });
}) as {
  [K in keyof actions]: actions[K]["type"] extends "single"
    ? RPCActionResult<actions[K]["action"]> & { _process: ProcessAction }
    : {
        _pid: Record<
          string,
          RPCActionResult<actions[K]["action"]> & {
            _process: Omit<ProcessAction, "start" | "isRunning">;
          }
        >;
        _all: Omit<ProcessAction, "start" | "isRunning">;
        _start: ProcessAction["start"];
      };
};
