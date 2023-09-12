import trim from "lodash.trim";
import { defineWindow } from "web-init/src/web/define-window";
import { createAPI, createDB, initApi } from "../../../utils/script/init-api";
import { PRASI_COMPONENT } from "../../../utils/types/render";
import { Loading } from "../../../utils/ui/loading";
import { PG, PrasiOpt } from "./global";
import importModule from "../../editor/tools/dynamic-import";
import React from "react";
import { apiClient, dbClient } from "web-init";

const w = window as unknown as {
  basepath: string;
  serverurl: string;
  navigateOverride: (s: string) => string;
  isEditor: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  exports: any;
  params: any;
  site: any;
  prasi_page: any;
  prasi_pages: any[];
  prasi_comps: Record<string, PRASI_COMPONENT>;
  api: any;
  prasiApi: any;
  apiClient: typeof apiClient;
  dbClient: typeof dbClient;
};

export const initSPA = async (p: PG, opt: PrasiOpt) => {
  document.body.style.opacity = "1";
  p.site = w.site;
  p.site.js = w.site.js_compiled || "";

  p.baseUrl = new URL(trim(opt.baseUrl || location.href, "/ "));
  p.status = "loading";

  if (window.innerWidth < 600) p.mode = "mobile";
  else p.mode = "desktop";

  p.ui.loading = <Loading />;
  p.ui.preload = <Loading backdrop={false} />;
  p.ui.notfound = (
    <div className="flex-1 flex items-center justify-center">NOT FOUND</div>
  );
  p.ui.error = (
    <div className="flex-1 flex items-center justify-center text-red-500">
      PAGE ERROR
    </div>
  );

  w.exports = {};
  w.isEditor = false;
  w.isMobile = p.mode === "mobile";
  w.isDesktop = p.mode === "desktop";
  w.apiClient = apiClient;
  w.dbClient = dbClient;
  defineWindow();

  if (w.prasi_page) {
    p.page = w.prasi_page;
  }
  if (w.prasi_pages) {
    for (const page of w.prasi_pages) {
      if (p.page && page.id === p.page?.id) {
        p.pages[page.id] = p.page;
        p.route.insert(page.url, p.page);
      } else {
        p.pages[page.id] = page;
        p.route.insert(page.url, page);
      }
    }
  }
  if (w.prasi_comps) {
    for (const comp of Object.values(w.prasi_comps)) {
      p.comp.raw[comp.id] = comp;
    }
  }

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
          location.pathname.startsWith("/site") &&
          !_href.startsWith("/site")
        ) {
          const patharr = location.pathname.split("/");
          _href = `/site/${patharr[2]}${_href}`;
        }
      }
    }
    return _href;
  };

  p.site.api_url = await initApi(w.site.config);

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
    isEditor: false,
    module: {
      exports: {} as any,
    },
    React: React,
  };
  exec(p.site.js, scope);

  if (scope.module.exports) {
    for (const [k, v] of Object.entries(scope.module.exports)) {
      w.exports[k] = v;
    }
  }
  
  p.status = "ready";
  p.render();
};
