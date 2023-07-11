import { NodeModel } from "@minoru/react-dnd-treeview";
import { MContent } from "../../types/general";
import { component } from "../component";
import { IItem } from "../../types/item";
import * as Y from "yjs";
import { createId } from "@paralleldrive/cuid2";
import { syncronize } from "y-pojo";
export type NodeContent = {
  content: MContent;
  idx: number;
};

export const flattenTree = (
  item: MContent,
  rootComponent?: MContent,
  result?: NodeModel<NodeContent>[],
  parent?: MContent,
  idx?: number
) => {
  const _result: NodeModel<NodeContent>[] = [];
  const res = result || _result;

  const id: string = item.get("id") as any;
  if (!item) return res;

  const n = {
    id: id || "root",
    parent: parent ? (parent.get("id") as string) : "root",
    text: item.get("name") || "",
    data: {
      content: item,
      idx: idx || 0,
    },
  };
  if (n.id) {
    res.push(n);
  }

  let _root = rootComponent || item;
  let isComponent = false;
  const compId = item.get("component") && item.get("component")?.get("id");
  if (compId && rootComponent && rootComponent.get("id") !== compId) {
    isComponent = true;
  }
  if (isComponent && compId) {
    const props = component.docs[compId]
      ?.getMap("map")
      .get("content_tree")
      ?.get("component")
      ?.get("props");
    if (props) {
      const itemComp = item.get("component");
      let itemProp = itemComp?.get("props");
      if (!itemProp) {
        itemComp?.set("props", new Y.Map() as any);
        itemProp = itemComp?.get("props");
      }

      props.forEach((v, k) => {
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
              if (content) {
                flattenTree(content, _root, res, item);
              }
            }
          }
        }
      });
    }
  }

  if (!isComponent) {
    const childs = item.get("childs");
    if (childs) {
      childs.forEach((child: MContent, idx) => {
        flattenTree(child, _root, res, item, idx);
      });
    }
  }

  return res;
};
