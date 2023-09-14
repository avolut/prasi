import { FC, useState } from "react";
import { useGlobal } from "web-utils";
import { createAPI, createDB } from "../../../utils/script/init-api";
import { IItem } from "../../../utils/types/item";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { loadComponent } from "../logic/comp";
import { PG, SPAGlobal } from "../logic/global";
import { SItem } from "./s-item";
import { SRender } from "./s-render";
import { SText } from "./s-text";
import { extractNavigate, preload } from "../logic/route";

export const SComponent: FC<{
  item: IItem;
}> = ({ item }) => {
  const [_, render] = useState({});
  const p = useGlobal(SPAGlobal, "SPA");

  if (!item.component) return null;
  const compid = item.component.id;

  let pcomp = p.comp.raw[compid];
  if (!pcomp) {
    if (!p.comp.pending[compid]) {
      loadComponent(p, compid).then(() => {
        render({});
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
        {p.ui.preload}
      </div>
    );
  }
  const comp = pcomp;
  const props = comp.content_tree.component?.props || {};
  const nprops: any = {};

  if (props) {
    getRenderPropVal(props, item, nprops, p);
  }

  return (
    <SRender item={item}>
      {(childs) =>
        childs.map((e) => {
          if (e.type === "item") return <SItem item={e} key={e.id} />;
          else return <SText item={e} key={e.id} />;
        })
      }
    </SRender>
  );
};

export const getRenderPropVal = (
  props: Record<string, FNCompDef>,
  item: IItem,
  nprops: any,
  p?: PG
) => {
  const exec = (key: string, fn: string, scopes: any) => {
    if (p) {
      scopes["api"] = createAPI(p.site.api_url);
      scopes["db"] = createDB(p.site.api_url);

      if (key.includes("url") || key.includes("href") || key.includes("link")) {
        try {
          let url = "";
          eval(`url = ${fn}`);
          if (typeof url === "string" && url.startsWith("/")) {
            preload(p, url);
          }
        } catch (e) {}
      }
      if (fn.includes("navigate(") && p.route) {
        const navs = extractNavigate(fn);
        for (const n of navs) {
          preload(p, n);
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
        const content = prop.content;
        val = {
          _jsx: true,
          content: content,
        };
        shouldEval = false;


        try {
          const evaled = exec(key, prop.valueBuilt || prop.value, {
            ...window.exports,
            ...item.nprops,
          });

          if (
            typeof evaled === "object" &&
            evaled._jsx &&
            typeof evaled.Comp === "function"
          ) {
            val = evaled;
          }
        } catch (e) {}
      }
    }

    if (shouldEval) {
      try {
        val = exec(key, prop.valueBuilt || prop.value, {
          ...window.exports,
          ...item.nprops,
        });
      } catch (e) {
        let compName = "";
        if (p && item.component?.id) {
          const name = p.comp.raw[item.component.id].content_tree.name;
          compName = `in component ${name}`;
        }
        console.warn(`Error when evaluating prop [${key}] ${compName}`, e);
        console.warn(`return ${prop.valueBuilt || prop.value}`);
      }
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
