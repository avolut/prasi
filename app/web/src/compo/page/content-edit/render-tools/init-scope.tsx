import { CEGlobal } from "../../../../base/global/content-editor";
import { IContent, MContent } from "../../../types/general";
import { IItem } from "../../../types/item";
import { FNCompDef } from "../../../types/meta-fn";
import { component } from "../../component";
import { CEItem } from "../ce-item";

export const initScope = (
  ceid: string,
  item: IContent,
  mitem: MContent,
  c: typeof CEGlobal,
  scopeName?: string
) => {
  const i = item as IItem;

  let comp = null as unknown as IItem;
  if (i.component && component.docs[i.component.id]) {
    comp = component.docs[i.component.id]
      ?.getMap("map")
      .get("content_tree")
      ?.toJSON() as any;
  }

  const scopeRootID = scopeName || "root";
  let scope = c.scope[scopeRootID];
  if (!c.scope[scopeRootID]) {
    c.scope[scopeRootID] = { tree: {}, effect: {}, value: {}, evargs: {} };
    scope = c.scope[scopeRootID];
  }

  if (scope) {
    if (!scope.tree[item.id]) {
      scope.tree[item.id] = {
        childs: new Set(),
        // name: item.name,
        // type: item.type,
        // lv: 0,
        parent_id: "root",
      };
    }
    if (item.type !== "text") {
      for (const c of (comp || item).childs) {
        if (!scope.tree[c.id]) {
          scope.tree[c.id] = {
            childs: new Set(),
            // name: c.name,
            // type: c.type,
            // lv: scope.tree[item.id].lv + 1,
            parent_id: item.id,
          };
        }
        scope.tree[item.id].childs.add(c.id);
      }
    }
  }

  if (i.component && i.component.id) {
    const doc = component.docs[i.component.id];

    if (doc) {
      const comp = doc.getMap("map").get("content_tree")?.toJSON() as IItem;

      if (!scope.value[item.id]) scope.value[item.id] = {};
      for (const [k, v] of Object.entries(comp.component?.props || {})) {
        let val = null;
        try {
          eval(`val = ${v.valueBuilt || v.value}`);
        } catch (e) {}
        scope.value[item.id][k] = val;
      }

      if (i.component.props) {
        const props = mitem.get("component")?.get("props");

        if (props) {
          props.forEach((p, k) => {
            const v = p.toJSON();
            if (v) {
              let val = null;
              if (v.meta.type === "content-element") {
                const content = p.get("content");
                if (content) {
                  val = <CEItem ceid={ceid} item={content} />;
                } else {
                  try {
                    eval(`val = ${v.valueBuilt || v.value}`);
                  } catch (e) {}
                }
              } else {
                try {
                  eval(`val = ${v.valueBuilt || v.value}`);
                } catch (e) {}
              }
              scope.value[item.id][k] = val;
            }
          });
        }
      }
    }
  }

  return scope;
};

export const findScope = (
  scope: ReturnType<typeof initScope>,
  item_id: string
) => {
  const scopes = [];

  while (true) {
    if (scope.value[item_id]) {
      scopes.push(scope.value[item_id]);
    }

    if (scope.tree[item_id] && scope.tree[scope.tree[item_id].parent_id]) {
      item_id = scope.tree[item_id].parent_id;
    } else {
      break;
    }
  }
  const result: any = {};
  for (const scope of scopes.reverse()) {
    for (const [k, v] of Object.entries(scope)) {
      result[k] = v;
    }
  }

  return result;
};
