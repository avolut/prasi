import commandExists from "command-exists";
import { existsSync } from "fs";
import { spawn } from "utility/spawn";
import { bundler } from "./global";

export const runner = {
  get list() {
    return bundler.runs;
  },
  async dispose() {
    const all = Object.values(bundler.runs).map(async (runs) => {
      runs.forEach(async (run) => {
        await run.kill();
      });
    });
    return await Promise.all(all);
  },
  async restart(path: keyof typeof bundler.runs) {
    if (!bundler.restart) {
      bundler.restart = new Set();
    }
    bundler.restart.add(path);
    if (bundler.runs[path]) {
      bundler.runs[path].forEach(async (run) => {
        const data = run.data;
        await this.stop(path);
        await runner.run(data.arg);
        bundler.restart.delete(path);
      });
    } else if (bundler.lastRunArgs[path]) {
      await runner.run(bundler.lastRunArgs[path]);
      bundler.restart.delete(path);
    } else {
      bundler.restart.delete(path);

      return false;
    }
  },
  async stop(path: keyof typeof bundler.runs) {
    return new Promise<boolean>((resolve) => {
      if (!bundler.runs[path]) {
        resolve(true);
      } else {
        bundler.runs[path].forEach((run) => {
          run.onExit(() => resolve(true));
          run.kill();
          bundler.runs[path].delete(run);
          if (bundler.runs[path].size === 0) delete bundler.runs[path];
        });
      }
    });
  },
  async run(arg: {
    path: string;
    args?: string[];
    onStop?: (e: {
      exitCode: number;
      signal: NodeJS.Signals | null;
    }) => unknown;
    onPrint?: (stdout: string) => any;
    cwd: string;
    silent?: boolean;
  }) {
    try {
      const { path, args, cwd, onStop } = arg;

      let isCommand = false;

      if (!existsSync(path)) {
        if (await commandExists(path)) {
          isCommand = true;
        }
      }

      if (!bundler.runs[path]) {
        bundler.runs[path] = new Set();
      }
      if (!bundler.lastRunArgs) {
        bundler.lastRunArgs = {};
      }

      bundler.lastRunArgs[path] = arg;

      const run = await spawn(path, args || [], {
        cwd,
        ipc: isCommand ? false : true,
        silent: arg.silent,
      });
      bundler.runs[path].add(run);
      run.data = {
        arg,
      };

      run.onExit(async (e) => {
        if (onStop) await onStop(e);

        bundler.runs[path].delete(run);
        if (bundler.runs[path].size === 0) delete bundler.runs[path];

        if (bundler.restart && !bundler.restart.has(path)) {
          this.run(arg);
        }
      });

      let resolved = false;

      return await new Promise<boolean>((resolve) => {
        if (!isCommand) {
          run.onMessage((e) => {
            if (!resolved) {
              resolved = true;
              resolve(true);
            }
          });
        } else {
          resolve(true);
        }
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

export type Running = ReturnType<typeof runner.run>;
