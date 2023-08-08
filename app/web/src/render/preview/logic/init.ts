import { createRouter } from "web-init";
import { createAPI, createDB } from "../elements/script-exec";
import { PG } from "./global";
import importModule from "../../editor/tools/dynamic-import";

const w = window as unknown as {
  basepath: string;
  navigateOverride: (s: string) => string;
  isEditor: boolean;
  exports: any;
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
      select: { id: true, config: true, js_compiled: true },
    });

    if (site) {
      w.exports = {};
      await importModule(
        `${serverurl}/npm/site/${site.id}/index.js?` + Date.now()
      );

      p.site.id = site.id;
      p.site.js = site.js_compiled || "";
      p.site.api_url = ((site.config || {}) as any).api_url || "";
      const pages = await db.page.findMany({
        where: {
          id_site: site.id,
          is_deleted: false,
        },
        select: { id: true, url: true },
      });

      const exec = (fn: string, scopes: any) => {
        if (p) {
          scopes["api"] = createAPI(p.site.api_url);
          scopes["db"] = createDB(p.site.api_url);
          const f = new Function(...Object.keys(scopes), fn);
          const res = f(...Object.values(scopes));
          return res;
        }
        return null;
      };
      const scope = {
        types: {},
        exports: w.exports,
        load: importModule,
        render: p.render,
      };
      exec(p.site.js, scope);

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
