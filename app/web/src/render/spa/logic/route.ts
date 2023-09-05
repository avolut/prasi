import { page } from "dbgen";
import { PG } from "./global";
import importModule from "../../editor/tools/dynamic-import";
import { WS_MSG_GET_PAGE } from "../../../utils/types/ws";
import { validate } from "uuid";
import { w } from "../../../utils/types/general";
import { loadComponent } from "./comp";

export const pageNpmStatus: Record<string, "loaded" | "loading"> = {};

const cacheMeta = {} as Record<string, any>;

export const routeSPA = (p: PG, pathname: string) => {
  if (p.status !== "loading") {
    let page_id = "";
    if (validate(pathname.substring(1))) {
      page_id = pathname.substring(1);
    } else {
      const found = p.route.lookup(pathname);
      if (!found) {
        if (Object.keys(p.pages).length > 0) {
          p.status = "not-found";
        } else {
          p.status = "loading";
        }
      } else {
        const id = p.page?.id;
        let paramsChanged = false;

        if (found.params) {
          for (const [k, v] of Object.entries(found.params)) {
            if (w.params[k] !== v) {
              paramsChanged = true;
            }
            w.params[k] = v;
          }
        }

        if (id && (id !== found.id || paramsChanged)) {
          if (!cacheMeta[id]) {
            cacheMeta[id] = p.treeMeta;
          }

          if (cacheMeta[found.id]) {
            p.treeMeta = cacheMeta[found.id];
          } else {
            p.treeMeta = {};
          }
        }
        page_id = found.id;
      }
    }

    if (page_id) {
      const page = p.pages[page_id];
      if (!page) {
        p.status = "loading";
        loadPage(p, page_id).then(() => {
          p.status = "ready";
          p.render();
        });
      } else {
        p.status = "ready";
      }

      if (page) {
        if (!pageNpmStatus[page.id]) {
          p.status = "loading";
          pageNpmStatus[page.id] = "loading";
          loadNpmPage(page.id).then(() => {
            p.page = page;
            p.status = "ready";
            pageNpmStatus[page.id] = "loaded";
            p.render();
          });
        } else {
          if (pageNpmStatus[page.id] === "loaded") {
            p.page = page;
          } else {
            p.status = "loading";
          }
        }
      }
    }
  }
};

export const preload = async (p: PG, pathname: string) => {
  const found = p.route.lookup(pathname);
  if (found) {
    if (!p.pages[found.id] && !p.pagePreload[found.id]) {
      p.pagePreload[found.id] = true;
      await loadPage(p, found.id);
    }
  }
};

const loadNpmPage = async (id: string) => {
  try {
    if (typeof window.exports === "undefined") {
      window.exports = {};
    }
    await importModule(`${serverurl}/npm/page/${id}/index.js?` + Date.now());
  } catch (e) {
    console.error(e);
  }
};

const loadPage = (p: PG, id: string) => {
  return new Promise<void>(async (resolve) => {
    const page = await db.page.findFirst({
      where: { id: id },
      select: {
        id: true,
        url: true,
        content_tree: true,
        js_compiled: true,
      },
    });
    if (page) {
      pageNpmStatus[page.id] = "loading";
      await loadNpmPage(page.id);
      delete p.pagePreload[id];
      p.pages[id] = {
        id: page.id,
        url: page.url,
        js: page.js_compiled as any,
        content_tree: page.content_tree as any,
      };
      const comps = await api.comp_scan(id);
      for (const [k, v] of Object.entries(comps)) {
        p.comp.raw[k] = v;
      }
      pageNpmStatus[page.id] = "loaded";
    }
    resolve();
  });
};

export const extractNavigate = (str: string) => {
  let i = 0;
  const nstr = "navigate(";
  const founds: string[] = [];
  let lasti = 0;
  while (true) {
    const start = str.indexOf(nstr, i);
    lasti = i;
    if (start >= 0) {
      const char = str[start + nstr.length];
      if (char === '"' || char === "'" || char === "`") {
        const end = str.indexOf(`${char})`, start + nstr.length + 1);
        const text = str.substring(start + nstr.length + 1, end);
        i = end + 3;
        founds.push(text);
      }
    }

    if (lasti === i) {
      break;
    }
  }

  return founds;
};