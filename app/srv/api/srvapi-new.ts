import { dir } from "dir";
import { $ } from "execa";
import { copyAsync, dirAsync, existsAsync, writeAsync } from "fs-jetpack";
import getPort, { portNumbers } from "get-port";
import { join } from "path";
import { apiContext } from "service-srv";
import { SiteConfig } from "../edit/tools/load-site";
import { glb } from "../global";

function getRandomArbitrary(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

export const _ = {
  url: "/srvapi-new/:site_id",
  async api(site_id: string): Promise<SiteConfig> {
    const { req, res } = apiContext(this);

    if (site_id) {
      const site = await db.site.findFirst({
        where: {
          id: site_id,
        },
      });
      if (site) {
        const config = site.config as SiteConfig;

        if (!config.prasi) {
          config.prasi = {
            port: await getPort({
              port: portNumbers(getRandomArbitrary(21000, 22000), 25000),
            }),
            dburl: `postgresql://postgres:andromedia123oke@db.web.andromedia.co.id/test?schema=public`,
          };

          await db.site.update({ where: { id: site.id }, data: { config } });
        }
        if (glb.prasiSrv.status[site_id]) {
          return site?.config || ({} as any);
        }

        if (!glb.prasiSrv.status[site_id]) {
          glb.prasiSrv.status[site_id] = "installing";

          if (config.prasi) {
            try {
              const proc = glb.prasiSrv.running[site_id];
              if (proc) {
                proc.kill();
                delete glb.prasiSrv.running[site_id];
              }

              const root = dir.path(`../prasi-api/${site_id}/app`);

              await $`rm -rf ${dir.path(`../prasi-api/${site_id}`)}`;
              await dirAsync(dir.path(`../prasi-api/${site_id}`));
              await $`cp -r ${dir.path(`prasi-api`)} ${root}`;

              await writeAsync(join(root, "srv", "port.json"), {
                port: config.prasi.port,
              });

              await writeAsync(
                dir.path(`../prasi-api/${site_id}/app/pnpm-workspace.yaml`),
                `\
packages:
  - ./*`
              );

              await writeAsync(
                dir.path(`../prasi-api/${site_id}/app/db/schema.prisma`),
                `\
generator client {
  provider = "prisma-client-js"
  output   = "./node_modules/.gen"
}

generator client_app {
  provider = "prisma-client-js"
  output   = "../node_modules/.gen"
}

datasource db {
  provider = "postgresql"
  url      = "${config.prasi?.dburl}"
}
`
              );
              await $({ cwd: root })`pnpm i`;
              await $({ cwd: join(root, "db") })`pnpm prisma db pull`;
              await $({ cwd: join(root, "db") })`pnpm prisma generate`;
              glb.prasiSrv.running[site_id] = $({
                cwd: root,
              })`node app.js`;

              glb.prasiSrv.running[site_id].then(() => {
                delete glb.prasiSrv.running[site_id];
              });
            } catch (e) {
              console.log(e);
            }

            glb.prasiSrv.status[site_id] = "started";

            return config;
          }
        }
        return site.config as SiteConfig;
      }
    }
    return {};
  },
};
