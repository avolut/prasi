import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { FC, useEffect } from "react";
import { NodeContent } from "../utils/flatten";
import { ETreeItemIndent } from "./indent";
import { ETreeItemName } from "./name";
import { treeItemStyle } from "./style";
import { IItem } from "../../../../../utils/types/item";
import { useGlobal, useLocal } from "web-utils";
import { ETreeItemAction } from "./action";
import { EditorGlobal } from "../../../logic/global";
import find from "lodash.find";

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
  let isSelect = find(p.item.multiple, (e) => e === item.id) ? true : false;

  if (isComponent) {
    const props = (item as IItem).component?.props;
    if (props) {
      hasChilds =
        Object.values(props).filter((e) => e.meta?.type === "content-element")
          .length > 0;
    }
  }

  useEffect(() => {
    if (isActive && local.el) {
      local.el.scrollIntoView();
    }
  }, [isActive]);

  return (
    <div
      className={treeItemStyle({ isActive, isHover, isComponent, isSelect })}
      onClick={() => onClick(node)}
      onPointerOver={() => onHover(node)}
      onContextMenu={(e) => {
        if (!isRootComponent) {
          onRightClick(node, e);
        }
      }}
      ref={(e) => {
        local.el = e;
      }}
      {...dragOverProps}
    >
      <ETreeItemIndent
        depth={depth}
        onToggle={() => {
          if (hasChilds) onToggle();
          else onClick(node);
        }}
        type={type}
        isOpen={isOpen}
        hasChilds={hasChilds}
        isActive={isActive}
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
            mode={mode}
            item={item}
            rename={() => {
              local.renaming = true;
              local.render();
            }}
          />
        ) : (
          <RootComponentClose />
        ))}
    </div>
  );
};

const RootComponentClose = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  return (
    <div
      className="flex items-center border border-slate-500 bg-white rounded-sm text-[10px] px-[5px] m-1 opacity-50 hover:opacity-100"
      onClick={(e) => {
        e.stopPropagation();
        p.item.active = p.compEdits[p.compEdits.length - 1].id;
        p.comp = null;
        p.compEdits = [];
        p.render();
      }}
    >
      Close
    </div>
  );
};
