import { NodeModel } from "@minoru/react-dnd-treeview";
import { FC } from "react";
import { NodeContent } from "../utils/flatten";
import { ETreeItemIndent } from "./indent";
import { ETreeItemName } from "./name";
import { treeItemStyle } from "./style";

export const ETreeItem: FC<{
  node: NodeModel<NodeContent>;
  isOpen: boolean;
  depth: number;
  onToggle: () => void;
  onClick: (node: NodeModel<NodeContent>) => void;
  onHover: (node: NodeModel<NodeContent>) => void;
  isActive: boolean;
  isHover: boolean;
  isComponent: boolean;
}> = ({
  node,
  depth,
  onToggle,
  isOpen,
  onHover,
  onClick,
  isActive,
  isHover,
  isComponent,
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

  return (
    <div
      className={treeItemStyle({ isActive, isHover, isComponent })}
      onClick={() => onClick(node)}
      onPointerOver={() => onHover(node)}
    >
      <ETreeItemIndent
        depth={depth}
        onToggle={onToggle}
        type={type}
        isOpen={isOpen}
        hasChilds={hasChilds}
      />
      <ETreeItemName item={item} name={itemName} />
    </div>
  );
};
