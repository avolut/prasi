import { createRouter } from "radix3";
import { g } from "../types";

export const initRouter = () => {
  const router = createRouter();
  const routes = Object.values(g.__PAGES__);
  for (const r of routes) {
    router.insert(r.url, r);
  }

  g.router = router as any;
};
