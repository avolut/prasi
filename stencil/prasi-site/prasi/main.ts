import { prepReq } from "../lib/prep-req";
import { sites } from "../lib/site";
import { initPrasi, loadRouter, loadSite } from "./init";

initPrasi().then(() => {
  const server = Bun.serve({
    async fetch(raw) {
      const req = prepReq(raw);

      const domain = req.url.hostname;
      if (!sites[domain]) {
        const loadedSite = await loadSite(domain);
        if (loadedSite) {
          sites[domain] = loadedSite;
        }
      }
      const site = sites[domain];
      const page = site.router.lookup(req.url.pathname);
      if (site.loader.router) clearTimeout(site.loader.router);
      site.loader.router = setTimeout(async () => {
        await loadRouter(site);
        site.loader.router = undefined;
      }, 10 * 1000);

      if (page) {
        await db.page.findFirst({
          where: { id: page.id },
          select: {
            js_compiled: true,
            content_tree: true,
          },
        });
      }

      if (req.url.pathname === "/favicon.ico") return new Response("");

      return new Response(req.url.pathname);
    },
  });

  console.log(`Started http://localhost:${server.port}`);
});
