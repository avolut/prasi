import { createAPIServer } from "service-srv";
import { collabEditHandler } from "./edit/handler";
import { glb } from "./global";

glb.prasiSrv = { status: {}, running: {} };

export const main = createAPIServer({
  name: "srv",
  port: 12300,

  serverURL(mode) {
    if (mode === "dev") return "";
    return `https://api.prasi.app`;
  },

  // make sure cookieKey is different for each app
  // changing cookie key, will force all user to log out
  cookieKey: `ryl-sid-JgvCz3F4K6pfPNwM`,
  ws: {
    "/edit": collabEditHandler,
  },
});
