import { produce } from "immer";
import { createAPI, createDB } from "../../page/scripting/api-db";
import importModule from "../../page/tools/dynamic-import";
import { scanComponent } from "./components";
import { RSection } from "./elements/r-section";
import { RendererGlobal } from "./renderer-global";
import { useLocal } from "web-utils";

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
        rg.page.load(page.active.id).then(async (loadedPage) => {
          if (page.active) {
            page.active.content_tree = loadedPage?.content_tree || null;
            page.active.js_compiled = loadedPage?.js_compiled;
            const res: any = await api.comp_scan(page.active.id);
            if (res) {
              for (const c of res) {
                rg.component.def[c.id] = {
                  id: c.id,
                  content_tree: c.content_tree,
                };
              }
            }
          }
          rg.loading = false;
          rg.render();
        });
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
      }
    }
    local.isNewPage = false;
  }
  if (rg.loading || local.isNewPage) return ui.loading || <></>;
  if (!page.active) return ui.notfound;

  return (
    <div className="w-full h-full flex flex-col items-stretch flex-1 bg-white">
      {page.active.content_tree?.childs.map((e) => (
        <RSection key={e.id} item={e} />
      ))}
    </div>
  );
};
