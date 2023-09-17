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
import { IItem } from "../../../../utils/types/item";
import { IText } from "../../../../utils/types/text";
import { EditorGlobal, NodeMeta } from "../../logic/global";
import { ETreeItem } from "./item/item";
import { ETreeRightClick } from "./item/right-click";
import {
  DragPreview,
  Placeholder,
  canDrop,
  onDragEnd,
  onDragStart,
  onDrop,
  selectMultiple,
} from "./utils/tree-utils";
export const ETreeBody: FC<{ tree: NodeModel<NodeMeta>[]; meta?: any }> = ({
  tree,
  meta,
}) => {
  // console.log({ tree });
  const TypedTree = DNDTree<NodeMeta>;
  const p = useGlobal(EditorGlobal, "EDITOR");
  // const
  const local = useLocal({
    rightClick: {
      event: null as any,
      node: null as null | NodeModel<NodeMeta>,
    },
    method: null as TreeMethods | null,
    id: [] as string[],
    key: "" as string,
  });
  p.softRender.tree = local.render;

  const onClick = useCallback(
    (node: NodeModel<NodeMeta>) => {
      p.preventTreeScroll = true;
      if (node.data) {
        console.log(node.data.meta.item.id);
        if (meta.search) {
          meta.search = "";
          meta.render();
          p.item.selection = [];
          p.item.active = node.data.meta.item.id;
          localStorage.setItem("prasi-item-active-id", p.item.active);

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
            p.item.active = node.data.meta.item.id;
            localStorage.setItem("prasi-item-active-id", p.item.active);

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
    (node: NodeModel<NodeMeta>) => {
      if (node.data) {
        p.item.hover = node.data.meta.item.id;
        p.softRender.all();
      }
    },
    [tree]
  );

  useEffect(() => {
    setTimeout(() => {
      let meta = p.treeMeta[p.item.active];
      if (!meta) {
        const root = p.treeFlat.filter((e) => e.parent === "root");
        if (root.length === 1) {
          const item = root[0].data.meta.item as any;
          if (item) {
            const open = [
              item.data.meta.item.id,
              ...item.childs.map((e: any) => e.id),
            ];
            local.method?.open(open);
          }
        }
      }

      if (meta && meta.mitem) {
        let mitem = meta.mitem;
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
          if (!item) {
            local.method?.open([mitem.get("id") || ""]);
          } else {
            walkParent(item);
            if (open.size === 0 && p.treeFlat.length === 1) {
              open.add(mitem.get("id") || "");
            }
            local.method?.open([...open]);
          }
        }
      }
    }, 100);
  }, [p.item.active]);

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
                  onToggle={() => {
                    onToggle();
                  }}
                  onHover={onHover}
                  onClick={onClick}
                  editCompId={p.comp?.id}
                  isActive={p.item.active === node.data?.meta.item.id}
                  isHover={p.item.hover === node.data?.meta.item.id}
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
