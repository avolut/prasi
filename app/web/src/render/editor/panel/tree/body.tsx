import {
  Tree as DNDTree,
  DndProvider,
  MultiBackend,
  NodeModel,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { FC } from "react";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../logic/global";
import {
  DragPreview,
  Placeholder,
  canDrop,
  onDragEnd,
  onDragStart,
  onDrop,
} from "./body-tool";
import { NodeContent } from "./flatten";
import { ETreeItem } from "./item/item";

export const ETreeBody: FC<{ tree: NodeModel<NodeContent>[] }> = ({ tree }) => {
  const TypedTree = DNDTree<NodeContent>;
  const p = useGlobal(EditorGlobal, "EDITOR");

  return (
    <div
      className={cx(
        "absolute inset-0 flex flex-1 flex-col items-stretch ",
        css`
          .drop-target {
            background: #e3efff;
            position: relative;

            &::after {
              position: absolute;
              right: 0px;
              bottom: 0px;
              top: 0px;
              width: 4px;
              content: " ";
              background: #1b73e8;
              opacity: 0.8;
            }
          }
        `
      )}
    >
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className="flex flex-col items-stretch bg-white right-0 left-0">
          <TypedTree
            tree={tree}
            rootId={"root"}
            insertDroppableFirst={false}
            classes={{
              container: "flex flex-col",
              dropTarget: "drop-target",
              placeholder: "placeholder",
            }}
            render={(node, { depth, isOpen, onToggle }) => {
              return (
                <ETreeItem
                  node={node}
                  depth={depth}
                  isOpen={isOpen}
                  onToggle={onToggle}
                />
              );
            }}
            dragPreviewRender={DragPreview}
            dropTargetOffset={10}
            placeholderRender={(node, params) => (
              <Placeholder node={node} params={params} />
            )}
            sort={false}
            onDragStart={(node) => onDragStart(p, node)}
            onDragEnd={(node) => onDragEnd(p, node)}
            canDrop={(_, args) => canDrop(p, args)}
            onDrop={(...args) => onDrop(p, ...args)}
          ></TypedTree>
        </div>
      </DndProvider>
    </div>
  );
};
