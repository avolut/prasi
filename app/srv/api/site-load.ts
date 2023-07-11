import { validate } from "uuid";
import { execGlobal } from "../../web/src/compo/page/scripting/exec-global";
import { eg } from "../edit/edit-global";
import { loadRouter } from "../edit/load-router";
import { loadCachedPage } from "../edit/tools/load-page-cached";

export const _ = {
  url: "/site-load",
  async api(name: string, _page: { path?: string; id?: string }) {
    let site = null as null | Parameters<typeof execGlobal>[0];
    const select = {
      id: true,
      js: true,
      js_compiled: true,
      config: true,
    };
    if (validate(name)) {
      const raw = await db.site.findFirst({
        where: { id: name },
        select,
      });
      if (raw) {
        site = raw as any;
      }
    } else {
      const raw = await db.site.findFirst({
        where: { domain: name },
        select,
      });
      if (raw) {
        site = raw as any;
      }
    }

    let page = null;
    let pages: { id: string; url: string }[] = [];
    if (site) {
      const r = await loadRouter(site.id);
 
      if (_page.path) {
        const found = r.lookup(_page.path);
        if (found) {
          page = await loadCachedPage(site.id, found.id);
        }
      } else if (_page.id) {
        page = await loadCachedPage(site.id, _page.id);
      }

      pages = Object.values(eg.cache[site.id]).map((e) => ({
        id: e.id,
        url: e.url,
      }));
    }
    return { site, page, pages };
  },
};
