const g = globalThis as any;
import { createRouter } from "radix3";
import type { PrismaClient } from "../../db/node_modules/.gen/index";
import { Page, Site } from "../lib/site";

export const initPrasi = async () => {
  g.window = {};
  g.isSSR = true;

  const { dbClient } = await import(
    "service/pkgs/service-web/pkgs/web-init/src/web/db"
  );

  g.db = dbClient("db", "http://127.0.0.1:12300") as PrismaClient;
};

export const loadSite = async (domain: string) => {
  const raw = await db.site.findFirst({ where: { domain } });
  if (raw) {
    const site: Site = {
      id: raw.id,
      domain: raw.domain,
      router: null as any,
      loader: {},
    };
    await loadRouter(site);
    return site;
  }
};

export const loadRouter = async (site: Site) => {
  const pages = await db.page.findMany({
    where: { id_site: site.id },
    select: {
      id: true,
      name: true,
      js_compiled: true,
      url: true,
    },
  });
  const router = createRouter<Page>();
  for (const page of pages) {
    router.insert(page.url, page);
  }
  site.router = router;
};

const loadComponents = async (page: Page) => {};
