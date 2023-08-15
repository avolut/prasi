import {
  DragPreviewRender,
  DropOptions,
  NodeModel,
  PlaceholderRender,
} from "@minoru/react-dnd-treeview";
import get from "lodash.get";
import { FC } from "react";
import { IContent, MContent } from "../../../../../utils/types/general";
import { EditorGlobal, PG } from "../../../logic/global";
import { NodeContent, flattenTree } from "./flatten";
import { useGlobal } from "web-utils";
import find from "lodash.find";
import { walk } from "../body";
import { IItem, MItem } from "../../../../../utils/types/item";
import concat from "lodash.concat";
import findIndex from "lodash.findindex";
import slice from "lodash.slice";
import uniqBy from "lodash.uniqby";
import { id } from "date-fns/locale";
import set from "lodash.set";
import { newMap } from "../../../tools/yjs-tools";
import { fillID } from "../../../tools/fill-id";

export const DEPTH_WIDTH = 8;

export const Placeholder: FC<{
  node: Parameters<PlaceholderRender<NodeContent>>[0];
  params: Parameters<PlaceholderRender<NodeContent>>[1];
}> = ({ params }) => {
  return (
    <div
      className={cx(css`
        background-color: #1b73e8;
        height: 2px;
        z-index: 99;
        position: absolute;
        left: ${(params.depth + 1) * DEPTH_WIDTH - 3}px;
        transform: translateY(-50%);
        right: 0px;
      `)}
    ></div>
  );
};

export const DragPreview: DragPreviewRender<NodeContent> = (props) => {
  const item = props.item;

  return (
    <div
      className={cx(
        "bg-blue-500 text-white  px-4 py-[2px] text-sm inline-grid"
      )}
    >
      <div>{item.text}</div>
    </div>
  );
};

export const onDrop = (
  p: PG,
  tree: NodeModel<NodeContent>[],
  options: DropOptions<NodeContent>
) => {
  const { dragSource, dropTargetId, dropTarget, relativeIndex } = options;
  let listItem = p.item.multiple;
  if (listItem.length) {
    // Multiple drop targets
    if (
      dragSource?.data &&
      (dropTarget?.data || dropTargetId === "root") &&
      dropTarget
    ) {
      let from = p.treeMeta[dragSource.id];
      let to = p.treeMeta[dropTarget.id];
      if (from && to && p.mpage && dragSource.id !== dropTarget.id)
        if (!find(listItem, (e) => e === dropTargetId)) {
          const listContent: any = listItem.map((e) => {
            let item = p.treeMeta[e];
            if (item) {
              if (item.item.get("type") === "section") {
                const json = item.item.toJSON();
                const newItem = {
                  id: json.id,
                  name: json.name,
                  type: "item",
                  dim: { w: "fit", h: "fit" },
                  adv: json.adv,
                  childs: json.childs || [],
                  component: json.component,
                } as IItem;
                return newItem;
              }
              return item.item.toJSON();
            }
          });
          listItem.map((e) => {
            let mitem = p.treeMeta[e];
            if (mitem) {
              const jso = mitem.item;
              jso.parent.forEach((e, idx) => {
                if (e === jso) {
                  jso.parent.delete(idx);
                }
              });
            }
          });
          let res = flatTree(listContent);
          let listMap = res.map((e: IContent) => newMap(fillID(e)));
          listMap.map((e: MContent) => {
            const titem = to.item;
            const childs = titem.get("childs");
            if (childs && childs.length - 1 >= (relativeIndex || 0)) {
              childs?.insert(relativeIndex || 0, [e]);
            } else {
              childs?.push([e]);
            }
          });

          // console.log(listInsert);
          // if (jso.get("type") === "section") {
          //   const json = jso.toJSON();
          //   const newItem = {
          //     id: json.id,
          //     name: json.name,
          //     type: "item",
          //     dim: { w: "fit", h: "fit" },
          //     adv: json.adv,
          //     childs: json.childs || [],
          //     component: json.component,
          //   } as IItem;
          //   insert = newMap(fillID(newItem)) as MContent;
          // }
          // if (dropTargetId !== "root") {
          //   const titem = to.item;
          //   if (titem) {
          //     const childs = titem.get("childs");
          //     if (childs && childs.length - 1 >= (relativeIndex || 0)) {
          //       childs?.insert(relativeIndex || 0, [insert]);
          //     } else {
          //       childs?.push([insert]);
          //     }
          //   }
          // } else {
          //   if (p.mpage) {
          //     const childs = p.mpage
          //       .getMap("map")
          //       .get("content_tree")
          //       ?.get("childs");
          //     childs?.insert(relativeIndex || 0, [insert]);
          //   }
          // }
        }
    }
  } else {
    // Single drop targets
    if (
      dragSource?.data &&
      (dropTarget?.data || dropTargetId === "root") &&
      dropTarget
    ) {
      let from = p.treeMeta[dragSource.id];
      let to = p.treeMeta[dropTarget.id];
      if (from && to && p.mpage && dragSource.id !== dropTarget.id) {
        const mitem = from.item;
        const insert = mitem.clone();
        mitem.parent.forEach((e, idx) => {
          if (e === mitem) {
            mitem.parent.delete(idx);
          }
        });
        if (dropTargetId !== "root") {
          const titem = to.item;
          if (titem) {
            const childs = titem.get("childs");
            if (childs && childs.length - 1 >= (relativeIndex || 0)) {
              childs?.insert(relativeIndex || 0, [insert]);
            } else {
              childs?.push([insert]);
            }
          }
        } else {
          const childs = p.mpage
            .getMap("map")
            .get("content_tree")
            ?.get("childs");
          childs?.insert(relativeIndex || 0, [insert]);
        }
        p.render();
      }
    }
  }
};

export const canDrop = (p: PG, arg: DropOptions<NodeContent>, local: any) => {
  const { dragSource, dragSourceId, dropTargetId, dropTarget } = arg;
  try {
    const parentSource: MContent | undefined = get(
      dragSource,
      "data.content.parent.parent"
    ) as any;
    if (parentSource && parentSource.get && parentSource.get("id") === "root") {
      return false;
    }

    if (dropTargetId === "root") {
      const ds = get(dragSource, "data.content");
      if (ds && ds.type === "section") {
        return true;
      }
      return false;
    } else if (dragSource?.data && dropTarget?.data) {
      const from = dragSource.data.content.type;
      const to = dropTarget.data.content.type;
      let listItem = p.item.multiple;
      if (listItem.length) {
        if (typeof dragSourceId === "string") {
          if (find(p.item.multiple, (e) => e === dropTargetId)) return false;
        }
      } else {
        if (typeof dragSourceId === "string") {
          const mitem = p.treeMeta[dragSourceId];
          if (mitem) {
            let walkId = walk(mitem.item);
            if (find(walkId, (e) => e === dropTargetId)) {
              return false;
            }
          }
        }
      }

      if (from === "section" || to === "text") {
        return false;
      } else if (from === "item") {
        if (to === "section" || to === "item") {
          return true;
        } else {
          return false;
        }
      } else if (from === "text") {
        if (to === "item") {
          return true;
        }
      }

      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const onDragEnd = (p: PG, node: NodeModel<NodeContent>) => {};
export const onDragStart = (p: PG, node: NodeModel<NodeContent>) => {};

export const selectMultiple = (
  p: PG,
  node: NodeModel<NodeContent>,
  local: any
) => {
  console.clear();
  // console.log("selectMultiple");
  const comp = p.comps.doc[p.comp?.id || ""];
  const { key } = local;
  let root: any = null;
  let listId = p.item.multiple || [];
  if (!listId.length) {
    const item = p.treeMeta[p.item.active];
    if (item) {
      listId = treeContent(item.item);
    }
  }
  // console.log(listId);
  if (comp) {
    root = comp.getMap("map").get("content_tree");
  } else if (p.mpage) {
    root = p.mpage.getMap("map").get("content_tree");
  }
  let tree = walk(root);
  const item = p.treeMeta[node.id];
  if (item) {
    // let idItem = treeContent()
    const listItemId = treeContent(item.item);
    // console.log({ listItemId });
    switch (true) {
      case key === "ctrl":
        if (find(listId, (e) => e === node.id) && p.item.multiple.length) {
          listId = listId.filter((e) => !find(listItemId, (x) => x === e));
        } else {
          listId = concat(listItemId, listId);
        }
        break;
      case key === "shift":
        // console.log("shift");
        // let startIdx = findIndex(tree, (e) => e === listId[0]);
        // let endIdx = findIndex(
        //   tree,
        //   (e) => e === listItemId[listItemId.length - 1]
        // );
        let listIdx: Array<any> = concat(listId, listItemId);
        listIdx = listIdx.map((x) => {
          return findIndex(tree, (e) => e === x);
        });
        // console.log(startIdx, endIdx);
        // if (startIdx >= endIdx) {
        //   endIdx = startIdx;
        //   startIdx = findIndex(tree, (e) => e === listItemId[0]);
        // }
        // console.log(listId);
        listId = slice(tree, Math.min(...listIdx), Math.max(...listIdx) + 1);
        // console.log(listId);
        break;
      default:
        break;
    }
  }
  listId = uniqBy(listId, (e) => e);
  p.item.active = "";
  p.item.multiple = listId;
};

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
      let childs = s.childs || [];
      let now = [v];
      set(s, "childs", childs.concat(now));
    } else {
      result.push(v);
    }
  });
  return result;
};

export const filterFlatTree = (
  item: Array<string>,
  root: NodeModel<NodeContent>[],
  p: PG
) => {
  item.map((e) => {
    let obj = root.find((x) => x.id === e);
    if (obj) {
      let mitem = p.treeMeta[e];
      if (mitem.item) {
        let parent = mitem.item.parent;
        let childs = parent?.toJSON() || [];
        let idx = findIndex(childs, (x: any) => get(x, "id") === e);
        if (typeof idx === "number") {
          parent?.delete(idx);
        }
      }
    }
  });
};

const treeContent = (item: MContent) => {
  const type = item.get("type");
  let result: Array<any> = [];
  if (type === "text") {
    result.push(item.get("id"));
  } else if (type === "section" || type === "item") {
    result = walk(item);
  }
  return result;
};
