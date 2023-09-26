import get from "lodash.get";
import { createAPI, createDB, initApi } from "../../../utils/script/init-api";
import importModule from "../tools/dynamic-import";
import { PG } from "./global";
import { jscript } from "../panel/script/script-element";

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

    p.item.active = localStorage.getItem("prasi-item-active-id") || "";
    p.item.activeOriginalId =
      localStorage.getItem("prasi-item-active-oid") || "";
    const comp: any = {
      id: localStorage.getItem("prasi-comp-active-id"),
      instance_id: localStorage.getItem("prasi-comp-instance-id"),
      last: localStorage.getItem("prasi-comp-active-last"),
      props: localStorage.getItem("prasi-comp-active-props"),
    };
    if (comp.last) {
      comp.last = JSON.parse(comp.last);
    }
    if (comp.props) {
      comp.props = JSON.parse(comp.props);
    }
    if (comp.id) {
      p.comp = comp;
    }

    let site = null as any;
    try {
      site = JSON.parse(localStorage.getItem(`prasi-site-${site_id}`) || "");
    } catch (e) {}

    const querySite = async () => {
      const site = await db.site.findFirst({
        where: site_id ? { id: site_id } : { id_user: p.session.data.user.id },
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
      localStorage.setItem(`prasi-site-${site_id}`, JSON.stringify(site));
      return site;
    };
    const processSite = async (site: any) => {
      w.exports = {};
      await importModule(
        `${serverurl}/npm/site/${site.id}/site.js?${Date.now()}`
      );

      p.site.id = site.id;
      p.site.js = site.js || "";
      p.site.js_compiled = site.js_compiled || "";
      p.site.name = site.name;
      p.site.domain = site.domain;
      p.site.responsive = site.responsive as any;
      p.site.api_url = await initApi(site.config);
      api.site_dts(p.site.id).then((e) => {
        p.site_dts = e || "";
        p.render();
      });
      const configLocal: any = get(site, "config.prasi");
      if (configLocal) {
        p.site.api_prasi.db = configLocal.dburl ? configLocal.dburl : "";
        p.site.api_prasi.port = configLocal.port ? configLocal.port : "";
      }
      execSiteJS(p);
    };
    if (!site || (site && !site.id)) {
      const site = await querySite();
      await processSite(site);
    } else {
      await processSite(site);
      await querySite();
    }

    p.status = "ready";
    p.render();

    if (!jscript.build) {
      jscript.init();
    }
  }
};

export const execSiteJS = (p: PG) => {
  if (p) {
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
