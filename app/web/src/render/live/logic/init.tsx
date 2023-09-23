import { createRouter, type apiClient } from "web-init";
import { validate } from "uuid";
import importModule from "../../editor/tools/dynamic-import";
import { createAPI, createDB, initApi } from "../../../utils/script/init-api";
import { PG } from "./global";

const w = window as unknown as {
  basepath: string;
  navigateOverride: (s: string) => string;
  isEditor: boolean;
  isMobile: boolean;
  apiHeaders: any;
  isDesktop: boolean;
  exports: any;
  params: any;
  apiClient: typeof apiClient;
};

export const initLive = async (p: PG, domain: string) => {
  if (p.status === "init") {
    p.status = "loading";

    w.isEditor = false;
    w.isMobile = p.mode === "mobile";
    w.isDesktop = p.mode === "desktop";
    w.apiHeaders = {};

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

    /** load site */
    let site = null as any;
    try {
      site = JSON.parse(localStorage.getItem(`prasi-site-${domain}`) || "");
    } catch (e) {}
    if (!site) {
      site = await db.site.findFirst({
        where: validate(domain) ? { id: domain } : { domain },
        select: {
          id: true,
          config: true,
          domain: true,
          name: true,
          js: true,
          responsive: true,
          js_compiled: true,
        },
      });
      localStorage.setItem(`prasi-site-${domain}`, JSON.stringify(site));
    } else {
      db.site
        .findFirst({
          where: validate(domain) ? { id: domain } : { domain },
          select: {
            id: true,
            config: true,
            domain: true,
            name: true,
            js: true,
            responsive: true,
            js_compiled: true,
          },
        })
        .then((site) => {
          localStorage.setItem(`prasi-site-${domain}`, JSON.stringify(site));
        });
    }

    if (site) {
      /** import site module */
      w.exports = {};
      await importModule(`${serverurl}/npm/site/${site.id}/index.js`);

      p.site.id = site.id;
      p.site.js = site.js_compiled || "";
      p.site.responsive = site.responsive as any;
      p.site.api_url = await initApi(site.config);

      /** load pages */
      const pagesLocal = localStorage.getItem(`prasi-pages-[${domain}]`);
      let pages = [];
      if (pagesLocal) {
        try {
          pages = JSON.parse(pagesLocal);
        } catch (e) {}
      }
      if (pages.length === 0) {
        pages = await db.page.findMany({
          where: {
            id_site: site.id,
            is_deleted: false,
          },
          select: { id: true, url: true },
        });
        localStorage.setItem(`prasi-pages-[${domain}]`, JSON.stringify(pages));
      } else {
        db.page
          .findMany({
            where: {
              id_site: site.id,
              is_deleted: false,
            },
            select: { id: true, url: true },
          })
          .then((pages) => {
            localStorage.setItem(
              `prasi-pages-[${domain}]`,
              JSON.stringify(pages)
            );
          });
      }

      /** execute site module */
      const exec = (fn: string, scopes: any) => {
        if (p) {
          scopes["api"] = createAPI(p.site.api_url);
          scopes["db"] = createDB(p.site.api_url);
          scopes.params = w.params;
          scopes.module = {};
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
        module: {
          exports: {} as any,
        },
      };
      exec(p.site.js, scope);
      if (scope.module.exports) {
        for (const [k, v] of Object.entries(scope.module.exports)) {
          w.exports[k] = v;
        }
      }

      /** create router */
      p.route = createRouter({ strictTrailingSlash: false });
      if (pages && pages.length > 0) {
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
