import trim from "lodash.trim";
import * as Y from "yjs";
import { IItem, MItem } from "../../../../../../utils/types/item";
import { FNCompDef } from "../../../../../../utils/types/meta-fn";
import { PG } from "../../../../logic/global";
import { FBuild } from "../../../script/monaco/monaco-el";
import { fillID } from "../../../../tools/fill-id";
import { syncronize } from "y-pojo";

export const detachComp = async (
  p: PG,
  id: string,
  item: MItem,
  build: FBuild
) => {
  if (id) {
    const advjs = item.get("adv")?.get("js");

    const js_original = trim(
      (
        (typeof advjs === "object" ? advjs.toJSON() : advjs)?.trim() ||
        `<div {...props}>{children}</div>`
      ).trim(),
      ";"
    );

    const pass: Record<string, string> = {};
    const doc = p.comps.doc[item.get("component")?.get("id") || ""];
    let newitem = null as unknown as IItem;
    const propChild: Record<string, MItem> = {};
    if (doc) {
      newitem = doc.getMap("map").get("content_tree")?.toJSON() as IItem;
      const props = item.get("component")?.get("props");

      props?.forEach((p, k) => {
        const prop = p.toJSON() as FNCompDef;
        const cprop = (newitem.component?.props || {})[k];
        if (prop && cprop) {
          if (cprop.meta?.type === "content-element") {
            const content = p.get("content");
            if (content) {
              pass[k] = `<PassChild name={"_${k}_"}/>`;
              content.set("name", `_${k}_`);
              propChild[`_${k}_`] = content;
            }
          } else {
            pass[k] = prop.value;
          }
        }
      });
    }
    let js = "";
    let js_compiled = "";

    if (Object.entries(pass).length > 0) {
      js = `<PassProp ${Object.entries(pass)
        .map(([k, v]) => {
          return `${k}={${v}}`;
        })
        .join(" ")}>${js_original}</PassProp>`;
      js_compiled = await build("element.tsx", `render(${js})`);
    }

    if (!newitem.adv) newitem.adv = {};
    if (newitem.adv) {
      newitem.adv.js = js;
      newitem.adv.jsBuilt = js_compiled;
    }
    for (const child of Object.values(propChild)) {
      const citem = child.toJSON() as any;
      citem.hidden = "all";
      newitem.childs.unshift(citem);
    }
    newitem.id = id;
    delete newitem.component;

    item.doc?.transact(() => {
      item.parent.forEach((e, idx) => {
        if (e === item) {
          const map = new Y.Map();
          item.parent.delete(idx);
          item.parent.insert(idx, [map]);
          syncronize(map, fillID(newitem));
        }
      });
    });
  }
};
