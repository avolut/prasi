import { FC, useState } from "react";
import { useGlobal } from "web-utils";
import { IItem } from "../../../utils/types/item";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { loadComponent } from "../logic/comp";
import { EditorGlobal, PG } from "../logic/global";
import { extractNavigate, preload } from "../logic/route";
import { EItem } from "./e-item";
import { ERender } from "./e-render";
import { EText } from "./e-text";
import { createAPI, createDB } from "./script-exec";

export const EComponent: FC<{
  item: IItem;
  gid: string;
}> = ({ item, gid }) => {
  const [_, render] = useState({});
  const p = useGlobal(EditorGlobal, "EDITOR");

  if (!item.component) return null;
  const compid = item.component.id;

  let pcomp = p.comps.doc[compid];
  if (!pcomp) {
    if (!p.comps.pending[compid]) {
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
    getRenderPropVal(props, item, nprops, gid, p);
  }

  return (
    <ERender item={item} gid={gid}>
      {(childs) =>
        childs.map((e) => {
          if (e.type === "item") return <EItem gid={gid} item={e} key={e.id} />;
          else return <EText item={e} key={e.id} gid={gid} />;
        })
      }
    </ERender>
  );
};

export const getRenderPropVal = (
  props: Record<string, FNCompDef>,
  item: IItem,
  nprops: any,
  gid: string,
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
        val = <EItem gid={gid} item={prop.content} />;
        shouldEval = false;
      }
    }

    if (shouldEval) {
      try {
        val = exec(key, prop.valueBuilt || prop.value, {
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
