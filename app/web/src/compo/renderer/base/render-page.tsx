import { produce } from "immer";
import { createAPI, createDB } from "../../page/scripting/api-db";
import importModule from "../../page/tools/dynamic-import";
import { scanComponent } from "./components";
import { RSection } from "./elements/r-section";
import { RendererGlobal } from "./renderer-global";

// optimized for SSR: no component lazy loading,
// wait components to load first then render.
export const PrasiPage = (props: {
  rg: typeof RendererGlobal & { render: () => void };
  pathname: string;
}) => {
  const { rg, pathname } = props;
  const { page, ui } = rg;
  const { router } = page;

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
      } else {
        if (newPage) {
          if (newPage.id !== page.active.id) {
            page.active = newPage;
          }
        }
      }
    }
  }

  if (page.active) {
    if (typeof page.active.content_tree === "undefined") {
      if (!rg.loading) {
        rg.loading = true;
        rg.page.load(page.active.id).then((loadedPage) => {
          if (page.active) {
            page.active.content_tree = loadedPage?.content_tree || null;
            page.active.js_compiled = loadedPage?.js_compiled;
          }
          rg.loading = false;
          rg.render();
        });
      }
    }

    if (page.active.content_tree) {
      const compids = scanComponent(page.active.content_tree);
      const loadCompIds: string[] = [];
      compids.forEach((id) => {
        if (!rg.component.def[id]) {
          loadCompIds.push(id);
        }
      });

      if (loadCompIds.length > 0) {
        rg.loading = true;
        rg.component.load(loadCompIds).then((comps) => {
          comps.map((e) => {
            rg.component.def[e.id] = {
              id: e.id,
              content_tree: produce(e.content_tree, () => {}),
            };
          });

          rg.loading = false;
          rg.render();
        });
      }
    }
  }

  if (rg.site.id) {
    rg.scope = {
      tree: {},
      effect: {},
      value: {},
      evargs: {},
      types: {},
    };

    const scope = rg.scope;
    if (scope && rg.site) {
      if ((rg.site.js_compiled || "").trim()) {
        const api_url = rg.site.api_url;
        const args: any = {};
        if (api_url) {
          args["api"] = createAPI(api_url);
          args["db"] = createDB(api_url);
        }

        const exports = scope.value.root || {};
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
          fn(...Object.values(args), exports, types, importModule, rg.render);
          if (!scope.value.root) {
            scope.value.root = exports;
          }

          for (const [k, v] of Object.entries(exports)) {
            scope.value.root[k] = v;
          }
        } catch (e) {}
      }
    }
  }
  if (rg.loading) return ui.loading || <></>;
  if (!page.active) return ui.notfound;

  return (
    <div className="w-full h-full flex flex-col items-stretch flex-1 bg-white">
      {page.active.content_tree?.childs.map((e) => (
        <RSection key={e.id} item={e} />
      ))}
    </div>
  );
};
