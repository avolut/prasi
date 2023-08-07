import { createRouter } from "web-init";
import { PG } from "./global";

export const initPreview = async (p: PG, domain: string) => {
  if (p.status === "init") {
    p.status = "loading";

    const site = await db.site.findFirst({
      where: { domain },
      select: { id: true, config: true },
    });

    if (site) {
      p.site.id = site.id;
      p.site.api_url = ((site.config || {}) as any).api_url || "";
      const pages = await db.page.findMany({
        where: {
          id_site: site.id,
          is_deleted: false,
        },
        select: { id: true, url: true },
      });

      if (pages.length > 0) {
        p.route = createRouter();
        for (const page of pages) {
          p.route.insert(page.url, page);
        }
      }
      p.status = "ready";
      p.render();
    } else {
      p.status = "not-found";
      p.render();
    }
  }
};
