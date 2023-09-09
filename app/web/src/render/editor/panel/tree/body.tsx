import {
  Tree as DNDTree,
  DndProvider,
  MultiBackend,
  NodeModel,
  TreeMethods,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { FC, useCallback, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { MContent } from "../../../../utils/types/general";
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
  selectMultiple,
} from "./utils/tree-utils";
import { IItem, MItem } from "../../../../utils/types/item";
import { IText } from "../../../../utils/types/text";
export const ETreeBody: FC<{ tree: NodeModel<NodeContent>[]; meta?: any }> = ({
  tree,
  meta,
}) => {
  // console.log({ tree });
  const TypedTree = DNDTree<NodeContent>;
  const p = useGlobal(EditorGlobal, "EDITOR");
  // const
  const local = useLocal({
    rightClick: {
      event: null as any,
      node: null as null | NodeModel<NodeContent>,
    },
    method: null as TreeMethods | null,
    id: [] as string[],
    key: "" as string,
  });
  p.softRender.tree = local.render;

  const onClick = useCallback(
    (node: NodeModel<NodeContent>) => {
      p.preventTreeScroll = true;
      if (node.data) {
        if (meta.search) {
          meta.search = "";
          meta.render();
          p.item.selection = [];
          p.item.active = node.data.content.id;
          if (p.treeMeta[p.item.active].item.type === "text") {
            setTimeout(() => {
              const text = document.getElementById(
                `text-${p.item.active}`
              ) as HTMLInputElement;
              if (text && text.focus) {
                text.focus();
              }
            }, 100);
          }

          if (p.compProp.edit) {
            p.compProp.edit = false;
          }

          p.softRender.all();
        } else {
          if (p.item.selectMode === "multi") {
            selectMultiple(p, node);
            p.softRender.all();
          } else {
            p.item.selection = [];
            p.item.active = node.data.content.id;
            if (p.treeMeta[p.item.active].item.type === "text") {
              setTimeout(() => {
                const text = document.getElementById(
                  `text-${p.item.active}`
                ) as HTMLInputElement;
                if (text && text.focus) {
                  text.focus();
                }
              }, 100);
            }

            if (p.compProp.edit) {
              p.compProp.edit = false;
            }

            p.softRender.all();
          }
        }
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
  useEffect(() => {
    if (p.item.active) {
      if (p.comp) {
        const walk = (item: IItem | IText, parents: string[]) => {
          if (item.id === p.item.active) {
            const open = [...parents, item.id];
            local.method?.open(open);
            return;
          }
          if (item.type === "item") {
            for (const child of item.childs) {
              walk(child, [...parents, item.id]);
            }
          }
        };
        walk(p.comp.content_tree, []);
      } else {
        let m = p.treeMeta[p.item.active];
        if (m)
          if (m.mitem) {
            let mitem = m.mitem;
            if (mitem.parent) {
              let item = mitem.parent.parent as any;
              const open = new Set<string>();
              const walkParent = (item: any) => {
                if (!item) return;
                const id = item.get("id");
                if (id) {
                  if (id !== "root") open.add(id);
                }
                if (item.parent && item.parent.parent) {
                  walkParent(item.parent.parent);
                }
              };
              walkParent(item);
              local.method?.open([...open]);
            }
          }
      }
    }
  }, [p.item.active, local.method, p.comp?.id]);

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
              draggingSource: css`
                opacity: 0.3;
                cursor: not-allowed;
              `,
            }}
            ref={(el) => {
              local.method = el;
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
                  editCompId={p.comp?.id}
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
            canDrop={(_, args) => {
              return canDrop(p, args, local);
            }}
            onDrop={(...args) => onDrop(p, ...args, local)}
          ></TypedTree>
        </div>
      </DndProvider>
    </div>
  );
};

export const walk = (item: MContent, result?: string[]) => {
  const _result = result || [];
  _result.push(item.get("id") || "");
  item.get("childs")?.forEach((e) => {
    walk(e, _result);
  });
  return _result;
};
