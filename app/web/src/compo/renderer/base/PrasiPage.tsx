import { useLocal } from "web-utils";
import { createAPI, createDB } from "../../page/scripting/api-db";
import importModule from "../../page/tools/dynamic-import";
import { RSection } from "./elements/r-section";
import { RendererGlobal } from "./renderer-global";
import { PRASI_PAGE } from "./renderer-types";

(window as any).isEditor = false;

// optimized for SSR: no component lazy loading,
// wait components to load first then render.
export const PrasiPage = (props: {
  rg: typeof RendererGlobal & { render: () => void };
  pathname: string;
}) => {
  const { rg, pathname } = props;
  const { page, ui } = rg;
  const { router } = page;
  const local = useLocal({ isNewPage: false });

  if (router) {
    let newPage = null;
    if (location.search.startsWith("?page_id=")) {
      newPage = page.list[location.search.substring("?page_id=".length)];
    } else {
      newPage = router.lookup(pathname);
    }

    if (newPage) {
      if (!page.active) {
        page.active = newPage;
        local.isNewPage = true;
      } else {
        if (newPage) {
          if (newPage.id !== page.active.id) {
            page.active = newPage;
            local.isNewPage = true;
          }
        }
      }
    }
  }

  if (page.active) {
    if (typeof page.active.content_tree === "undefined") {
      if (!rg.loading) {
        rg.loading = true;
        const preloads = rg.page.preloads[page.active.id] as any;
        const loadComp = async () => {
          if (page.active) {
            let res: any[] = [];
            res = await api.comp_scan(page.active.id);
            if (res) {
              for (const c of res) {
                rg.component.def[c.id] = {
                  id: c.id,
                  content_tree: c.content_tree,
                };
              }
            }
          }
        };
        const loaded = async (loadedPage: Required<PRASI_PAGE> | null) => {
          if (page.active) {
            try {
              if (typeof window.exports === "undefined") {
                window.exports = {};
              }
              const ts = new Date(page.active.updated_at || "").getTime();
              await importModule(
                `${serverurl}/npm/page/${page.active.id}/index.js?${ts}`
              );
            } catch (e) {
              console.error(e);
            }
            page.active.content_tree = loadedPage?.content_tree || null;
            page.active.js_compiled = loadedPage?.js_compiled;
          }
        };

        if (preloads) {
          preloads.then(loaded).then(() => {
            rg.loading = false;
            rg.render();
          });
        } else {
          rg.page
            .load(page.active.id)
            .then(loaded)
            .then(loadComp)
            .then(() => {
              rg.loading = false;
              rg.render();
            });
        }
      }
    }
  }

  if (rg.site.id && local.isNewPage) {
    rg.instances = {};

    if (rg.site) {
      if ((rg.site.js_compiled || "").trim()) {
        const api_url = rg.site.api_url;
        const args: any = {};
        if (api_url) {
          args["api"] = createAPI(api_url);
          args["db"] = createDB(api_url);
        }

        if (!window.exports) {
          window.exports = {};
        }
        const exports = window.exports;
        const types = {};
        const fn = new Function(
          ...Object.keys(args),
          "exports",
          "types",
          "load",
          "render",
          rg.site.js_compiled
        );
        try {
          fn(exports, types, importModule);
        } catch (e) {}
      }
    }
    local.isNewPage = false;
  }
  if (rg.loading || local.isNewPage) return ui.loading || <></>;
  if (!page.active) return ui.notfound;

  return (
    <div className="flex flex-col items-stretch flex-1 bg-white">
      {page.active.content_tree?.childs.map((e) => (
        <RSection key={e.id} item={e} />
      ))}
    </div>
  );
};
