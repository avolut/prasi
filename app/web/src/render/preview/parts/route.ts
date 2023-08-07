import { page } from "dbgen";
import { WS_MSG_GET_PAGE } from "../../../compo/editor/ws/msg";
import { loadComponent } from "./comp";
import { PG } from "./global";
import { previewWS, wsend } from "./ws";

export const routePreview = (p: PG, pathname: string) => {
  if (p.status === "ready") {
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
          if (mpage.get("id") !== found.id && p.ws) {
            loadPage(p, id).then(() => {
              p.render();
            });
          }
        } else {
          p.status = "not-found";
        }
      }
      p.page = page;
    }
  }
};

export const preload = async (p: PG, pathname: string) => {
  const found = p.route.lookup(pathname);
  if (found) {
    const page = p.pages[found.id];
    if (page && !page.content_tree && !p.pagePreload[found.id]) {
    }
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
        npm: "",
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
