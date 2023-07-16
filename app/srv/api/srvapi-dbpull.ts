import { apiContext } from "service-srv";
import { glb } from "../global";
import { dir } from "dir";
import { join } from "path";
import { $ } from "execa";
import { writeAsync } from "fs-jetpack";
export const _ = {
  url: "/srvapi-dbpull",
  async api(site_id: string, dburl: string) {
    const { req, res } = apiContext(this);

    const root = dir.path(`../prasi-api/${site_id}/app`);
    if (dburl) {
      try {
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
url      = "${dburl}"
}
`
        );
        await $({ cwd: join(root, "db") })`pnpm prisma db pull`;
        await $({ cwd: join(root, "db") })`pnpm prisma generate`;
        return "ok";
      } catch (e) {}
    }

    return "dburl not foundF";
  },
};
