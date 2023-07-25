import { findScope } from "../../../page/content-edit/render-tools/init-scope";
import { IContent } from "../../../types/general";
import { IItem } from "../../../types/item";
import { SingleScope } from "../../../types/script";
import { RendererGlobal } from "../renderer-global";
import { RItem } from "./r-item";
export const scriptScope = (
  item: IContent,
  rg: typeof RendererGlobal,
  parentInstanceId?: string
): SingleScope => {
  const i = item as IItem;

  let comp = null as unknown as IItem;
  if (i.component && rg.component.def[i.component.id]) {
    comp = rg.component.def[i.component.id].content_tree;
  }

  const scope = rg.scope;
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

  if (i.component && i.component.id && comp) {
    if (!scope.value[item.id]) scope.value[item.id] = {};

    const exec = (fn: string) => {
      const existingScope = findScope(rg.scope, item.id || "");
      const f = new Function(...Object.keys(existingScope), `return ${fn}`);
      return f(...Object.values(existingScope));
    };

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
              val = <RItem item={content} parentInstanceId={item.id} />;
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

  return scope;
};
