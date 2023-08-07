import { FC, useState } from "react";
import { useGlobal } from "web-utils";
import { IItem } from "../../../compo/types/item";
import { FNCompDef } from "../../../compo/types/meta-fn";
import { PG, PreviewGlobal } from "../parts/global";
import { preload } from "../parts/route";
import { PItem } from "./p-item";
import { PRender } from "./p-render";
import { PText } from "./p-text";
import { createAPI, createDB } from "./script-exec";
import { loadComponent } from "../parts/comp";

export const PComponent: FC<{
  item: IItem;
}> = ({ item }) => {
  const [_, render] = useState({});
  const p = useGlobal(PreviewGlobal, "PREVIEW");

  if (!item.component) return null;
  const compid = item.component.id;

  let pcomp = p.comp.doc[compid];
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
  const comp = pcomp.getMap("map").toJSON();
  const props = comp.content_tree.component?.props || {};
  const nprops: any = {};

  if (props) {
    getRenderPropVal(props, item, nprops, p);
  }

  return (
    <PRender item={item}>
      {(childs) =>
        childs.map((e) => {
          if (e.type === "item") return <PItem item={e} key={e.id} />;
          else return <PText item={e} key={e.id} />;
        })
      }
    </PRender>
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
  p?: PG
) => {
  const exec = (fn: string, scopes: any) => {
    if (p) {
      scopes["api"] = createAPI(p.site.api_url);
      scopes["db"] = createDB(p.site.api_url);

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
        val = <PItem item={prop.content} />;
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
