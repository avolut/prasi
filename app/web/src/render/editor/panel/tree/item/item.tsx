import { NodeModel } from "@minoru/react-dnd-treeview";
import { FC } from "react";
import { NodeContent } from "../utils/flatten";
import { ETreeItemIndent } from "./indent";
import { ETreeItemName } from "./name";
import { treeItemStyle } from "./style";
import { IItem } from "../../../../../utils/types/item";

export const ETreeItem: FC<{
  node: NodeModel<NodeContent>;
  isOpen: boolean;
  depth: number;
  onToggle: () => void;
  onClick: (node: NodeModel<NodeContent>) => void;
  onHover: (node: NodeModel<NodeContent>) => void;
  onRightClick: (
    node: NodeModel<NodeContent>,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  isActive: boolean;
  isHover: boolean;
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
}) => {
  if (!node.data) return <></>;

  const item = node.data.content;
  const type = item.type;
  let childs = item.type === "text" ? [] : item.childs;
  let hasChilds = false;
  if (childs && childs.length > 0) {
    hasChilds = true;
  }
  let itemName = item.name;
  const isComponent = !!(item as IItem).component?.id;

  return (
    <div
      className={treeItemStyle({ isActive, isHover, isComponent })}
      onClick={() => onClick(node)}
      onPointerOver={() => onHover(node)}
      onContextMenu={(e) => onRightClick(node, e)}
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
      <ETreeItemName item={item} name={itemName} />
    </div>
  );
};
