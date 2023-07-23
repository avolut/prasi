import {
  Tree as DNDTree,
  DndProvider,
  DragPreviewRender,
  MultiBackend,
  NodeModel,
  PlaceholderRender,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../../../base/global/content-editor";
import { NodeContent, flattenTree } from "../../../page/tools/flatten-tree";
import { MContent } from "../../../types/general";
import { MRoot } from "../../../types/root";
import { CETreeItem, DEPTH_WIDTH } from "./tree-item";
import { wsdoc } from "../../ws/wsdoc";
import { ErrorBoundary } from "web-init/src/web/error-boundary";
import concat from "lodash.concat";
import uniqBy from "lodash.uniqby";
import findIndex from "lodash.findindex";
import slice from "lodash.slice";
import { Loading } from "../../../ui/loading";
import get from "lodash.get";

export const CETree: FC<{ id: string }> = ({ id }) => {
  const c = useGlobal(CEGlobal, id);
  const local = useLocal({ childs: [] as string[], treeError: false });
  c.editor.tree.render = local.render;
  c.editor.tree.list = flattenTree(c.root as any);
  const TypedTree = DNDTree<NodeContent>;

  useEffect(() => {
    if (c.editor.active) {
      let item = c.editor.active.parent.parent as any;
      const open = new Set<string>();
      const walkParent = (item: any) => {
        if (!item) return;
        const id = item.get("id");
        if (id !== "root") open.add(id);
        if (item.parent && item.parent.parent) {
          walkParent(item.parent.parent);
        }
      };
      walkParent(item);
      c.editor.tree.method?.open([...open]);
    }
  }, [c.editor.active]);

  return (
    <div
      className={cx(
        "tree",
        "relative overflow-auto flex flex-col items-stretch bg-slate-100"
      )}
    >
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
        onMouseLeave={() => {
          wsdoc.keyDown = "";

          if ((c.editor.multiple.active || []).length > 0) {
            c.editor.active = (c.editor.multiple.active as any)[0];
            c.editor.multiple = {
              active: null,
              activeEl: null,
            };
            c.render();
          }
        }}
      >
        {c.editor.tree.reload ? (
          <Loading backdrop={false} />
        ) : (
          <ErrorBoundary
            onError={() => {
              local.treeError = true;
              local.render();
              setTimeout(() => {
                local.treeError = false;
                local.render();
              }, 300);
            }}
          >
            {!local.treeError && (
              <>
                <DndProvider
                  backend={MultiBackend}
                  options={getBackendOptions()}
                >
                  <div className="flex flex-col items-stretch bg-white right-0 left-0">
                    <TypedTree
                      ref={(el) => {
                        c.editor.tree.method = el;
                      }}
                      tree={c.editor.tree.list}
                      rootId={"root"}
                      insertDroppableFirst={false}
                      classes={{
                        container: "flex flex-col",
                        dropTarget: "drop-target",
                        placeholder: "placeholder",
                      }}
                      dragPreviewRender={DragPreview}
                      dropTargetOffset={10}
                      placeholderRender={(node, params) => (
                        <Placeholder node={node} params={params} />
                      )}
                      sort={false}
                      onDragStart={(node) => {
                        if (node.data?.content) {
                          local.childs = walk(node.data?.content);
                        }
                      }}
                      canDrop={(
                        _,
                        { dragSource, dropTargetId, dropTarget }
                      ) => {
                        try {
                          const parentSource: MContent | undefined = get(
                            dragSource,
                            "data.content.parent.parent"
                          ) as any;
                          if (
                            parentSource &&
                            parentSource.get &&
                            parentSource.get("id") === "root"
                          ) {
                            return false;
                          }
                          if (dropTargetId === "root") {
                            const ds = get(dragSource, "data.content");
                            if (ds && ds.get && ds.get("type") === "section") {
                              return true;
                            }
                            return false;
                          } else if (dragSource?.data && dropTarget?.data) {
                            const from = dragSource.data.content.get("type");
                            const to = dropTarget.data.content.get("type");

                            if (
                              local.childs.includes(
                                dropTarget.data.content.get("id") || ""
                              )
                            ) {
                              return false;
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
                      }}
                      onDrop={(
                        _,
                        { dropTarget, dropTargetId, dragSource, relativeIndex }
                      ) => {
                        if (
                          dragSource?.data &&
                          (dropTarget?.data || dropTargetId === "root")
                        ) {
                          const from = dragSource.data;
                          const insert = from.content.clone();
                          from.content.parent.forEach((e, idx) => {
                            if (e === from.content) {
                              from.content.parent.delete(idx);
                            }
                          });

                          if (dropTargetId !== "root") {
                            const to = dropTarget?.data;
                            if (to) {
                              const childs = to.content.get("childs");
                              if (
                                childs &&
                                childs.length - 1 >= (relativeIndex || 0)
                              ) {
                                childs?.insert(relativeIndex || 0, [insert]);
                              } else {
                                childs?.push([insert]);
                              }
                            }
                          } else {
                            const childs = (c.root as MRoot).get("childs");
                            childs?.insert(relativeIndex || 0, [insert]);
                          }
                          c.render();
                        }
                      }}
                      render={(node, { depth, isOpen, onToggle }) => {
                        if (node.id === "root") return <></>;
                        return (
                          <>
                            <CETreeItem
                              {...{
                                id,
                                node,
                                depth,
                                isOpen,
                                onToggle,
                                select: (item) => {
                                  const w = wsdoc;
                                  const doSelection = (props: {
                                    mode: "single" | "multiple";
                                    item: MContent;
                                  }) => {
                                    const { mode, item } = props;

                                    if (mode === "multiple") {
                                      c.editor.copy = "multiple";
                                      let actives =
                                        c.editor.multiple.active || [];
                                      actives = concat(actives, item);
                                      selectMultiple({ item, global: c });
                                    } else {
                                      c.editor.copy = null;
                                      let type = item.get("type");
                                      c.editor.multiple.active = [];
                                      switch (type) {
                                        case "text":
                                          setTimeout(() => {
                                            if (c.editor.activeEl?.focus) {
                                              c.editor.activeEl.focus();
                                            }
                                          }, 100);
                                          break;
                                        case "section":
                                          selectChildren({ item, global: c });
                                          break;
                                        case "item":
                                          selectChildren({ item, global: c });
                                          break;
                                        default:
                                          break;
                                      }
                                    }
                                  };
                                  switch (true) {
                                    case w.keyDown === "ctrl":
                                      doSelection({
                                        mode: "multiple",
                                        item,
                                      });
                                      break;
                                    case w.keyDown === "shift":
                                      doSelection({
                                        mode: "multiple",
                                        item,
                                      });
                                      break;
                                    default:
                                      c.editor.active = item;
                                      doSelection({
                                        mode: "single",
                                        item,
                                      });
                                      break;
                                  }
                                  c.render();
                                },
                              }}
                            />
                          </>
                        );
                      }}
                    />
                  </div>
                </DndProvider>
              </>
            )}
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
};
export const selectMultiple = (props: { item: MContent; global: any }) => {
  const { item, global } = props;
  let child = walk(item);
  let select = global.editor.multiple.active || [];
  let find = select.find((e: MContent) => e.get("id") === item.get("id"));
  let id = select.map((e: MContent) => e.get("name"));
  if (find) {
    select = select.filter(
      (e: MContent) => !child.find((x) => e.get("id") === x)
    );
    global.editor.multiple.active = select;
  } else {
    selectChildren({ item, global });
    global.editor.active = null;
  }
};
const selectChildren = (props: { item: MContent; global: any }) => {
  const w = wsdoc;
  const { item, global } = props;
  let child = walkContent(item);
  let parent = global.editor.tree.list;
  let selectBefore = global.editor.multiple.active || [];
  let activeSingle = global.editor.active || [];
  selectBefore = concat(selectBefore, activeSingle);
  switch (true) {
    case w.keyDown === "ctrl":
      child = concat(child, selectBefore);
      break;
    case w.keyDown === "shift":
      child = concat(child, selectBefore);
      let pp = parent.filter((e: NodeModel) =>
        child.find((x) => x.get("id") === e.id)
      ) as NodeModel<NodeContent>[];
      let startIdx = findIndex(parent, (e: NodeModel) => e.id === pp[0].id);
      let endIdx = findIndex(
        parent,
        (e: NodeModel) => e.id === pp[pp.length - 1].id
      );
      let pps = slice(parent, startIdx, endIdx + 1);
      child = pps.map((e: any) => e.data.content);
      break;
    default:
      break;
  }
  child = uniqBy(child, (e) => e.get("id"));
  global.editor.multiple.active = child;
};
export const walkContent = (item: MContent, result?: Array<MContent>) => {
  const _result = result || [];
  _result.push(item);
  item.get("childs")?.forEach((e) => {
    walkContent(e, _result);
  });
  return _result;
};
const walk = (item: MContent, result?: string[]) => {
  const _result = result || [];
  _result.push(item.get("id") || "");
  item.get("childs")?.forEach((e) => {
    walk(e, _result);
  });
  return _result;
};

const DragPreview: DragPreviewRender<NodeContent> = (props) => {
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

const Placeholder: FC<{
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
