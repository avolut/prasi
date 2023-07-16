import { apiContext } from "service-srv";
import { glb } from "../global";
import { existsAsync } from "fs-jetpack";
import { dir } from "dir";
export const _ = {
  url: "/srvapi-check/:site_id",
  async api(site_id: string) {
    const { req, res } = apiContext(this);

    if (!glb.prasiSrv) glb.prasiSrv = { status: {}, running: {} };
    const status = glb.prasiSrv.status[site_id] || "unavailable";

    if (
      status === "unavailable" &&
      (await existsAsync(dir.path(`../prasi-api/${site_id}/app`)))
    ) {
      return "stopped";
    }

    const proc = glb.prasiSrv.running[site_id];
    if (status === "started" && !proc) { 
      return "stopped";
    }
    return status;
  },
};
