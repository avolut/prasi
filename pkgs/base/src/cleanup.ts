import { bundler } from "bundler/global";
import { baseGlobal } from "./action";

export const attachCleanUp = () => {
  let exiting = false;
  function exitHandler(this: { cause: string }, code: any) {
    if (!exiting) {
      exiting = true;
      if (bundler.bundlers) {
        bundler.bundlers.forEach((ctx) => {
          ctx.dispose();
        });
      }

      if (baseGlobal.parcels) {
        baseGlobal.parcels.forEach((e) => e.kill(9));
      }

      if (bundler.runs) {
        for (const runs of Object.values(bundler.runs)) {
          runs.forEach(async (run) => {
            await run.kill();
          });
        }
      }
      console.log("Exit because of:", this.cause);
      process.exit(typeof code === "number" ? code : 0);
    }
  }

  //do something when app is closing
  process.on(
    "exit",
    exitHandler.bind({ cause: "NORMAL EXIT -> process.exit(0)" })
  );

  //catches ctrl+c event
  process.on("SIGINT", exitHandler.bind({ cause: "SIGINT (ctrl+c)" }));

  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind({ cause: "SIGUSR1" }));
  process.on("SIGUSR2", exitHandler.bind({ cause: "SIGUSR1" }));

  //catches uncaught exceptions
  process.on(
    "uncaughtException",
    exitHandler.bind({ cause: "UNCAUGHT EXCEPTION" })
  );
};
