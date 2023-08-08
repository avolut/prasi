import { page } from "dbgen";
import { loadComponent } from "./comp";
import { PG } from "./global";
import { previewWS, wsend } from "./ws";
import importModule from "../../editor/tools/dynamic-import";
import { WS_MSG_GET_PAGE } from "../../../utils/types/ws";

export const pageNpmStatus: Record<string, "loaded" | "loading"> = {};

export const routePreview = (p: PG, pathname: string) => {
  if (p.status !== "loading") {
    const found = p.route.lookup(pathname);
    if (!found) {
      p.status = "not-found";
    } else {
      const id = found.id;
      const page = p.pages[id];
      if (!page) {
        p.status = "loading";
        loadPage(p, id).then(() => {
          p.status = "ready";
          p.render();
        });
      } else {
        const mpage = p.mpage?.getMap("map");
        if (mpage) {
          p.status = "ready";
          if (mpage.get("id") !== p.page?.id) {
            loadPage(p, id).then(() => {
              p.render();
            });
          }
        } else {
          p.status = "not-found";
        }
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
      const page = await db.page.findFirst({
        where: { id: found.id },
        select: {
          id: true,
          content_tree: true,
          js_compiled: true,
        },
      });
      if (page) {
        pageNpmStatus[page.id] = "loading";
        await loadNpmPage(page.id);
        delete p.pagePreload[found.id];
        p.pages[found.id] = {
          id: page.id,
          js: page.js_compiled as any,
          content_tree: page.content_tree as any,
        };
        await loadComponent(p, p.pages[found.id].content_tree);
        pageNpmStatus[page.id] = "loaded";
      }
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
    await previewWS(p);
    p.mpageLoaded = async (mpage) => {
      const dbpage = mpage.getMap("map").toJSON() as page;
      p.pages[dbpage.id] = {
        id: dbpage.id,
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
      if (char === '"' || char === "'") {
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
