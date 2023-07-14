import { component } from "../../../page/component";
import { IContent } from "../../../types/general";
import { IItem } from "../../../types/item";
import { SingleScope } from "../../../types/script";
import { RendererGlobal } from "../renderer-global";

export const scriptScope = (
  item: IContent,
  rg: typeof RendererGlobal
): SingleScope => {
  const i = item as IItem;

  let comp = null as unknown as IItem;
  if (i.component && component.docs[i.component.id]) {
    comp = component.docs[i.component.id]
      ?.getMap("map")
      .get("content_tree")
      ?.toJSON() as any;
  }

  const scope = rg.scope;
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

  return scope;
};
