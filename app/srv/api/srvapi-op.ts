import { apiContext } from "service-srv";
import { glb } from "../global";
import { dir } from "dir";
import { $ } from "execa";
export const _ = {
  url: "/srvapi-op",
  async api(site_id: string, op: "start" | "stop") {
    const { req, res } = apiContext(this);

    const root = dir.path(`../prasi-api/${site_id}/app`);

    const start = () => {
      stop();
      delete glb.prasiSrv.running[site_id];

      if (!glb.prasiSrv.running[site_id]) {
        glb.prasiSrv.running[site_id] = $({
          cwd: root,
        })`node app.js`;
      }
      glb.prasiSrv.status[site_id] = "started";
    };
    const stop = () => {
      const proc = glb.prasiSrv.running[site_id];
      proc?.kill();
      glb.prasiSrv.status[site_id] = "stopped";
    };
    if (op === "start") {
      start();
    }

    if (op === "stop") {
      stop();
    }

    return "hello world";
  },
};
