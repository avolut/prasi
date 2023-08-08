import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../logic/global";
import { ETreeBody } from "./body";
import { NodeContent, flattenTree } from "./flatten";
import { NodeModel } from "@minoru/react-dnd-treeview";

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
