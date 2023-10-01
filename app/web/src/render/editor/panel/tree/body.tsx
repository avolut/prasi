import {
  Tree as DNDTree,
  DndProvider,
  MultiBackend,
  NodeModel,
  TreeMethods,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { FC, useCallback, useEffect } from "react";
import { useGlobal, useLocal, waitUntil } from "web-utils";
import { MContent } from "../../../../utils/types/general";
import { EditorGlobal, NodeMeta } from "../../logic/global";
import { rebuildTree } from "../../logic/tree-logic";
import { Adv } from "./item/action";
import { ETreeItem } from "./item/item";
import { ETreeItemName } from "./item/name";
import { ETreeRightClick } from "./item/right-click";
import { treeItemStyle } from "./item/style";
import {
  DEPTH_WIDTH,
  DragPreview,
  Placeholder,
  canDrop,
  onDragEnd,
  onDragStart,
  onDrop,
} from "./utils/tree-utils";
import { mergeScopeUpwards } from "../../logic/tree-scope";
export const ETreeBody: FC<{ tree: NodeModel<NodeMeta>[]; meta?: any }> = ({
  tree,
  meta,
}) => {
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
        const nmeta = node.data.meta;

        if (meta.search) {
          meta.search = "";
          meta.render();
          p.item.selection = [];

          if (nmeta.parent_comp) {
            const originalId = nmeta.item.originalId;
            p.comp = {
              id: nmeta.parent_comp.comp.id,
              instance_id: nmeta.parent_comp.item.id,
              last: [{ active_id: "", active_oid: "" }],
              props: nmeta.parent_comp.item.component?.props || {},
            };

            localStorage.setItem(
              "prasi-item-active-oid",
              p.item.activeOriginalId
            );
            localStorage.setItem(
              "prasi-comp-instance-id",
              nmeta.parent_comp.item.id
            );
            localStorage.setItem("prasi-comp-active-id", p.comp.id);
            localStorage.setItem(
              "prasi-comp-active-last",
              JSON.stringify(p.comp.last)
            );
            localStorage.setItem(
              "prasi-comp-active-props",
              JSON.stringify(p.comp.props)
            );

            p.item.active = nmeta.item.id;

            rebuildTree(p, { mode: "update", note: "search" });
          } else {
            p.comp = null;

            p.item.active = nmeta.item.id;
            if (nmeta.item.originalId)
              p.item.activeOriginalId = nmeta.item.originalId;
            rebuildTree(p, { mode: "update", note: "search" });

            localStorage.removeItem(`prasi-comp-active-id`);
            localStorage.removeItem(`prasi-comp-instance-id`);
            localStorage.removeItem(`prasi-comp-active-last`);
            localStorage.removeItem(`prasi-comp-active-props`);
          }

          localStorage.setItem("prasi-item-active-id", p.item.active);
          localStorage.setItem(
            "prasi-item-active-oid",
            p.item.activeOriginalId
          );

          if (nmeta.item.type === "text") {
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
          p.item.selection = [];

          p.item.active = nmeta.item.id;
          p.item.activeOriginalId = nmeta.item.id;
          if (nmeta.item.originalId) {
            p.item.activeOriginalId = nmeta.item.originalId;
          }
          localStorage.setItem(
            "prasi-item-active-oid",
            p.item.activeOriginalId
          );
          localStorage.setItem("prasi-item-active-id", p.item.active);

          if (nmeta.item.type === "text") {
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
    (async () => {
      if (p.pendingRebuild) {
        await waitUntil(() => !p.pendingRebuild);
      }
      const open = new Set<string>();

      const map: Record<string, string> = {};
      let found = "";
      let foundOID = "";
      for (const flat of p.treeFlat) {
        if (!map[flat.id]) map[flat.id] = flat.parent;
        const cur = flat.data.meta.item;

        if (
          p.item.activeOriginalId === cur.originalId ||
          p.item.active === cur.id
        ) {
          if (cur.originalId) {
            foundOID = cur.originalId;
          }
          found = flat.id;
        }
      }

      if (found) {
        let cur = map[found];
        while (cur !== "root" && cur) {
          open.add(cur);
          cur = map[cur];
        }

        if (p.item.active !== found && p.comp) {
          p.item.active = found;
          if (foundOID) {
            p.item.activeOriginalId = foundOID;
          }
          p.render();
        }
      }

      if (local.method) {
        const method = local.method;
        method.open([...open]);
      }
    })();
  }, [p.item.active, local.method]);

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
              if (!node) return <></>;
              const mmeta = node.data?.meta;
              if (mmeta) {
                const mitem = mmeta.mitem;
                if (
                  mitem &&
                  mitem.parent &&
                  (mitem.parent as any).get("content")
                ) {
                  const pvis = (mitem.parent as any).get("visible");

                  let visible = true;
                  if (pvis && meta) {
                    try {
                      const scopes = mergeScopeUpwards(p, mmeta);
                      const args = {
                        ...window.exports,
                        ...scopes,
                      };

                      const fn = new Function(
                        ...Object.keys(args),
                        `return ${pvis}`
                      );

                      visible = fn(...Object.values(args));
                    } catch (e) {
                      console.log(e);
                    }
                  }
                  if (!visible)
                    return (
                      <div className="flex text-[8px] h-[14px] items-center">
                        <div
                          className={cx(
                            css`
                              padding-left: ${Math.round(
                                depth < 3
                                  ? depth * DEPTH_WIDTH
                                  : 3 * DEPTH_WIDTH +
                                      ((depth - 3) * DEPTH_WIDTH) / 2
                              )}px;
                            `
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggle();
                          }}
                        ></div>
                        <div className={cx("text-purple-600", "mx-[5px]")}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={8}
                            height={8}
                            fill="none"
                            viewBox="0 0 15 15"
                          >
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M7.289.797a.5.5 0 01.422 0l6 2.8A.5.5 0 0114 4.05v6.9a.5.5 0 01-.289.453l-6 2.8a.5.5 0 01-.422 0l-6-2.8A.5.5 0 011 10.95v-6.9a.5.5 0 01.289-.453l6-2.8zM2 4.806L7 6.93v6.034l-5-2.333V4.806zm6 8.159l5-2.333V4.806L8 6.93v6.034zm-.5-6.908l4.772-2.028L7.5 1.802 2.728 4.029 7.5 6.057z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div>{mmeta.item.name}</div>
                        <div className="flex-1 text-right text-slate-500 pr-1">
                          [hidden]
                        </div>
                      </div>
                    );
                }
              }

              if (meta.search && node.data) {
                const meta = node.data.meta;
                return (
                  <div
                    className={cx(
                      treeItemStyle({
                        isActive: p.item.active === meta.item.id,
                        isHover: p.item.hover === meta.item.id,
                        isComponent: false,
                        isSelect: false,
                      }),
                      "flex-col items-stretch cursor-pointer"
                    )}
                    onClick={() => onClick(node)}
                    onPointerOver={() => onHover(node)}
                  >
                    {meta.parent_comp ? (
                      <div
                        className={cx(
                          "text-purple-500 text-xs flex space-x-1 pl-1"
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={10}
                          height={10}
                          fill="none"
                          viewBox="0 0 15 15"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M7.289.797a.5.5 0 01.422 0l6 2.8A.5.5 0 0114 4.05v6.9a.5.5 0 01-.289.453l-6 2.8a.5.5 0 01-.422 0l-6-2.8A.5.5 0 011 10.95v-6.9a.5.5 0 01.289-.453l6-2.8zM2 4.806L7 6.93v6.034l-5-2.333V4.806zm6 8.159l5-2.333V4.806L8 6.93v6.034zm-.5-6.908l4.772-2.028L7.5 1.802 2.728 4.029 7.5 6.057z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span>{meta.parent_comp?.item.name}</span>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div
                      className={cx(
                        "pl-5 flex items-center space-x-1",
                        meta.comp && "text-purple-500",
                        !meta.parent_comp ? "py-1" : ""
                      )}
                    >
                      {meta.comp && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={10}
                          height={10}
                          fill="none"
                          viewBox="0 0 15 15"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M7.289.797a.5.5 0 01.422 0l6 2.8A.5.5 0 0114 4.05v6.9a.5.5 0 01-.289.453l-6 2.8a.5.5 0 01-.422 0l-6-2.8A.5.5 0 011 10.95v-6.9a.5.5 0 01.289-.453l6-2.8zM2 4.806L7 6.93v6.034l-5-2.333V4.806zm6 8.159l5-2.333V4.806L8 6.93v6.034zm-.5-6.908l4.772-2.028L7.5 1.802 2.728 4.029 7.5 6.057z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                      <ETreeItemName
                        item={meta.item}
                        name={meta.item.name}
                        renaming={false}
                        isComponent={false}
                        doneRenaming={() => {}}
                      />
                      <div className="pr-[2px] space-x-[1px] flex">
                        <Adv
                          p={p}
                          item={meta.item}
                          node={node}
                          onClick={onClick}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
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
            // sort={(a, b) => {
            //   return (a.data?.idx || 0) - (b.data?.idx || 0);
            // }}
            onDragStart={(node) => onDragStart(p, node)}
            onDragEnd={(node) => onDragEnd(p, node)}
            canDrop={(_, args) => {
              return canDrop(p, args);
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
  if (item && item.get) {
    _result.push(item.get("id") || "");
    item.get("childs")?.forEach((e) => {
      walk(e, _result);
    });
  }
  return _result;
};
