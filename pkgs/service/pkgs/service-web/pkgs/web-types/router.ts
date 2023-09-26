import { createRouter } from "radix3";
import { g } from "web-init/src/types";

export const initRouter = () => {
  const router = createRouter({ strictTrailingSlash: false });

  for (const r of Object.values(g.__PAGES__)) {
    if (r.url === "*") continue;
    if (
      r.url.endsWith("/*") ||
      r.url.endsWith("/**") ||
      r.url.match(/\/\:.*$/gi)
    ) {
      let prefix = r.url.split("/*")[0];
      prefix = prefix.split("/:")[0];

      router.insert(prefix, r);
      router.insert(prefix + "/", r);
    }

    router.insert(r.url, r);
  }

  g.router = router as any;
};
