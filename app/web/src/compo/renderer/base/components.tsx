import { fillID } from "../../page/tools/fill-id";
import { IContent } from "../../types/general";
import { IItem } from "../../types/item";
import { IRoot } from "../../types/root";
import { RendererGlobal } from "./renderer-global";

export const scanComponent = (
  item: IRoot | IContent,
  componentIDS?: Set<string>
) => {
  const ids = componentIDS || new Set();

  if (item.type === "item" && item.component?.id) {
    ids.add(item.component.id);
  }

  if (item.type !== "text") {
    for (const c of item.childs) {
      scanComponent(c, ids);
    }
  }
  return ids;
};

export const instantiateComp = (rg: typeof RendererGlobal, item: IItem) => {
  if (item.component?.id) {
    const comp = rg.component.def[item.component.id];
    if (comp && comp.content_tree) {
      const citem = fillID(
        JSON.parse(JSON.stringify(comp.content_tree))
      ) as IItem;

      const nitem = {
        ...citem,
        id: item.id,
        component: {
          id: citem.component?.id || "",
          name: citem.component?.name || "",
          props: {
            ...citem.component?.props,
            ...item.component?.props,
          },
        },
      };
      
      return nitem;
    }
  }
};
