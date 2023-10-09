import { IItem } from "../../../utils/types/item";
import { IText } from "../../../utils/types/text";
import { PG } from "./global";

export const validateLayout = (p: PG) => {
  if (p.site.layout) {
    p.layout.section = p.site.layout;

    for (const child of p.layout.section.childs) {
      const found = walk(child);
      if (found) {
        p.layout.content = found;
        break;
      }
    }
  }
};

const walk = (item: IItem | IText): IItem | IText | undefined => {
  if (item.name === "content") {
    return item;
  }
  if (item.type === "item") {
    for (const c of item.childs) {
      return walk(c);
    }
  }
};
