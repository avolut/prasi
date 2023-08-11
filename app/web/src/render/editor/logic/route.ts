import { page } from "dbgen";
import { loadComponent } from "./comp";
import { PG } from "./global";
import { editorWS, wsend } from "./ws";
import { MPage } from "../../../utils/types/general";
import importModule from "../tools/dynamic-import";
import { WS_MSG_GET_PAGE } from "../../../utils/types/ws";

export const pageNpmStatus: Record<string, "loaded" | "loading"> = {};

export const routeEditor = (p: PG, page_id: string) => {
  if (p.status !== "loading") {
    if (!p.mpage || p.mpage.getMap("map").get("id") !== page_id) {
      p.status = "loading";
      loadPage(p, page_id).then(async () => {
        await loadNpmPage(page_id);
        p.status = "ready";
        p.render();
      });
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