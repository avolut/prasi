import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { IRoot } from "../../../utils/types/root";
import { fillID } from "../../editor/tools/fill-id";
import { PG } from "./global";

export const newPageComp = (p: PG, item: IItem) => {
  if (item.component?.id) {
    if (!p.comp.doc[item.component.id]) {
      console.error("Component Not Found: ", item.component.id);
      return null;
    }

    const comp = p.comp.doc[item.component.id].getMap("map").toJSON();
    if (comp && comp.content_tree) {
      const citem = fillID(comp.content_tree) as IItem;

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

      return nitem as IItem;
    }
  }
};

export const scanComponent = (
  item: IRoot | IContent,
  componentIDS?: Set<string>
) => {
  const ids = componentIDS || new Set();

  if (item.type === "item" && item.component?.id) {
    ids.add(item.component.id);

    if (item.component.props) {
      for (const p of Object.values(item.component.props)) {
        if (p.meta?.type === "content-element" && p.content) {
          scanComponent(p.content, ids);
        }
      }
    }
  }

  if (item.type !== "text") {
    for (const c of item.childs) {
      scanComponent(c, ids);
    }
  }
  return ids;
};
