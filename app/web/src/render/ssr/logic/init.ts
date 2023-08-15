import { ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { createAPI, createDB, initApi } from "../../../utils/script/api";
import importModule from "../../editor/tools/dynamic-import";
import { PG } from "./global";

const w = window as unknown as {
  basepath: string;
  navigateOverride: (s: string) => string;
  isEditor: boolean;
  exports: any;
  extractCss: any;
  params: any;
};

export const initSSR = async (p: PG) => {
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

    const site = p.site;

    if (site) {
      p.site.id = site.id;
      p.site.js = site.js_compiled || "";
      p.site.api_url = await initApi(site.config);

      const exec = (fn: string, scopes: any) => {
        if (p) {
          scopes["api"] = createAPI(p.site.api_url);
          scopes["db"] = createDB(p.site.api_url);
          scopes.params = w.params;
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
      if (p.site.js) exec(p.site.js, scope);
      p.status = "ready";
      p.render();
    } else {
      p.status = "not-found";
      p.render();
    }
  }
};

export const renderSSR = (el: ReactElement) => {
  let res = renderToString(el);
  return { html: res, css: w.extractCss() };
};
