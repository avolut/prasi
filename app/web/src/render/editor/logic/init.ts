import get from "lodash.get";
import { createAPI, createDB, initApi } from "../../../utils/script/init-api";
import importModule from "../tools/dynamic-import";
import { PG } from "./global";

const w = window as unknown as {
  basepath: string;
  navigateOverride: (s: string) => string;
  isEditor: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  apiHeaders: any;
  exports: any;
};

export const initEditor = async (p: PG, site_id: string) => {
  if (p.status === "init") {
    p.status = "loading";

    w.isEditor = true;
    w.isMobile = p.mode === "mobile";
    w.isDesktop = p.mode === "desktop";
    w.apiHeaders = {};
    w.navigateOverride = (_href) => {
      if (_href.startsWith("/ed")) return _href;
      return "";
    };

    const site = await db.site.findFirst({
      where: site_id ? { id: site_id } : { id_user: p.session.data.user.id },
      select: {
        id: true,
        config: true,
        domain: true,
        name: true,
        js: true,
        js_compiled: true,
      },
    });

    if (site) {
      w.exports = {};
      await importModule(
        `${serverurl}/npm/site/${site.id}/index.js?` + Date.now()
      );

      p.site.id = site.id;
      p.site.js = site.js || "";
      p.site.js_compiled = site.js_compiled || "";
      p.site.name = site.name;
      p.site.domain = site.domain;
      p.site.api_url = await initApi(site.config);
      p.site_dts = (await api.site_dts(p.site.id)) || "";
      const configLocal: any = get(site, "config.prasi");
      if (configLocal) {
        p.site.api_prasi.db = configLocal.dburl ? configLocal.dburl : "";
        p.site.api_prasi.port = configLocal.port ? configLocal.port : "";
      }
      execSiteJS(p);

      p.status = "ready";
      p.render();
    } else {
      p.status = "not-found";
      p.render();
    }
  }
};

export const execSiteJS = (p: PG) => {
  if (p) {
    p.treeMeta = {};
    p.script.siteTypes = {};
    const scope: any = {
      types: p.script.siteTypes,
      exports: window.exports,
      load: importModule,
      render: p.render,
      module: {
        exports: {} as any,
      },
    };

    const fn = p.site.js_compiled;
    scope["api"] = createAPI(p.site.api_url);
    scope["db"] = createDB(p.site.api_url);
    const f = new Function(...Object.keys(scope), fn);
    try {
      const res = f(...Object.values(scope));

      for (const [k, v] of Object.entries(scope.module.exports)) {
        w.exports[k] = v;
      }

      return res;
    } catch (e) {
      console.warn(e);
    }
  }
  return null;
};
