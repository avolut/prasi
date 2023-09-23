import { page } from "dbgen";
import { validate } from "uuid";
import { w } from "../../../utils/types/general";
import { WS_MSG_GET_PAGE } from "../../../utils/types/ws";
import importModule from "../../editor/tools/dynamic-import";
import { loadComponent } from "./comp";
import { PG } from "./global";
import { liveWS, wsend } from "./ws";
import { rebuildTree } from "./tree-logic";

const cacheMeta = {} as Record<string, any>;

export const routeLive = (p: PG, pathname: string) => {
  if (p.status !== "loading") {
    let page_id = "";
    if (validate(pathname.substring(1))) {
      page_id = pathname.substring(1);
    } else {
      const found = p.route.lookup(pathname);
      if (!found) {
        p.status = "not-found";
      } else {
        const id = p.mpage?.get("id") as unknown as string;
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
      let page = p.pages[page_id];

      if (!page || !page.content_tree) {
        p.status = "loading";

        loadNpmPage(p, page_id);
        loadPage(p, page_id);
      } else {
        const mpage = p.mpage?.getMap("map");
        if (mpage) {
          p.status = "ready";
        } else {
          p.status = "not-found";
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
      const page = await db.page.findFirst({
        where: { id: found.id },
        select: {
          id: true,
          name: true,
          content_tree: true,
          url: true,
          js_compiled: true,
        },
      });
      if (page) {
        // pageNpmStatus[page.id] = "loading";
        // await loadNpmPage(page.id);
        // delete p.pagePreload[found.id];
        // p.pages[found.id] = {
        //   id: page.id,
        //   js: page.js_compiled as any,
        //   url: page.url,
        //   name: page.name,
        //   content_tree: page.content_tree as any,
        // };
        // await loadComponent(p, p.pages[found.id].content_tree);
        // pageNpmStatus[page.id] = "loaded";
      }
    }
  }
};

const loadNpmPage = async (p: PG, id: string) => {
  try {
    if (typeof window.exports === "undefined") {
      window.exports = {};
    }
    await importModule(`${serverurl}/npm/page/${id}/page.js`);

    rebuildTree(p, {
      note: "ws-update-comp",
    });
  } catch (e) {
    console.error(e);
  }
};

const loadPage = (p: PG, id: string) => {
  return new Promise<void>(async (resolve) => {
    await liveWS(p);
    p.mpageLoaded = async (mpage) => {
      const dbpage = mpage.getMap("map").toJSON() as page;
      p.pages[dbpage.id] = {
        id: dbpage.id,
        url: dbpage.url,
        name: dbpage.name,
        content_tree: dbpage.content_tree as any,
        js: dbpage.js_compiled as any,
      };
      const page = p.pages[dbpage.id];
      if (page && page.content_tree) {
        await loadComponent(p, page.content_tree);
      }
      resolve();
    };
    wsend(
      p,
      JSON.stringify({
        type: "get_page",
        page_id: id,
      } as WS_MSG_GET_PAGE)
    );
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
