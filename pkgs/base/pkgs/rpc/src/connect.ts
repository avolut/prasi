import { createId } from "@paralleldrive/cuid2";
import { DeepProxy } from "@qiwi/deep-proxy";
import get from "lodash.get";
import { WebSocket as WSClient } from "ws";
import { config } from "./config";
import { ActionResult } from "./server";
import { RPCAction, RPCActionResult } from "./types";

type RPC_NAME = string;
type MSG_ID = string;
const callbacks = {} as Record<
  RPC_NAME,
  Record<MSG_ID, { resolve: any; reject: any }>
>;

export const connectRPC = async <T extends RPCAction>(
  name: RPC_NAME,
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
    const onmsg = (raw: string) => {
      if (ws) {
        const msg = JSON.parse(raw) as ActionResult;
        const msgid = msg.msgid as string;
        if (callbacks[name] && callbacks[name][msgid]) {
          const { resolve, reject } = callbacks[name][msgid];
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
            delete callbacks[name][msgid];
          }
        }
      }
    };

    ws.on("message", onmsg);
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
            isReconnect: true,
          });
          if (res) {
            ws = res.ws;
            serverConnected = res.serverConnected;
          }
        }

        const result = new Promise<any>((resolve, reject) => {
          const msgid = createId();

          if (!callbacks[name]) {
            callbacks[name] = {};
          }
          if (!callbacks[name][msgid]) {
            callbacks[name][msgid] = {
              resolve,
              reject,
            };
          }

          if (ws) {
            ws.send(
              JSON.stringify({
                type: "action",
                msgid,
                path: [...path, key],
                args,
              })
            );
          }
        });

        return await result;
      };
    }
    return undefined;
  }) as RPCActionResult<T> & { connected: boolean };
};

const connect = (
  name: string,
  arg?: { onClose?: () => any; waitServer?: boolean; isReconnect?: boolean }
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
