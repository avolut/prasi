import { dir } from "dir";
import { existsAsync, readAsync } from "fs-jetpack";
import { apiContext } from "service-srv";
const cache = {} as Record<string, string>;

export const _ = {
  url: "/_prasi/**",
  async api() {
    const { req, res, mode } = apiContext(this);
    res.setHeader("Access-Control-Allow-Origin", "*");

    const action = {
      _: () => {
        res.json({ prasi: "v1" });
      },
      prisma: async () => {
        const pdir = dir.path("db/node_modules/.gen/index.d.ts");
        if (await existsAsync(pdir)) {
          res.type("text/x.typescript");
          res.send(await readAsync(pdir, "utf8"));
        }
      },
      api: async () => {
        const pdir = dir.path("srv/api.d.ts");
        if (await existsAsync(pdir)) {
          res.type("text/x.typescript");
          res.send(await readAsync(pdir, "utf8"));
        }
      },
    }[req.params._];

    if (action) await action();
  },
};
