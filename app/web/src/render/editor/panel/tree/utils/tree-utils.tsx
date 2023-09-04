import {
  DragPreviewRender,
  DropOptions,
  NodeModel,
  PlaceholderRender,
} from "@minoru/react-dnd-treeview";
import concat from "lodash.concat";
import find from "lodash.find";
import findIndex from "lodash.findindex";
import get from "lodash.get";
import set from "lodash.set";
import slice from "lodash.slice";
import uniqBy from "lodash.uniqby";
import { FC } from "react";
import { IContent, MContent } from "../../../../../utils/types/general";
import { IItem } from "../../../../../utils/types/item";
import { PG } from "../../../logic/global";
import { fillID } from "../../../tools/fill-id";
import { newMap } from "../../../tools/yjs-tools";
import { walk } from "../body";
import { NodeContent } from "./flatten";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
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
  options: DropOptions<NodeContent>,
  local: any
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
          to.mitem.doc?.transact(() => {
            const open = new Set<string>();
            p.item.multiple = [];
            let multiple: any = [];
            const listContent: any = listItem.map((e) => {
              let item = p.treeMeta[e];
              if (item) {
                if (item.mitem.get("type") === "section") {
                  const json = item.mitem.toJSON();
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
                return item.mitem.toJSON();
              }
            });
            listItem.map((e) => {
              let mitem = p.treeMeta[e];
              if (mitem) {
                const jso = mitem.mitem;
                jso.parent.forEach((e, idx) => {
                  if (e === jso) {
                    jso.parent.delete(idx);
                  }
                });
              }
            });
            let res = flatTree(listContent);
            let listMap = res.map((e: IContent) => fillID(e));
            listMap.map((e: IContent) => {
              const map = new Y.Map() as MContent;
              syncronize(map as any, e);
              const titem = to.mitem;
              const childs = titem.get("childs");
              if (childs && childs.length - 1 >= (relativeIndex || 0)) {
                childs?.insert(relativeIndex || 0, [map]);
              } else {
                childs?.push([map]);
              }
              let id = walk(map);
              multiple = multiple.concat(id);
              if (typeof dropTargetId === "string") open.add(dropTargetId);
            });
            p.render();
            p.item.multiple = multiple;
            if (local.method) local.method?.open([...open]);
          });
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
      if (from && to && p.mpage && dragSource.id !== dropTarget.id && p) {
        to.mitem.doc?.transact(() => {
          const mitem = from.mitem;
          const json = mitem.toJSON() as IContent;

          const nmap = fillID(json);
          const map = new Y.Map() as MContent;
          syncronize(map as any, nmap);
          mitem.parent.forEach((e, idx) => {
            if (e === mitem) {
              mitem.parent.delete(idx);
            }
          });
          if (dropTargetId !== "root") {
            const titem = to.mitem;
            if (titem) {
              const childs = titem.get("childs");
              if (childs && childs.length - 1 >= (relativeIndex || 0)) {
                childs?.insert(relativeIndex || 0, [map]);
              } else {
                childs?.push([map]);
              }
            }
          } else {
            if (p.mpage) {
              const childs = p.mpage
                .getMap("map")
                .get("content_tree")
                ?.get("childs");
              childs?.insert(relativeIndex || 0, [map]);
            }
          }
          p.render();
          const item = map.toJSON();
          if (item) {
            p.item.active = item.id;
          }
        });
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
            let walkId = walk(mitem.mitem);
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
          if (
            dropTarget.data.content.type === "item" &&
            dropTarget.data.content.component?.id
          ) {
            if (p.comp) {
              if (p.comp.content_tree.id === dropTarget.data.content.id) {
                return true;
              }
            }
            return false;
          }
          return true;
        } else {
          return false;
        }
      } else if (from === "text") {
        if (to === "item") {
          if (
            dropTarget.data.content.type === "item" &&
            dropTarget.data.content.component?.id
          ) {
            if (p.comp) {
              if (p.comp.content_tree.id === dropTarget.data.content.id) {
                return true;
              }
            }
            return false;
          }
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
      listId = treeContent(item.mitem);
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
    const listItemId = treeContent(item.mitem);
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
        let listIdx: Array<any> = concat(listId, listItemId);
        listIdx = listIdx.map((x) => {
          return findIndex(tree, (e) => e === x);
        });
        listId = slice(tree, Math.min(...listIdx), Math.max(...listIdx) + 1);
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
      if (mitem.mitem) {
        let parent = mitem.mitem.parent;
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
