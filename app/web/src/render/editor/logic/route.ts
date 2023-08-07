import { page } from "dbgen";
import { WS_MSG_GET_PAGE } from "../../../compo/editor/ws/msg";
import { loadComponent } from "./comp";
import { PG } from "./global";
import { editorWS, wsend } from "./ws";
import importModule from "../../../compo/page/tools/dynamic-import";

export const pageNpmStatus: Record<string, "loaded" | "loading"> = {};

export const routeEditor = (p: PG, page_id: string) => {
  if (p.status !== "loading") {
    const id = page_id;
    p.status = "loading";
    loadPage(p, id).then(async () => {
      await loadNpmPage(id);
      p.status = "ready";
      p.render();
    });
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
    await editorWS(p);
    p.mpageLoaded = async (mpage) => {
      const dbpage = mpage.getMap("map").toJSON() as page;
      const page = {
        id: dbpage.id,
        content_tree: dbpage.content_tree as any,
        js: dbpage.js_compiled as any,
      };
      if (page && page.content_tree) {
        p.page = page;
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
