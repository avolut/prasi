import { createRouter } from "web-init";
import { PG } from "./global";
import importModule from "../../../compo/page/tools/dynamic-import";

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
      return "";
    };

    const site = await db.site.findFirst({
      where: { id: site_id },
      select: { id: true, config: true, domain: true },
    });

    if (site) {
      w.exports = {};
      await importModule(
        `${serverurl}/npm/site/${site.id}/index.js?` + Date.now()
      );

      p.site.id = site.id;
      p.site.domain = site.domain;
      p.site.api_url = ((site.config || {}) as any).api_url || "";
      const pages = await db.page.findMany({
        where: {
          id_site: site.id,
          is_deleted: false,
        },
        select: { id: true, url: true },
      });

      p.status = "ready";
      p.render();
    } else {
      p.status = "not-found";
      p.render();
    }
  }
};
