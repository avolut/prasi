import { IItem } from "../../../utils/types/item";
import { IText } from "../../../utils/types/text";
import { LSite, PG } from "./global";

export const validateLayout = async (p: {
  site: LSite;
  layout: PG["layout"];
}) => {
  if (p.site.layout) {
    p.layout.section = p.site.layout;

    for (const child of p.layout.section.childs) {
      const found = await walk(child);
      if (found) {
        p.layout.content = found;
        break;
      }
    }
  }
};

const walk = async (
  item: IItem | IText
): Promise<IItem | IText | undefined> => {
  if (item.name === "content") {
    return item;
  }
  if (item.type === "item" && !item.component?.id) {
    for (const c of item.childs) {
      const found = await walk(c);
      if (found) {
        return found;
      }
    }
  }
};
