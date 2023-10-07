import { createRouter, type apiClient } from "web-init";
import { validate } from "uuid";
import importModule from "../../editor/tools/dynamic-import";
import {
  createAPI,
  createDB,
  initApi,
  reloadDBAPI,
} from "../../../utils/script/init-api";
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
  apiurl: string;

  externalAPI: {
    mode: "dev" | "prod";
    devUrl: string;
    prodUrl: string;
  };
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
            location.pathname.startsWith("/live") &&
            !_href.startsWith("/live")
          ) {
            const patharr = location.pathname.split("/");
            _href = `/live/${patharr[2]}${_href}`;
          }
        }
      }
      return _href;
    };

    /** load site */
    let site = null as any;
    if (!p.prod) {
      try {
        site = JSON.parse(localStorage.getItem(`prasi-site-${domain}`) || "");
      } catch (e) {}

      if (!site) {
        site = await p.loader.site(
          p,
          validate(domain) ? { id: domain } : { domain }
        );
        localStorage.setItem(`prasi-site-${domain}`, JSON.stringify(site));
      } else {
        p.loader
          .site(p, validate(domain) ? { id: domain } : { domain })
          .then((site) => {
            localStorage.setItem(`prasi-site-${domain}`, JSON.stringify(site));
          });
      }
    } else {
      site = await p.loader.site(
        p,
        validate(domain) ? { id: domain } : { domain }
      );
    }

    if (site) {
      /** import site module */
      w.exports = {};
      await importModule(p.loader.npm(p, "site", site.id));

      p.site.id = site.id;
      p.site.js = site.js_compiled || "";
      p.site.responsive = site.responsive as any;

      if (p.prod) {
        p.site.api_url = await initApi(site.config, "prod");
      } else {
        w.externalAPI = {
          mode: (localStorage.getItem(`prasi-ext-api-mode-${p.site.id}`) ||
            "prod") as any,
          devUrl: localStorage.getItem(`prasi-ext-dev-url-${p.site.id}`) || "",
          prodUrl:
            localStorage.getItem(`prasi-ext-prod-url-${p.site.id}`) || "",
        };
        p.site.api_url = await initApi(site.config);

        if (w.externalAPI.prodUrl !== p.site.api_url) {
          w.externalAPI.prodUrl = p.site.api_url;
          localStorage.setItem(
            `prasi-ext-prod-url-${p.site.id}`,
            p.site.api_url
          );
        }
        if (w.externalAPI.mode === "dev" && w.externalAPI.devUrl) {
          p.site.api_url = w.externalAPI.devUrl;
          await reloadDBAPI(w.externalAPI.devUrl, "dev");
        }
      }
      w.apiurl = p.site.api_url;

      let pages = [];
      if (!p.prod) {
        /** load pages */
        const pagesLocal = localStorage.getItem(`prasi-pages-[${domain}]`);
        if (pagesLocal) {
          try {
            pages = JSON.parse(pagesLocal);
          } catch (e) {}
        }

        if (pages.length === 0) {
          pages = await p.loader.pages(p, site.id);
          localStorage.setItem(
            `prasi-pages-[${domain}]`,
            JSON.stringify(pages)
          );
        } else {
          p.loader.pages(p, site.id).then((pages) => {
            localStorage.setItem(
              `prasi-pages-[${domain}]`,
              JSON.stringify(pages)
            );
          });
        }
      } else {
        pages = await p.loader.pages(p, site.id);
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
      p.route = createRouter({ strictTrailingSlash: true });
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
