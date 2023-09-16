import { createAPIServer } from "service-srv";
import { collabEditHandler } from "./edit/handler";
import { glb } from "./global";
import { dir } from "dir";
import { $ } from "execa";
import { existsAsync } from "fs-jetpack";
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

  async init() {
    const sites = await db.site.findMany({
      select: { id: true, name: true, config: true },
    });
    for (const site of sites) {
      const prasi = (site.config as any)?.prasi;
      if (prasi) {
        const root = dir.path(`../prasi-api/${site.id}/app`);

        if (await existsAsync(root)) {
          if (!glb.prasiSrv.running[site.id]) {
            glb.prasiSrv.running[site.id] = $({
              cwd: root,
            })`node app.js`;

            glb.prasiSrv.running[site.id].on("exit", () => {
              glb.prasiSrv.status[site.id] = "stopped";
            });
          }
          glb.prasiSrv.status[site.id] = "started";
          console.log(` > Site ${site.name}: ${prasi.port}.prasi.world`);
        }
      }
    }
  },
});
