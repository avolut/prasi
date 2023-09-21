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
import uniqBy from "lodash.uniqby";
import { FC } from "react";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { IContent, MContent } from "../../../../../utils/types/general";
import { IItem, MItem } from "../../../../../utils/types/item";
import { NodeMeta, PG } from "../../../logic/global";
import { fillID } from "../../../tools/fill-id";
import { newMap } from "../../../tools/yjs-tools";
import { walk } from "../body";
import { rebuildTree } from "../../../logic/tree-logic";
export const DEPTH_WIDTH = 8;

export const Placeholder: FC<{
  node: Parameters<PlaceholderRender<NodeMeta>>[0];
  params: Parameters<PlaceholderRender<NodeMeta>>[1];
}> = ({ params }) => {
  return (
    <div
      className={cx(
        "flex items-center bg-blue-50",
        css`
          height: 10px;
          z-index: 99;
          position: absolute;
          left: ${(params.depth + 1) * DEPTH_WIDTH - 3}px;
          transform: translateY(-50%);
          right: 0px;
        `
      )}
    >
      <div
        className={cx(
          "flex-1",
          css`
            background-color: #1b73e8;
            height: 2px;
          `
        )}
      ></div>
    </div>
  );
};

export const DragPreview: DragPreviewRender<NodeMeta> = (props) => {
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
  tree: NodeModel<NodeMeta>[],
  options: DropOptions<NodeMeta>,
  local: any
) => {
  const { dragSource, dropTarget, relativeIndex } = options;

  if (dragSource?.data && dropTarget) {
    let fromMeta = p.treeMeta[dragSource.id];
    let toMeta = p.treeMeta[dropTarget.id];
    if (fromMeta && toMeta) {
      let to = toMeta.comp ? toMeta.comp.mcomp : toMeta.mitem;
      let from = fromMeta.mitem;

      if (to) {
        to.doc?.transact(() => {
          if (to && from && typeof relativeIndex === "number") {
            const toChilds = to.get("childs");
            if (toChilds) {
              toChilds.insert(relativeIndex, [
                newMap(fillID(from.toJSON() as any)),
              ]);
            }

            from.parent.forEach((e, idx) => {
              if (from && e.get("id") === from.get("id")) {
                from.parent.delete(idx);
              }
            });
          }
        });
      }
    }
  }
};

export const canDrop = (p: PG, arg: DropOptions<NodeMeta>) => {
  const { dragSource, dragSourceId, dropTargetId, dropTarget } = arg;
  try {
    const parentSource: MContent | undefined = get(
      dragSource,
      "data.meta.item.parent.parent"
    ) as any;
    if (parentSource && parentSource.get && parentSource.get("id") === "root") {
      return false;
    }

    if (dropTargetId === "root") {
      const ds = get(dragSource, "data.meta.item");
      if (ds && ds.type === "section") {
        return true;
      }
      return false;
    } else if (dragSource?.data && dropTarget?.data) {
      const from = dragSource.data.meta.item.type;
      const to = dropTarget.data.meta.item.type;
      let listItem = p.item.selection;
      if (listItem.length) {
        if (typeof dragSourceId === "string") {
          if (find(p.item.selection, (e) => e === dropTargetId)) return false;
        }
      } else {
        if (typeof dragSourceId === "string") {
          const meta = p.treeMeta[dragSourceId];
          if (meta && meta.mitem) {
            let walkId = walk(meta.mitem);
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
            dropTarget.data.meta.item.type === "item" &&
            dropTarget.data.meta.item.component?.id
          ) {
            if (p.comp) {
              if (p.comp.id === dropTarget.data.meta.comp?.id) {
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
            dropTarget.data.meta.item.type === "item" &&
            dropTarget.data.meta.item.component?.id
          ) {
            if (p.comp) {
              if (p.comp.id === dropTarget.data.meta.comp?.id) {
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

export const onDragEnd = (p: PG, node: NodeModel<NodeMeta>) => {};
export const onDragStart = (p: PG, node: NodeModel<NodeMeta>) => {};

export const selectMultiple = (p: PG, node: NodeModel<NodeMeta>) => {
  console.clear();
  const comp = p.comps.doc[p.comp?.id || ""];
  let root: any = null;
  let listId = p.item.selection || [];
  if (!listId.length) {
    const meta = p.treeMeta[p.item.active];
    if (meta && meta.mitem) {
      listId = treeContent(meta.mitem);
    }
  }
  if (comp) {
    root = comp.getMap("map").get("content_tree");
  } else if (p.mpage) {
    root = p.mpage.getMap("map").get("content_tree");
  }
  const meta = p.treeMeta[node.id];
  if (meta && meta.mitem) {
    const listItemId = treeContent(meta.mitem);
    if (find(listId, (e) => e === node.id) && p.item.selection.length) {
      listId = listId.filter((e) => !find(listItemId, (x) => x === e));
    } else {
      listId = concat(listItemId, listId);
    }
  }
  listId = uniqBy(listId, (e) => e);
  p.item.active = "";
  p.item.selection = listId;
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
  root: NodeModel<NodeMeta>[],
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
