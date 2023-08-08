import { NodeModel } from "@minoru/react-dnd-treeview";
import { IContent, MContent } from "../../../../utils/types/general";
import { PG } from "../../logic/global";
import { MItem } from "../../../../utils/types/item";
import { MRoot } from "../../../../utils/types/root";
import { createLocal } from "../../../../compo/page/scripting/local-comp";

export type NodeContent = {
  content: IContent;
  idx: number;
};
export const flattenTree = (p: PG, content: MRoot | MItem | undefined) => {
  const result: NodeModel<NodeContent>[] = [];
  if (content) {
    p.treeMeta = {};

    const walk = (mitem: MContent) => {
      const item = mitem.toJSON();
      p.treeMeta[item.id] = {
        item: mitem,
      };
      mitem.get("childs")?.forEach((e) => walk(e));
    };

    const type = (content as any).get("type");
    if (type === "root") {
      const root = content as MRoot;
      root.get("childs")?.forEach((e) => {
        walk(e);
      });
    } else {
      walk(content as MItem);
    }
  }

  return result;
};
