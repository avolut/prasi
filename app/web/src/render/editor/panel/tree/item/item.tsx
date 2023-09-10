import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import find from "lodash.find";
import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { IContent } from "../../../../../utils/types/general";
import { IItem } from "../../../../../utils/types/item";
import { EditorGlobal } from "../../../logic/global";
import { NodeContent } from "../utils/flatten";
import { Adv, ETreeItemAction, Rename } from "./action";
import { ETreeItemIndent } from "./indent";
import { ETreeItemName } from "./name";
import { treeItemStyle } from "./style";
import { Loading } from "../../../../../utils/ui/loading";
import { loadComponent } from "../../../logic/comp";
import { Tooltip } from "../../../../../utils/ui/tooltip";

export const ETreeItem: FC<{
  node: NodeModel<NodeContent>;
  isOpen: boolean;
  depth: number;
  mode: "mobile" | "desktop";
  onToggle: () => void;
  onClick: (node: NodeModel<NodeContent>) => void;
  onHover: (node: NodeModel<NodeContent>) => void;
  onRightClick: (
    node: NodeModel<NodeContent>,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  isActive: boolean;
  isHover: boolean;
  editCompId?: string;
}> = ({
  node,
  depth,
  onToggle,
  isOpen,
  onHover,
  onClick,
  isActive,
  isHover,
  onRightClick,
  mode,
  editCompId,
}) => {
  if (!node.data) return <></>;
  const local = useLocal({ renaming: false, el: null as any });
  const dragOverProps = useDragOver(node.id, isOpen, onToggle);

  const item = node.data.content;
  const type = item.type;
  let childs = item.type === "text" ? [] : item.childs;
  let hasChilds = false;
  if (childs && childs.length > 0) {
    hasChilds = true;
  }
  let itemName = item.name;
  let isComponent = !!(item as IItem).component?.id;
  let isRootComponent = false;
  if (isComponent && (item as IItem).component?.id === editCompId) {
    isRootComponent = true;
    isComponent = false;
  }
  const p = useGlobal(EditorGlobal, "EDITOR");
  useEffect(() => {
    if (isActive && local.el && !p.preventTreeScroll) {
      local.el.scrollIntoView();
    }
    if (p.preventTreeScroll) {
      p.preventTreeScroll = false;
    }
  }, [isActive]);

  let isSelect = find(p.item.selection, (e) => e === item.id) ? true : false;

  let loading = !!p.compLoading[item.id];
  if (isComponent) {
    const id = (item as IItem).component?.id;
    if (id) {
      const comp = p.comps.doc[id];
      if (!comp) {
        p.compLoading[item.id] = true;
        loading = !!p.compLoading[item.id];
        loadComponent(p, id).then(() => {
          delete p.compLoading[item.id];
          local.render();
        });
      } else {
        const props = comp
          .getMap("map")
          .get("content_tree")
          ?.get("component")
          ?.get("props")
          ?.toJSON();
        if (props) {
          if (
            Object.values(props).filter(
              (e) => e.meta?.type === "content-element"
            ).length > 0
          ) {
            hasChilds = true;
          }
        }
      }
    }
  }
  let isPropContent = false;
  const mitem = p.treeMeta[item.id].mitem;
  if (mitem && (mitem.parent as any).get("content")) {
    isPropContent = true;
  }


  return (
    <div
      className={treeItemStyle({
        isActive: isActive || p.item.selection.includes(item.id),
        isHover,
        isComponent,
        isSelect,
      })}
      onClick={() => onClick(node)}
      onPointerOver={() => onHover(node)}
      onContextMenu={(e) => {
        onRightClick(node, e);
      }}
      ref={(e) => {
        local.el = e;
      }}
      {...dragOverProps}
    >
      {loading ? (
        <Loading backdrop={false} />
      ) : (
        <>
          <ETreeItemIndent
            depth={depth}
            onToggle={() => {
              if (hasChilds) onToggle();
              else onClick(node);
            }}
            type={type}
            mitem={mitem}
            isOpen={isOpen}
            hasChilds={hasChilds}
            isActive={isActive || p.item.selection.includes(item.id)}
            isComponent={isComponent}
          />
          <ETreeItemName
            item={item}
            name={itemName}
            renaming={local.renaming}
            isComponent={isComponent}
            doneRenaming={() => {
              local.renaming = false;
              local.render();
            }}
          />

          {!local.renaming &&
            (!isRootComponent ? (
              <ETreeItemAction
                isComponent={isComponent}
                isPropContent={isPropContent}
                mode={mode}
                item={item}
                rename={() => {
                  local.renaming = true;
                  local.render();
                }}
              />
            ) : (
              <div className="flex items-center">
                <Adv p={p} item={item} />
                <Tooltip
                  content="Rename"
                  className="flex items-center p-1 h-full text-blue-700"
                  onClick={() => {
                    local.renaming = true;
                    local.render();
                  }}
                >
                  <Rename />
                </Tooltip>
                <RootComponentClose item={item} />
              </div>
            ))}
        </>
      )}
    </div>
  );
};

const RootComponentClose = ({ item }: { item: IContent }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  return (
    <>
      {p.compEdits.length > 1 && (
        <div
          className="flex items-center border border-slate-500 bg-white rounded-sm text-[10px] space-x-1 px-[5px] m-1 mr-0 opacity-50 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();

            let comp = p.compEdits.pop();

            if (comp && p.comp) {
              if (comp.component?.id === p.comp.id) {
                comp = p.compEdits[p.compEdits.length - 1];
              }

              if (comp) {
                p.comp = {
                  id: comp.component?.id || "",
                  content_tree: comp,
                  item: item as IItem,
                };
                p.item.active = comp.id;
                p.render();
              }
            }
          }}
        >
          <span>Back</span>
        </div>
      )}
      <div
        className="flex items-center border border-slate-500 bg-white rounded-sm text-[10px] px-[5px] m-1 opacity-50 hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          p.item.active = p.compEdits[0].id;
          p.comp = null;
          p.compEdits = [];
          p.render();
        }}
      >
        Close
      </div>
    </>
  );
};
