import {
  DragPreviewRender,
  DropOptions,
  NodeModel,
  PlaceholderRender,
} from "@minoru/react-dnd-treeview";
import get from "lodash.get";
import { FC } from "react";
import { MContent } from "../../../../utils/types/general";
import { PG } from "../../logic/global";
import { NodeContent } from "./flatten";

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
) => {};

export const canDrop = (p: PG, arg: DropOptions<NodeContent>) => {
  const { dragSource, dropTargetId, dropTarget } = arg;
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
