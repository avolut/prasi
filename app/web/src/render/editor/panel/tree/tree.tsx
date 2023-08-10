import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../logic/global";
import { ETreeBody } from "./body";
import { NodeContent, flattenTree } from "./utils/flatten";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { Loading } from "../../../../utils/ui/loading";

export const ETree = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  let tree: NodeModel<NodeContent>[] = [];
  const comp = p.comps.doc[p.comp?.id || ""];
  if (comp) {
    tree = flattenTree(p, comp.getMap("map").get("content_tree"));
  } else if (p.mpage) {
    tree = flattenTree(p, p.mpage.getMap("map").get("content_tree"));
  }
  return (
    <div
      className={cx(
        "tree",
        "relative overflow-auto flex flex-col items-stretch bg-slate-100"
      )}
    >
      <ETreeBody tree={tree} />
    </div>
  );
};
