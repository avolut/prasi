import { NodeModel } from "@minoru/react-dnd-treeview";
import { FC } from "react";
import { NodeContent } from "../flatten";

export const ETreeItem: FC<{
  node: NodeModel<NodeContent>;
  isOpen: boolean;
  depth: number;
  onToggle: () => void;
}> = () => {
  return <></>;
};
