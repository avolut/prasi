import { page } from "dbgen";
import { loadComponent } from "./comp";
import { PG } from "./global";
import { editorWS, wsend } from "./ws";
import { MPage } from "../../../utils/types/general";
import importModule from "../tools/dynamic-import";
import { WS_MSG_GET_PAGE } from "../../../utils/types/ws";

export const pageNpmStatus: Record<string, "loaded" | "loading"> = {};
const loadingCounter = {} as Record<string, number>;

export const routeEditor = (p: PG, page_id: string) => {
  if (p.status !== "loading") {
    if (!p.mpage || p.mpage.getMap("map").get("id") !== page_id) {
      p.status = "loading";
      loadPage(p, page_id).then(async () => {
        await loadNpmPage(page_id);
        p.status = "ready";
        p.render();

        if (!p.mpage || p.mpage.getMap("map").get("id") !== page_id) {
          if (!loadingCounter[page_id]) {
            loadingCounter[page_id] = 1;
          } else {
            loadingCounter[page_id]++;
          }

          if (loadingCounter[page_id] > 2) {
            p.status = "reload";
            p.render();
            p.mpageLoaded = () => {
              p.status = "ready";
              p.render();
            };

            await api.page_reload(page_id);
          }
        }
      });
    }
  }
};

const loadNpmPage = async (id: string) => {
  try {
    if (typeof window.exports === "undefined") {
      window.exports = {};
    }
    await importModule(`${serverurl}/npm/page/${id}/page.js`);
  } catch (e) {
    console.error(e);
  }
};

const loadPage = (p: PG, id: string) => {
  (window as any).prasiPageID = id;

  return new Promise<MPage>(async (resolve) => {
    await editorWS(p);
    p.mpageLoaded = async (mpage) => {
      const dbpage = mpage.getMap("map").toJSON() as page;
      const page = {
        id: dbpage.id,
        name: dbpage.name,
        url: dbpage.url,
        content_tree: dbpage.content_tree as any,
        js: dbpage.js_compiled as any,
      };
      if (page && page.content_tree) {
        p.mpage = mpage;
        p.page = page;
        await loadComponent(p, page.content_tree);
      }
      resolve(mpage);
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
