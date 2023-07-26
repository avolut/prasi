import { CEGlobal } from "../../../../base/global/content-editor";
import { IContent, MContent } from "../../../types/general";
import { IItem } from "../../../types/item";
import { FMCompDef, FNCompDef } from "../../../types/meta-fn";
import { component } from "../../component";
import { CCItem } from "../ce-component";
import { CEItem } from "../ce-item";

export const initScope = (
  ceid: string,
  item: IContent,
  mitem: MContent | undefined,
  c: typeof CEGlobal,
  parentInstanceId?: string
) => {
  const i = item as IItem;

  let scope = c.scope;

  if (scope) {
    if (!scope.tree[item.id]) {
      scope.tree[item.id] = {
        childs: new Set(),
        // name: item.name,
        // type: item.type,
        // lv: 0,
        parent_id: parentInstanceId || "root",
      };
    }
    if (item.type !== "text") {
      if (Array.isArray(item.childs)) {
        for (const c of item.childs) {
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
      } else {
        console.log(item.childs, item, mitem);
      }
    }
  }

  if (i.component && i.component.id) {
    const doc = component.docs[i.component.id];

    if (doc) {
      const comp = doc.getMap("map").get("content_tree")?.toJSON() as IItem;

      const exec = (fn: string) => {
        const existingScope = findScope(c.scope, item.id || "");
        const f = new Function(...Object.keys(existingScope), `return ${fn}`);
        return f(...Object.values(existingScope));
      };

      if (!scope.value[item.id]) scope.value[item.id] = {};
      if (mitem) {
        const props = mitem.get("component")?.get("props");
        for (const [k, v] of Object.entries(comp.component?.props || {})) {
          const prop = props?.get(k) as any;
          const val = getPropVal({
            ceid,
            name: k,
            prop,
            comp,
            item: item as IItem,
            c,
          });
          scope.value[item.id][k] = val;
        }
      } else {
        for (const [k, v] of Object.entries(comp.component?.props || {})) {
          let val = null;
          const prop = (item as IItem).component?.props[k];
          if (prop) {
            const jrop = prop;
            if (jrop) {
              const cprop = comp.component?.props[k];
              const type = cprop?.meta?.type || v.meta?.type || "text";
              if (type === "content-element") {
                const content = prop.content;
                if (content) {
                  val = <CCItem ceid={ceid} item={content} />;
                } else {
                  try {
                    val = exec(jrop.valueBuilt || jrop.value);
                  } catch (e) {}
                }
              } else {
                try {
                  val = exec(jrop.valueBuilt || jrop.value);
                } catch (e) {}
              }
            }
          } else {
            try {
              val = exec(v.valueBuilt || v.value);
            } catch (e) {}
          }

          scope.value[item.id][k] = val;
        }
      }
    }
  }

  return scope;
};

export const findScope = (
  scope: ReturnType<typeof initScope>,
  itemID: string
) => {
  const scopes = [];

  const root_id = itemID;
  let item_id = itemID;
  let itemset = new Set<string>();
  while (true) {
    if (scope.value[item_id]) {
      if (root_id !== item_id) {
        scopes.push(scope.value[item_id]);
      }
    }

    if (scope.tree[item_id] && scope.tree[scope.tree[item_id].parent_id]) {
      item_id = scope.tree[item_id].parent_id;

      if (itemset.has(item_id)) {
        break;
      } else {
        itemset.add(item_id);
      }
    } else {
      break;
    }
  }
  const result: any = {};
  if (scope.value.root) {
    scopes.push(scope.value.root);
  }

  for (const scope of scopes.reverse()) {
    for (const [k, v] of Object.entries(scope)) {
      result[k] = v;
    }
  }

  return result;
};

export const getPropVal = (arg: {
  ceid: string;
  name: string;
  prop: FMCompDef;
  comp: IItem;
  c: typeof CEGlobal;
  item: IItem;
}) => {
  const { ceid, name, prop, comp, item, c } = arg;
  const k = name;
  const v = comp.component?.props[k];
  let val = null;

  const exec = (fn: string) => {
    const existingScope = findScope(c.scope, item.id || "");
    const f = new Function(...Object.keys(existingScope), `return ${fn}`);
    return f(...Object.values(existingScope));
  };

  if (v) {
    if (prop) {
      const jrop = prop.toJSON() as FNCompDef;
      if (jrop) {
        const cprop = comp.component?.props[k];
        const type = cprop?.meta?.type || v.meta?.type || "text";
        if (type === "content-element") {
          const content = prop.get("content");
          if (content) {
            val = (
              <CEItem
                ceid={ceid}
                item={content}
                parentInstanceId={item.id}
                preventRenderComponent
              />
            );
          } else {
            try {
              val = exec(jrop.valueBuilt || jrop.value);
            } catch (e) {
              console.log(e);
            }
          }
        } else {
          try {
            val = exec(jrop.valueBuilt || jrop.value);
          } catch (e) {
            console.log(e);
          }
        }
      }
    } else {
      try {
        val = exec(v.valueBuilt || v.value);
      } catch (e) {}
    }
  }
  return val;
};
