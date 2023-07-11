import { createRouter } from "radix3";
import { g } from "web-init/src/types";

export const initRouter = () => {
  const router = createRouter();
  const routerSSR = createRouter();

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
 
  for (const [url, fn] of Object.entries(g.__SSR__.handler)) {
    routerSSR.insert(url, { ssr: fn });
  }

  g.router = router as any;
  g.routerSSR = routerSSR as any;
};
