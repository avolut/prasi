import { RPCAction, RPCServerAction } from "./types";
import { Server, Websocket as WSServer } from "hyper-express";
import { config } from "./config";
import { WebSocket as WSClient } from "ws";
import getPort, { portNumbers } from "get-port";
import { DeepProxy } from "@qiwi/deep-proxy";
import { createId } from "@paralleldrive/cuid2";
import get from "lodash.get";
import chalk from "chalk";
import PrettyError from "pretty-error";

const pe = new PrettyError();

type ActionMsg = {
  type: "action";
  path: string[];
  args: any;
  msgid: string;
  clientid?: string;
};

export type ActionResult = {
  type: "action-result";
  result: any;
  error: any;
  msgid: string;
  clientid: string;
};

function getRandomArbitrary(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
export const createRPC = async <T extends RPCAction>(
  name: string,
  action: T,
  opt?: {
    isMain?: boolean;
  }
) => {
  let srv: null | Awaited<ReturnType<typeof createServer>> = null;
  if (!config.port) {
    config.port = await getPort({
      port: portNumbers(getRandomArbitrary(11000, 14000), 19000),
    });
    srv = await createServer();
  }

  let ws = await connect(name, action);
  if (!ws) {
    srv = await createServer();
    ws = await connect(name, action);
  }

  if (opt?.isMain && !srv) {
    console.log(
      `
Royal is already running.
Make sure to kill running instance before starting.

`
    );
    process.exit(1);
  }

  return new DeepProxy(action, ({ target, PROXY, key, path, handler }) => {
    if (key) {
      if (key === "destroy") {
        return () => {
          if (srv) {
            srv.close();
          }
        };
      }
      if (key === "then") {
        return PROXY({}, handler, path);
      }

      if (typeof target[key] === "function") {
        return target[key];
      }

      return PROXY(target[key], handler, path);
    }
    return undefined;
  }) as unknown as RPCServerAction<T>;
};

const connect = (name: string, action: RPCAction) => {
  return new Promise<false | WSClient>((resolve) => {
    const ws = new WSClient(`ws://localhost:${config.port}/create/${name}`);
    setTimeout(() => {
      if (ws.readyState !== ws.OPEN) {
        ws.close();
        resolve(false);
      }
    }, 500);
    ws.on("open", () => {
      ws.send(JSON.stringify({ type: "identify", name }));
      ws.on("message", async (raw: string) => {
        const msg = JSON.parse(raw) as ActionMsg;

        if (msg.type === "action") {
          const fn = get(action, msg.path.join("."));

          if (typeof fn === "undefined") {
            ws.send(
              JSON.stringify({
                type: "action-result",
                error: {
                  msg: `${chalk.red(`ERROR`)}: Function ${chalk.cyan(
                    msg.path.join(".")
                  )} not found in ${chalk.green(name)} action`,
                },
                clientid: msg.clientid,
                msgid: msg.msgid,
              })
            );
          }

          if (typeof fn === "function") {
            let result = undefined as any;
            let error = undefined as any;

            try {
              result = await fn(...msg.args);
            } catch (e: any) {
              if (typeof e === "string") {
                error = { msg: e };
              } else {
                error = { msg: e?.message || "" };
              }
            }

            const final = JSON.stringify({
              type: "action-result",
              result,
              error,
              clientid: msg.clientid,
              msgid: msg.msgid,
            });

            ws.send(final);
          }
        }
      });

      resolve(ws);
    });
    ws.on("close", () => {
      resolve(false);
    });
    ws.on("error", () => {
      resolve(false);
    });
  });
};

const createServer = async () => {
  const MAX_BODY = Number.MAX_SAFE_INTEGER;
  const server = new Server({
    max_body_length: MAX_BODY,
    auto_close: true,
    trust_proxy: true,
    fast_buffers: true,
  });
  const conns = {} as Record<
    string,
    { server: null | WSServer; clients: Set<WSServer> }
  >;

  server.ws("/create/:name", { max_payload_length: MAX_BODY }, (ws) => {
    ws.on("message", (raw) => {
      const msg = JSON.parse(raw) as
        | { type: "identify"; name: string }
        | ActionResult;

      if (msg.type === "identify") {
        if (!conns[msg.name]) {
          conns[msg.name] = {
            server: null,
            clients: new Set(),
          };
        }
        conns[msg.name].server = ws;

        conns[msg.name].clients.forEach((ws) => {
          ws.send(
            JSON.stringify({
              type: "connected",
              serverConnected: true,
            })
          );
        });
      } else if (msg.type === "action-result") {
        for (const v of Object.values(conns)) {
          v.clients.forEach((cws) => {
            if (cws.context.clientId === msg.clientid) {
              cws.send(raw);
            }
          });
        }
      }
    });
  });
  server.ws(
    "/connect/:name",
    { max_payload_length: MAX_BODY },
    (ws: WSServer<{ clientId: string }>) => {
      ws.on("message", (raw) => {
        const msg = JSON.parse(raw) as
          | { type: "identify"; name: string }
          | ActionMsg;

        if (msg.type === "identify") {
          if (!conns[msg.name]) {
            // console.log(msg.name, "created on client");

            conns[msg.name] = {
              server: null,
              clients: new Set(),
            };
          }
          ws.context.clientId = createId();
          conns[msg.name].clients.add(ws);
          ws.send(
            JSON.stringify({
              type: "connected",
              serverConnected: !!conns[msg.name].server,
            })
          );
        } else if (msg.type === "action") {
          let name = "";
          for (const [k, v] of Object.entries(conns)) {
            if (v.clients.has(ws)) {
              name = k;
            }
          }
          if (name && conns[name]) {
            conns[name].server?.send(
              JSON.stringify({ ...msg, clientid: ws.context.clientId })
            );
          }
        }
      });
    }
  );

  try {
    await server.listen(config.port, "localhost");
  } catch (e) {
    await server.listen(config.port, "127.0.0.1");
  }
  return server;
};
