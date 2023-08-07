import { createRouter } from "web-init";
import { PG } from "./global";

const w = window as unknown as {
  basepath: string;
  navigateOverride: (s: string) => string;
  isEditor: boolean;
};

export const initPreview = async (p: PG, domain: string) => {
  if (p.status === "init") {
    p.status = "loading";

    w.isEditor = false;
    w.navigateOverride = (_href) => {
      if (_href.startsWith("/")) {
        if (w.basepath.length > 1) {
          _href = `${w.basepath}${_href}`;
        }
        if (
          location.hostname === "prasi.app" ||
          location.hostname === "localhost" ||
          location.hostname === "127.0.0.1" ||
          location.hostname === "10.0.2.2" // android localhost
        ) {
          if (
            location.pathname.startsWith("/preview") &&
            !_href.startsWith("/preview")
          ) {
            const patharr = location.pathname.split("/");
            _href = `/preview/${patharr[2]}${_href}`;
          }
        }
      }
      return _href;
    };

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
