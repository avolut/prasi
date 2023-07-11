import chalk from "chalk";
import padEnd from "lodash.padend";
import { createRPC } from "rpc";
import { createService } from "service";
import { SERVICE_NAME } from "../../../src/types";
import { srv } from "./glbsrv";
import { server } from "./server";
import { srvAction } from "./action";
import { WSRouteHandler } from "hyper-express";
export type { Websocket } from "hyper-express";
export const createAPIServer = async ({
  name,
  port,
  serverURL,
  cookieKey,
  ws,
}: {
  name: SERVICE_NAME;
  port: number;
  serverURL?: (mode: "dev" | "prod" | "staging") => string;
  cookieKey: string;
  ws?: Record<string, WSRouteHandler>;
}) => {
  return await createService({
    name,
    mode: "single",
    init: async ({ mode }) => {
      srv.name = name;
      srv.port = port;
      srv.cookieKey = cookieKey;
      if (serverURL) {
        srv.serverURL = serverURL(mode);
      }

      if (!srv.serverURL) {
        srv.serverURL = `http://localhost:${port}`;
      }

      await createRPC(name, srvAction);
      await srv.init();

      const running = await server({
        mode,
        port: srv.port,
        name: srv.name,
        cookieKey: srv.cookieKey,
        ws,
      });

      if (typeof running === "string") {
        console.log(
          `${chalk.red("Skipped")} ${chalk.green(
            `${padEnd(srv.name, 12, " ")}`
          )} ${running}`
        );
      } else {
        srv.server = running;
        console.log(
          `${chalk.magenta("Started")} ${chalk.green(
            `${padEnd(srv.name, 12, " ")}`
          )} http://localhost:${srv.port}`
        );
      }
      return srvAction;
    },
  });
};
