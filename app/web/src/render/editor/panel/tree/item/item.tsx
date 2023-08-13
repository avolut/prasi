import { NodeModel } from "@minoru/react-dnd-treeview";
import { FC } from "react";
import { NodeContent } from "../utils/flatten";
import { ETreeItemIndent } from "./indent";
import { ETreeItemName } from "./name";
import { treeItemStyle } from "./style";
import { IItem } from "../../../../../utils/types/item";
import { useLocal } from "web-utils";
import { ETreeItemAction } from "./action";

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
  const local = useLocal({ renaming: false });

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

  return (
    <div
      className={treeItemStyle({ isActive, isHover, isComponent })}
      onClick={() => onClick(node)}
      onPointerOver={() => onHover(node)}
      onContextMenu={(e) => {
        if (!isRootComponent) {
          onRightClick(node, e);
        }
      }}
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

      {!local.renaming && !isRootComponent && (
        <ETreeItemAction
          isComponent={isComponent}
          mode={mode}
          item={item}
          rename={() => {
            local.renaming = true;
            local.render();
          }}
        />
      )}
    </div>
  );
};
