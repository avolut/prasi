import { dir } from "dir";
import { removeAsync } from "fs-jetpack";
import { apiContext } from "service-srv";
import { glb } from "../global";

export const _ = {
  url: "/srvapi-destroy",
  async api(site_id: string) {
    const { req, res } = apiContext(this);
    if (!glb.prasiSrv) glb.prasiSrv = { status: {}, running: {} };

    glb.prasiSrv.status[site_id] = "destroying";
    const proc = glb.prasiSrv.running[site_id];
    proc?.kill();

    await removeAsync(dir.path(`../prasi-api/${site_id}`));
    await db.site.update({
      where: {
        id: site_id,
      },
      data: { config: {} },
    });

    delete glb.prasiSrv.status[site_id];
    return "ok";
  },
};
