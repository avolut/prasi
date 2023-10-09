import { page } from "dbgen";
import { validate } from "uuid";
import { w } from "../../../utils/types/general";
import { WS_MSG_GET_PAGE } from "../../../utils/types/ws";
import importModule from "../../editor/tools/dynamic-import";
import { loadComponent } from "./comp";
import { LPage, LiveGlobal, PG } from "./global";
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
        if (!w.params) w.params = {};
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
      let hasCache = false;
      if (page_id !== p.page?.id) {
        if (p.page) {
          cacheMeta[p.page.id] = p.treeMeta;
        }

        p.page = p.pages[page_id];

        if (p.page && cacheMeta[p.page.id]) {
          p.treeMeta = cacheMeta[p.page.id];
          hasCache = true;
        } else {
          p.treeMeta = {};
        }
      }
      if (!p.page || !p.page.content_tree) {
        promises.push(loadNpmPage(p, page_id));
        p.status = "loading";

        if (!p.prod) {
          promises.push(streamPage(p, page_id));
        } else {
          promises.push(loadPage(p, page_id));
        }
      } else {
        if (!p.prod) {
          streamPage(p, page_id);
        }
      }

      if (promises.length > 0) {
        Promise.all(promises).then(async () => {
          await pageLoaded(p);
          p.status = "ready";
          p.render();
        });
      } else {
        if (p.prod && !hasCache && !firstRender[page_id]) {
          firstRender[page_id] = true;
          pageLoaded(p).then(p.render);
        } else {
          if (!p.prod) {
            pageLoaded(p).then(() => {
              if (stream.page_id !== page_id) {
                stream.page_id = page_id;
                p.render();
              }
            });
          } else {
            pageLoaded(p);
          }
        }
      }
    }
  }
};
const firstRender = {} as Record<string, true>;

const pageLoaded = async (p: PG) => {
  if (p.page) {
    await rebuildTree(p, { render: false, note: "render", reset: false });
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
      const dbpage = await p.loader.page(p, found.id);
      if (dbpage) {
        p.pages[dbpage.id] = dbpage;
        const page = p.pages[dbpage.id];
        if (page && page.content_tree) {
          await loadComponent(p, page.content_tree);
        }
        delete p.pagePreload[found.id];
        await loadNpmPage(p, dbpage.id);
      }
    }
  }
};

const npmPageLoaded = {} as Record<string, true>;
const loadNpmPage = async (p: PG, id: string) => {
  try {
    if (!npmPageLoaded[id]) {
      npmPageLoaded[id] = true;
      if (typeof window.exports === "undefined") {
        window.exports = {};
      }
      await importModule(p.loader.npm(p, "page", id));
    }
  } catch (e) {
    console.error(e);
  }
};

const loading = {} as Record<string, Promise<LPage | null>>;

const loadPage = async (p: PG, id: string) => {
  if (!loading[id]) {
    loading[id] = p.loader.page(p, id);
  }

  const page = await loading[id];

  if (page) {
    p.pages[page.id] = {
      id: page.id,
      url: page.url,
      name: page.name,
      content_tree: page.content_tree as any,
      js: (page as any).js_compiled as any,
    };

    const cur = p.pages[page.id];
    if (cur && cur.content_tree) {
      await loadComponent(p, cur.content_tree);
    }
  }
};

const stream = { page_id: "" };

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
