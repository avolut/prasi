import { NodeModel } from "@minoru/react-dnd-treeview";
import { IContent, MContent } from "../../../../../utils/types/general";
import { MItem } from "../../../../../utils/types/item";
import { IRoot, MRoot } from "../../../../../utils/types/root";
import { PG } from "../../../logic/global";

export type NodeContent = {
  content: IContent;
  idx: number;
};
export const flattenTree = (p: PG, content: MRoot | MItem | undefined) => {
  const result: NodeModel<NodeContent>[] = [];
  if (content && p.page) {
    p.treeMeta = {};

    const walk = (mitem: MContent, parent_id: string, idx: number) => {
      const item = mitem.toJSON() as IContent;
      if (p.treeMeta[item.id]) {
        console.log(`warning: duplicate id: ${item.id}`);
      }
      p.treeMeta[item.id] = {
        item: mitem,
      };
      result.push({
        id: item.id,
        parent: parent_id,
        text: item.name,
        data: { content: item, idx },
      });

      mitem.get("childs")?.forEach((e: MContent, idx) => walk(e, item.id, idx));
    };

    const type = (content as any).get("type");
    if (type === "root") {
      const root = content as MRoot;
      p.page.content_tree = root.toJSON() as IRoot;

      root.get("childs")?.forEach((e: MContent) => {
        walk(e, "root", 0);
      });
    } else {
      walk(content as MItem, "root", 0);
    }
  }

  return result;
};
