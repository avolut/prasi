import { createAPIServer } from "service-srv";
import { IConnection } from "vscode-ws-jsonrpc/server";
import { collabEditHandler } from "./edit/handler";

const g = global as unknown as {
  lsp: { conn: IConnection };
};

export const main = createAPIServer({
  name: "srv",
  port: 12300,

  serverURL(mode) {
    if (mode === "dev") return "";
    return `https://apinew.lmtd.id`;
  },

  // make sure cookieKey is different for each app
  // changing cookie key, will force all user to log out
  cookieKey: `ryl-sid-JgvCz3F4K6pfPNwM`,
  ws: {
    "/edit": collabEditHandler,
  },
});
