import { FC } from "react";
import { useGlobal } from "web-utils";
import { createAPI, createDB } from "../../../page/scripting/api-db";
import { IItem } from "../../../types/item";
import { Loading } from "../../prasi/ui/loading";
import { RendererGlobal } from "../renderer-global";
import { RItem } from "./r-item";
import { RRender } from "./r-render";
import { RText } from "./r-text";
import { FNCompDef } from "../../../types/meta-fn";
import { preload } from "./script-exec";

export const RComponent: FC<{
  item: IItem;
}> = ({ item }) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");

  if (!item.component) return null;

  const compid = item.component.id;

  let comp = rg.component.def[compid];
  if (!comp) {
    if (!rg.component.loading[compid]) {
      rg.component.loading[compid] = true;
      rg.component.load([compid]).then((comps) => {
        comps.map((e) => {
          rg.component.def[e.id] = {
            id: e.id,
            content_tree: e.content_tree,
          };
        });
        rg.loading = false;
        delete rg.component.loading[compid];
        rg.render();
      });
    }
    return (
      <div
        className={cx(
          "h-[15px] flex items-center",
          css`
            .loadbar {
              width: 50px;
            }
          `
        )}
      >
        <Loading backdrop={false} />
      </div>
    );
  }
  const props = comp.content_tree.component?.props || {};
  const nprops: any = {};

  if (props) {
    getRenderPropVal(props, item, nprops, rg);
  }

  return (
    <RRender item={item}>
      {(childs) =>
        childs.map((e) => {
          if (e.type === "item") return <RItem item={e} key={e.id} />;
          else return <RText item={e} key={e.id} />;
        })
      }
    </RRender>
  );
};

const extractNavigate = (str: string) => {
  let i = 0;
  const nstr = "navigate(";
  const founds: string[] = [];
  let lasti = 0;
  while (true) {
    const start = str.indexOf(nstr, i);
    lasti = i;
    if (start >= 0) {
      const char = str[start + nstr.length];
      const end = str.indexOf(`${char})`, start + nstr.length + 1);
      const text = str.substring(start + nstr.length + 1, end);
      i = end + 3;
      founds.push(text);
    }

    if (lasti === i) {
      break;
    }
  }
  return founds;
};

export const getRenderPropVal = (
  props: Record<string, FNCompDef>,
  item: IItem,
  nprops: any,
  rg?: typeof RendererGlobal & { render: () => void }
) => {
  const exec = (fn: string, scopes: any) => {
    if (rg) {
      scopes["api"] = createAPI(rg.site.api_url);
      scopes["db"] = createDB(rg.site.api_url);

      if (fn.includes("navigate(") && rg.page.router) {
        const navs = extractNavigate(fn);
        for (const n of navs) {
          const found = rg.page.router.lookup(n);
          if (found && !found.content_tree && !rg.page.preloads[found.id]) {
            preload(rg, found);
          }
        }
      }

      const f = new Function(...Object.keys(scopes), `return ${fn}`);
      const res = f(...Object.values(scopes));
      return res;
    }
    return null;
  };

  for (const [key, _prop] of Object.entries(props)) {
    const prop = item.component?.props[key] || _prop;
    let val: any = null;
    let shouldEval = true;

    if (prop.meta?.type === "content-element") {
      if (prop.content) {
        prop.content.nprops = item.nprops;
        val = <RItem item={prop.content} />;
        shouldEval = false;
      }
    }

    if (shouldEval) {
      try {
        val = exec(prop.valueBuilt || prop.value, {
          ...window.exports,
          ...item.nprops,
        });
      } catch (e) {}
    }
    nprops[key] = val;
  }
  if (!item.nprops) item.nprops = nprops;
  else {
    for (const [k, v] of Object.entries(nprops)) {
      item.nprops[k] = v;
    }
  }
};
