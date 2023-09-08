import { NodeModel } from "@minoru/react-dnd-treeview";
import * as Y from "yjs";
import { IContent, MContent } from "../../../../../utils/types/general";
import { IItem, MItem } from "../../../../../utils/types/item";
import { IRoot, MRoot } from "../../../../../utils/types/root";
import { PG } from "../../../logic/global";
import { syncronize } from "y-pojo";
import { createId } from "@paralleldrive/cuid2";

export type NodeContent = {
  content: IContent;
  idx: number;
};
export const flattenTree = (p: PG, content: MRoot | MItem | undefined) => {
  const result: NodeModel<NodeContent>[] = [];
  if (content && p.page) {
    const walk = (mitem: MContent, parent_id: string, idx: number) => {
      if (!mitem || !mitem.toJSON) {
        return;
      }
      const item = mitem.toJSON() as IContent;
      if (!p.treeMeta[item.id]) {
        p.treeMeta[item.id] = {
          mitem: mitem,
          item,
        };
      }
      result.push({
        id: item.id,
        parent: parent_id,
        text: item.name,
        data: { content: item, idx },
      });

      if (
        item.type === "item" &&
        item.component?.id &&
        item.component?.id !== p.comp?.id
      ) {
        const itemComp = mitem.get("component");
        let itemProp = itemComp?.get("props");
        if (!itemProp) {
          itemComp?.set("props", new Y.Map() as any);
          itemProp = itemComp?.get("props");
        }
        const master = p.comps.doc[item.component.id]?.getMap("map");
        if (!master) {
          return;
        }
        const masterComp = master.get("content_tree")?.get("component");

        if (!masterComp) {
          return;
        }

        let masterProp = masterComp?.get("props");
        if (!masterProp && masterComp) {
          masterComp.set("props", new Y.Map() as any);
          masterProp = masterComp.get("props");
        }

        if (masterProp) {
          let i = 0;
          masterProp.forEach((v, k) => {
            if (v) {
              const meta = v.get("meta");
              if (meta && meta.get("type") === "content-element" && itemProp) {
                let prop = itemProp.get(k);
                if (!prop) {
                  const map = new Y.Map();
                  syncronize(map, v.toJSON());
                  itemProp.set(k, map as any);
                  prop = itemProp.get(k);
                }

                if (prop) {
                  let content = prop.get("content");
                  if (!content) {
                    const json = {
                      id: createId(),
                      name: k,
                      type: "item",
                      dim: { w: "full", h: "full" },
                      parentInstanceId: mitem.get("id"),
                      childs: [],
                    } as IItem;
                    const map = new Y.Map();
                    syncronize(map as any, json);
                    prop.set("content", map as any);
                    content = prop.get("content");
                  }

                  if (content) {
                    walk(content, item.id, i++);
                  }
                }
              }
            }
          });
        }
      } else {
        mitem
          .get("childs")
          ?.forEach((e: MContent, idx) => walk(e, item.id, idx));
      }
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
