import trim from "lodash.trim";
import { isValidElement } from "react";
import { CEGlobal } from "../../../../base/global/content-editor";
import { component } from "../../../page/component";
import { getPropVal } from "../../../page/content-edit/render-tools/init-scope";
import { IItem, MItem } from "../../../types/item";
import { FBuild } from "../script/monaco/monaco-element";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { FNCompDef } from "../../../types/meta-fn";
import { fillID } from "../../../page/tools/fill-id";

export const detachComp = async (
  ceid: string,
  c: typeof CEGlobal,
  item: MItem,
  build: FBuild
) => {
  const id = item.get("id");
  if (id) {
    const js_original = trim(
      (c.instances[id].adv?.js || `<div {...props}>{children}</div>`).trim(),
      ";"
    );
    const pass: Record<string, string> = {};
    const doc = component.docs[item.get("component")?.get("id") || ""];
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
              pass[k] = `<PassChild name={"${k}"}/>`;
              propChild[k] = content;
            }
          } else {
            pass[k] = prop.value;
          }
        }
      });
    }
    const js = `<PassProp ${Object.entries(pass)
      .map(([k, v]) => {
        return `${k}={${v}}`;
      })
      .join(" ")}>${js_original}</PassProp>`;
    const js_compiled = await build("element.tsx", `render(${js})`);

    if (!newitem.adv) newitem.adv = {};
    if (newitem.adv) {
      newitem.adv.js = js;
      newitem.adv.jsBuilt = js_compiled;
    }
    for (const child of Object.values(propChild)) {
      const citem = child.toJSON() as any;
      delete citem.isPropContent;
      citem.hidden = "all";
      newitem.childs.unshift(citem);
    }
    newitem.id = id;
    delete newitem.component;

    c.doc.transact(() => {
      const ids = [];
      const walk = (s: Set<string>) => {
        s.forEach((e) => {
          ids.push(e);
          if (c.scope.tree[e]) {
            walk(c.scope.tree[e].childs);
          }
        });
      };
      ids.push(id);
      walk(c.scope.tree[id].childs);
      for (const id of ids) {
        delete c.scope.value[id];
        delete c.scope.tree[id];
        delete c.instances[id];
      }

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
