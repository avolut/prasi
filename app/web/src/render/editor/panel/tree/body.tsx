import {
  Tree as DNDTree,
  DndProvider,
  MultiBackend,
  NodeModel,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { FC, useCallback } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../logic/global";
import { ETreeItem } from "./item/item";
import { ETreeRightClick } from "./item/right-click";
import { NodeContent } from "./utils/flatten";
import {
  DragPreview,
  Placeholder,
  canDrop,
  onDragEnd,
  onDragStart,
  onDrop,
} from "./utils/tree-utils";

export const ETreeBody: FC<{ tree: NodeModel<NodeContent>[] }> = ({ tree }) => {
  const TypedTree = DNDTree<NodeContent>;
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    rightClick: {
      event: null as any,
      node: null as null | NodeModel<NodeContent>,
    },
  });
  p.softRender.tree = local.render;

  const onClick = useCallback(
    (node: NodeModel<NodeContent>) => {
      if (node.data) {
        p.item.active = node.data.content.id;
        p.softRender.all();
      }
    },
    [tree]
  );

  const onHover = useCallback(
    (node: NodeModel<NodeContent>) => {
      if (node.data) {
        p.item.hover = node.data.content.id;
        p.softRender.all();
      }
    },
    [tree]
  );

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
          {local.rightClick.node && (
            <ETreeRightClick
              node={local.rightClick.node}
              event={local.rightClick.event}
              onClose={() => {
                local.rightClick.event = null;
                local.rightClick.node = null;
                local.render();
              }}
            />
          )}
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
                  mode={p.mode}
                  depth={depth}
                  isOpen={isOpen}
                  onToggle={onToggle}
                  onHover={onHover}
                  onClick={onClick}
                  isActive={p.item.active === node.data?.content.id}
                  isHover={p.item.hover === node.data?.content.id}
                  onRightClick={(node, event) => {
                    local.rightClick.node = node;
                    local.rightClick.event = event;
                    local.render();
                  }}
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
