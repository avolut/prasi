import { NodeModel } from "@minoru/react-dnd-treeview";
import { IContent, MContent } from "../../types/general";
import { component } from "../component";
import { IItem, MItem } from "../../types/item";
import * as Y from "yjs";
import { createId } from "@paralleldrive/cuid2";
import { syncronize } from "y-pojo";
import { IRoot, MRoot } from "../../types/root";
import { ISection } from "../../types/section";
import { IText } from "../../types/text";
import set from "lodash.set";
import find from "lodash.find";
import get from "lodash.get";
export const flatTree = (item: Array<IContent>, rootChildren: any) => {
  const children = rootChildren as any;
  let ls = structuredClone(item);
  let sitem: any = ls.map((v: any) => {
    if (v.type !== "text") {
      v.childs = [];
    }
    return { ...v };
  });
  let result = [] as any;
  sitem.forEach((v: any) => {
    let parent = children.filter((x: any) =>
      find(get(x, "childs"), (x: IContent) => x.id === v.id)
    );
    if (get(parent, "length")) {
      let s = sitem.find((e: any) => e.id === get(parent, "[0].id"));
      let childs = s.childs || [];
      let now = [v];
      set(s, "childs", childs.concat(now));
    } else {
      result.push(v);
    }
  });
  return result;
};
