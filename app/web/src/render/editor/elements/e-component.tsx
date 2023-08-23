import { FC, useState } from "react";
import { useGlobal } from "web-utils";
import { IItem, MItem } from "../../../utils/types/item";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { loadComponent } from "../logic/comp";
import { EditorGlobal, PG } from "../logic/global";
import { EItem } from "./e-item";
import { ERender } from "./e-render";
import { EText } from "./e-text";
import { createAPI, createDB } from "../../../utils/script/init-api";

export const EComponent: FC<{
  item: IItem;
  editComponentId?: string;
}> = ({ item, editComponentId }) => {
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
  if (!comp.content_tree) return <>Component Missing</>;
  const props = comp.content_tree.component?.props || {};

  if (
    p.comp?.id === item.component.id &&
    p.compEdits.find((e) => e.id === item.id)
  ) {
    const comp = p.comps.doc[p.comp?.id || ""];

    const contentTree = comp.getMap("map").get("content_tree") as MItem;
    const cid = comp.getMap("map").get("id");
    const instanceId = contentTree.get("id");

    if (contentTree && cid && instanceId) {
      const citem = contentTree.toJSON() as IItem;
      citem.id = item.id;
      if (p.compProp.inherit && item.component && citem.component) {
        for (const [k, v] of Object.entries(item.component.props)) {
          citem.component.props[k] = v;
        }
        citem.nprops = item.nprops;
      }
      getRenderPropVal(props, citem, p);

      return (
        <>
          <ERender item={citem} editComponentId={editComponentId}>
            {(childs) => {
              return childs.map((e) => {
                if (e.type === "item")
                  return <EItem item={e} key={e.id} editComponentId={cid} />;
                else return <EText item={e} key={e.id} editComponentId={cid} />;
              });
            }}
          </ERender>
        </>
      );
    }
  }

  if (props) {
    getRenderPropVal(props, item, p);
  }
  const cid = item.component.id;

  return (
    <ERender item={item} editComponentId={editComponentId}>
      {(childs) => {
        return childs.map((e) => {
          if (e.type === "item")
            return <EItem item={e} key={e.id} editComponentId={cid} />;
          else return <EText item={e} key={e.id} editComponentId={cid} />;
        });
      }}
    </ERender>
  );
};

export const getRenderPropVal = (
  props: Record<string, FNCompDef>,
  item: IItem,
  p: PG
) => {
  const nprops: any = {};
  const exec = (key: string, fn: string, scopes: any) => {
    scopes["api"] = createAPI(p.site.api_url);
    scopes["db"] = createDB(p.site.api_url);

    if (key.includes("url") || key.includes("href") || key.includes("link")) {
      try {
        let url = "";
        eval(`url = ${fn}`);
      } catch (e) {}
    }

    const f = new Function(...Object.keys(scopes), `return ${fn}`);
    const res = f(...Object.values(scopes));
    return res;
  };

  for (const [key, _prop] of Object.entries(props)) {
    const prop = item.component?.props[key] || _prop;
    let val: any = null;
    let shouldEval = true;

    if (prop.meta?.type === "content-element") {
      shouldEval = false;

      if (prop.content) {
        prop.content.nprops = item.nprops;
        val = <EItem item={prop.content} />;
      } else {
        val = <></>;
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
