import { createAPI, createDB, initApi } from "../../../utils/script/api";
import importModule from "../tools/dynamic-import";
import { PG } from "./global";

const w = window as unknown as {
  basepath: string;
  navigateOverride: (s: string) => string;
  isEditor: boolean;
  exports: any;
};

export const initEditor = async (p: PG, site_id: string) => {
  if (p.status === "init") {
    p.status = "loading";

    w.isEditor = false;
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
        js_compiled: true,
      },
    });

    if (site) {
      w.exports = {};
      await importModule(
        `${serverurl}/npm/site/${site.id}/index.js?` + Date.now()
      );

      p.site.id = site.id;
      p.site.js = site.js_compiled || "";
      p.site.name = site.name;
      p.site.domain = site.domain;
      p.site.api_url = ((site.config || {}) as any).api_url || "";

      await initApi(p.site.api_url);

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

      p.status = "ready";
      p.render();
    } else {
      p.status = "not-found";
      p.render();
    }
  }
};
