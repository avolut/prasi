import { bundler } from "bundler/global";
import { fork, spawn as nativeSpawn } from "child_process";

export type IPty = Awaited<ReturnType<typeof spawn>>;

export const spawn = (
  file: string,
  args: string[],
  opt?: { cwd?: string; ipc?: boolean; silent?: boolean }
) => {
  let proc = opt?.ipc
    ? fork(file, args, {
        cwd: opt?.cwd,
        stdio: "inherit",
        execArgv: ["--enable-source-maps", "--trace-warnings"],
      })
    : nativeSpawn(file, args, {
        cwd: opt?.cwd,
        stdio: opt?.silent === true ? "ignore" : "inherit",
        shell: true,
      });

  const callback = {
    onMessage: (e: any) => {},
    onExit: (e: { exitCode: number; signal: NodeJS.Signals | null }) => {},
  };

  const result = {
    data: {} as any,
    markedRunning: false,
    onMessage: (fn: (e: string) => any) => {
      callback.onMessage = fn;
    },
    proc,
    onExit: (
      fn: (e: { exitCode: number; signal: NodeJS.Signals | null }) => any
    ) => {
      callback.onExit = fn;
    },
    killing: null as null | Promise<void>,
    async kill() {
      await new Promise<void>((resolve) => {
        if (opt?.ipc) {
          proc.on("message", (e) => {
            if (e === "::SPAWN_DISPOSED::") {
              resolve();
            }
          });
          proc.send("::SPAWN_DISPOSE::");
        } else {
          resolve();
        }
      });
    },
  };

  return new Promise<typeof result>((resolve) => {
    if (opt?.ipc) {
      proc.on("message", async (e) => {
        callback.onMessage(e);
      });

      proc.on("exit", async (code, signal) => {
        callback.onExit({
          exitCode: code || 0,
          signal: signal,
        });
      });
      resolve(result);
    } else {
      proc.on("exit", async (code, signal) => {
        callback.onExit({
          exitCode: code || 0,
          signal: signal,
        });
        resolve(result);
      });
    }
  });
};

export const attachSpawnCleanup = (name: string) => {
  process.on("message", async (e) => {
    if (e === "::SPAWN_DISPOSE::") {
      await Promise.all(
        Object.values(bundler.runs).map(async (runs) => {
          runs.forEach(async (run) => {
            await new Promise<void>((resolve) => {
              run.proc.on("message", (e) => {
                if (e === "::SPAWN_DISPOSED::") {
                  resolve();
                }
              });
              if (run.proc.send) run.proc.send("::SPAWN_DISPOSE::");
            });
          });
        })
      );

      try {
        if (process.send) process.send(`::SPAWN_DISPOSED::`);
      } catch (e) {}
      console.log("Exit because of: Process Respawn (restart process)");
      process.exit(0);
    }
  });
};

export interface IDisposable {
  dispose(): void;
}
