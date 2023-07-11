import { runner } from "bundler/runner";
import chalk from "chalk";
import { dir } from "dir";
import get from "lodash.get";
import { connectRPC } from "rpc";
import { svc } from "./global";
import { SERVICE_NAME } from "./types";

const rpc = {} as Record<string, any>;

export const rootAction = {
  async start(arg: { name: SERVICE_NAME; pid: string }) {
    const running = await runner.run({
      path: dir.path(`${arg.name}/index.js`),
      args: [arg.pid],
      cwd: dir.path(),
    });

    if (!running) {
      console.log(
        `${chalk.red(`Failed`)} to start ${chalk.cyan(
          arg.name
        )}: Service not found`
      );
    }
    return running;
  },
  async restart(arg: { name: SERVICE_NAME; pid?: string }) {
    return await runner.restart(dir.path(`${arg.name}/index.js`));
  },
  async identify({
    name,
    pid,
    definition,
  }: {
    name: SERVICE_NAME;
    pid: string;
    definition: Record<string, "object" | "function" | "proxy">;
  }) {
    svc.definitions[name] = definition;
    rpc[`${name}.${pid}`] = await connectRPC(`${name}.${pid}`, {
      waitConnection: true,
    });

    for (const [_, v] of Object.entries(rpc)) {
      await v._receiveDefinition(svc.definitions, {
        __retryTimeout: 1000,
      });
    }
  },
  async executeAction(arg: {
    name: SERVICE_NAME;
    pid: string;
    path: string[];
    args: any;
  }) {
    return await get(
      rpc[`${arg.name}.${arg.pid}`],
      arg.path.join(".")
    )(...arg.args);
  },
};
