import { dir } from "dir";
import { existsAsync } from "fs-jetpack";
import { createRPC } from "rpc";
import { RPCAction } from "rpc/src/types";
import { attachSpawnCleanup } from "utility/spawn";
import { svc } from "./global";
import { MODE, SERVICE_NAME } from "./types";

export const createService = async <T extends RPCAction>(arg: {
  name: SERVICE_NAME;
  mode: "single" | "multi";
  init: (arg: {
    mode: MODE;
    onServiceReady: (fn: () => any) => void;
  }) => Promise<T>;
}): Promise<T> => {
  attachSpawnCleanup(arg.name);
  await svc.init();

  let onServiceReady = async () => {};

  let mode = "dev";
  if (await existsAsync(dir.path("prod"))) mode = "prod";
  if (await existsAsync(dir.path("staging"))) mode = "staging";

  const action =
    (await arg.init({
      mode: mode as any,
      onServiceReady: async (fn) => {
        onServiceReady = fn;
      },
    })) || ({} as T);

  (action as any)._receiveDefinition = (def: any) => {
    svc.definitions = def;
  };


  const definition = genDefinition(action);
  await createRPC(`${arg.name}.${arg.name}`, action);

  await svc.root.identify({ name: arg.name, pid: arg.name, definition });

  await onServiceReady();

  try {
    if (process.send)
      process.send(`::RUNNING|${arg.name}::`, undefined, undefined, (e) => {});
  } catch (e) {}

  return action;
};

const genDefinition = (input: any) => {
  const result = {} as Record<string, "object" | "function" | "proxy">;

  const scan = (input: any, parent: string[]) => {
    if (typeof input === "object") {
      for (const [k, v] of Object.entries(input)) {
        if (typeof v === "function") {
          result[[...parent, k].join(".")] = "function";
        } else if (typeof v === "object") {
          if ((v as any).prototype && v instanceof Proxy) {
            result[[...parent, k].join(".")] = "proxy";
          } else {
            result[[...parent, k].join(".")] = "object";
            scan(v, [...parent, k]);
          }
        }
      }
    }
  };
  scan(input, []);

  return result;
};
