import { createId } from "@paralleldrive/cuid2";
import { DeepProxy } from "@qiwi/deep-proxy";
import get from "lodash.get";
import { WebSocket as WSClient } from "ws";
import { config } from "./config";
import { ActionResult } from "./server";
import { RPCAction, RPCActionResult } from "./types";

export const connectRPC = async <T extends RPCAction>(
  name: string,
  arg?: { waitConnection: boolean; exitWhenDisconnect?: boolean }
) => {
  const waitConnection = get(arg, "waitConnection", false);
  const exitWhenDisconnect = get(arg, "exitWhenDisconnect", true);

  let ws = false as false | WSClient;
  let serverConnected = false;

  const onClose = () => {
    if (exitWhenDisconnect) {
      process.exit(0);
    }
  };
  const res = await connect(name, {
    waitServer: waitConnection,
    onClose,
  });

  if (res) {
    ws = res.ws;
    serverConnected = res.serverConnected;
  }

  return new DeepProxy({}, ({ PROXY, key, path, handler }) => {
    if (key) {
      if (key === "then") {
        return PROXY({}, handler, path);
      }

      if (path.length === 0 && key === "connected")
        return !!ws && !!serverConnected;

      return async (...args: any[]) => {
        if (ws === false) {
          const res = await connect(name, {
            waitServer: true,
            onClose,
          });
          if (res) {
            ws = res.ws;
            serverConnected = res.serverConnected;
          }
        }

        const result = new Promise<any>((resolve, reject) => {
          const msgid = createId();
          let retryCounter = 0;
          let timeout = null as null | ReturnType<typeof setTimeout>;
          let retryTimeout = 5000;

          const lastArg = args[args.length - 1];
          if (
            lastArg &&
            typeof lastArg === "object" &&
            lastArg["__retryTimeout"]
          ) {
            retryTimeout = lastArg["__retryTimeout"];
          }

          timeout = setTimeout(() => {
            if (ws && ws.readyState === 1) {
              resend();
            }
          }, retryTimeout);

          const resend = () => {
            if (retryCounter > 3)
              reject("RPC Server disconnected, failed to reconne 3x");
            retryCounter++;
            if (ws) {
              const onmsg = (raw: string) => {
                if (ws) {
                  const msg = JSON.parse(raw) as ActionResult;

                  if (msg.msgid === msgid) {
                    if (timeout) {
                      clearTimeout(timeout);
                    }
                    ws.off("close", resend);
                    ws.off("message", onmsg);
                    if (msg.type === "action-result") {
                      if (msg.result === "null") {
                        msg.result = null;
                      } else if (msg.result === "undefined") {
                        msg.result = undefined;
                      } else if (msg.result === "0") {
                        msg.result = 0;
                      }

                      if (!!msg.error && !!msg.result) {
                        resolve(msg.result);
                      } else if (!msg.error) {
                        resolve(msg.result);
                      } else {
                        reject(msg.error.msg);
                      }
                    }
                  }
                }
              };

              ws.once("close", resend);
              ws.on("message", onmsg);
              ws.send(
                JSON.stringify({
                  type: "action",
                  msgid,
                  path: [...path, key],
                  args,
                })
              );
            }
          };
          resend();
        });

        return await result;
      };
    }
    return undefined;
  }) as RPCActionResult<T> & { connected: boolean };
};

const connect = (
  name: string,
  arg?: { onClose?: () => any; waitServer?: boolean }
) => {
  return new Promise<false | { ws: WSClient; serverConnected: boolean }>(
    (resolve) => {
      const ws = new WSClient(`ws://localhost:${config.port}/connect/${name}`);
      ws.on("open", () => {
        ws.send(JSON.stringify({ type: "identify", name }));
        ws.on("message", (raw: string) => {
          const msg = JSON.parse(raw) as {
            type: "connected";
            serverConnected: boolean;
          };

          if (msg.type === "connected") {
            if (arg?.waitServer) {
              if (msg.serverConnected) {
                resolve({ ws, serverConnected: msg.serverConnected });
              }
            } else {
              resolve({ ws, serverConnected: msg.serverConnected });
            }
          }
        });
      });
      ws.on("close", () => {
        resolve(false);
        if (arg?.onClose) arg.onClose();
      });
      ws.on("error", () => {
        resolve(false);
      });
    }
  );
};
