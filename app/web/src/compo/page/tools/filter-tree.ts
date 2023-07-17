import { IContent, MContent } from "../../types/general";
import set from "lodash.set";
import find from "lodash.find";
import get from "lodash.get";
import { IItem } from "../../types/item";
import { flatTree } from "./flat-tree";
import orderBy from "lodash.orderby";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { NodeContent } from "./flatten-tree";
import findIndex from "lodash.findindex";
export const filterFlatTree = (
  item: Array<MContent>,
  root: NodeModel<NodeContent>[]
) => {
  item.map((e) => {
    let obj = root.find((x) => x.id === e.get("id"));
    if (obj) {
      let parent = obj.data?.content.parent;
      let jso = obj.data?.content.toJSON();
      let childs = parent?.toJSON() || [];
      let idx = findIndex(childs, (x: any) => get(x, "id") === e.get("id"));
      if (typeof idx === "number") {
        parent?.delete(idx);
      }
    }
  });
};
