import { page } from "dbgen";
import { validate } from "uuid";
import { w } from "../../../utils/types/general";
import { WS_MSG_GET_PAGE } from "../../../utils/types/ws";
import importModule from "../../editor/tools/dynamic-import";
import { loadComponent } from "./comp";
import { LiveGlobal, PG } from "./global";
import { liveWS, wsend } from "./ws";
import { rebuildTree } from "./tree-logic";

const cacheMeta = {} as Record<string, (typeof LiveGlobal)["treeMeta"]>;

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
        if (found.params) {
          for (const [k, v] of Object.entries(found.params)) {
            w.params[k] = v;
          }
        }
        page_id = found.id;
      }
    }

    if (page_id) {
      (window as any).prasiPageID = page_id;
      const promises: Promise<void>[] = [];
      if (page_id !== p.page?.id) {
        if (p.page) {
          cacheMeta[p.page.id] = p.treeMeta;
        }

        p.page = p.pages[page_id];

        if (p.page && cacheMeta[p.page.id]) {
          p.treeMeta = cacheMeta[p.page.id];
        } else {
          promises.push(loadNpmPage(p, page_id));
          p.treeMeta = {};
        }
      }
      if (!p.page || !p.page.content_tree) {
        p.status = "loading";
        promises.push(streamPage(p, page_id));
      } else {
        streamPage(p, page_id);
      }

      if (promises.length > 0) {
        Promise.all(promises).then(async () => {
          await pageLoaded(p);
          p.status = "ready";
          p.render();
        });
      } else {
        pageLoaded(p);
      }
    }
  }
};

const pageLoaded = async (p: PG) => {
  if (p.page) {
    rebuildTree(p, { render: false, note: "render", reset: false });
    p.status = "ready";
  } else {
    p.status = "not-found";
  }
};

export const preload = async (p: PG, pathname: string) => {
  const found = p.route.lookup(pathname);
  if (found) {
    if (!p.pages[found.id] && !p.pagePreload[found.id]) {
      p.pagePreload[found.id] = true;
      const dbpage = await db.page.findFirst({
        where: { id: found.id },
        select: {
          id: true,
          url: true,
          name: true,
          content_tree: true,
          js_compiled: true,
        },
      });
      if (dbpage) {
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
        delete p.pagePreload[found.id];
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
  } catch (e) {
    console.error(e);
  }
};

const streamPage = (p: PG, id: string) => {
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
