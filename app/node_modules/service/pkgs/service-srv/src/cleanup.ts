import { srv } from "./glbsrv";

export const attachCleanUp = () => {
  let exiting = false;
  function exitHandler(cause: any) {
    if (!exiting) {
      exiting = true;
      if (srv.server) {
        srv.server.close();
      }
      console.log("Exiting because of clean up");
      process.exit(0);
    }
  }

  //do something when app is closing
  process.on("exit", exitHandler.bind(null, { cleanup: true }));

  //catches ctrl+c event
  process.on("SIGINT", exitHandler.bind(null, { exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

  //catches uncaught exceptions
  process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
};
