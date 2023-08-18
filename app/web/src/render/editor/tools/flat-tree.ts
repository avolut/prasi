import find from "lodash.find";
import get from "lodash.get";
import set from "lodash.set";
import { IContent } from "../../../utils/types/general";

export const flatTree = (item: Array<IContent>) => {
  const children = item as Array<IContent>;
  let ls = structuredClone(item);
  let sitem: any = ls.map((v: IContent) => {
    if (v.type !== "text") {
      v.childs = [];
    }
    return { ...v };
  });
  let result = [] as any;
  sitem.forEach((v: IContent) => {
    let parent = children.filter((x: IContent) =>
      find(get(x, "childs"), (x: IContent) => x.id === v.id)
    );
    if (get(parent, "length")) {
      let s = sitem.find((e: any) => e.id === get(parent, "[0].id"));
      let childs: any = s.childs || [];
      childs = childs.filter((e: any) => get(e, "id")) || [];
      let now = [v];
      set(s, "childs", childs.concat(now));
    } else {
      result.push(v);
    }
  });
  return result;
};
