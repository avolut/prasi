import { NodeModel } from "@minoru/react-dnd-treeview";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../logic/global";
import { ETreeBody } from "./body";
import { NodeContent, flattenTree } from "./utils/flatten";
import { MItem } from "../../../../utils/types/item";

export const ETree = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  let tree: NodeModel<NodeContent>[] = [];
  const comp = p.comps.doc[p.comp?.id || ""];
  if (comp) {
    const contentTree = comp.getMap("map").get("content_tree") as MItem;
    if (contentTree) tree = flattenTree(p, contentTree);
  } else if (p.mpage) {
    tree = flattenTree(p, p.mpage.getMap("map").get("content_tree"));
  }
  return (
    <div className={cx("tree flex flex-col")}>
      {comp && (
        <div
          className="border-b bg-white hover:bg-green-50"
          onClick={() => {
            const lastItemId = p.compEdits.pop();
            if (lastItemId) {
              p.item.active = lastItemId;
            }
            p.comp = null;
            p.compEdits = [];
            p.render();
          }}
        >
          <div className="flex items-center cursor-pointer p-1">
            <ChevronLeft />
            <div className="text-xs flex items-center">Back</div>
          </div>
        </div>
      )}
      <div
        className={cx(
          "relative flex-1 overflow-auto flex flex-col items-stretch bg-slate-100"
        )}
      >
        <ETreeBody tree={tree} />
      </div>
    </div>
  );
};

export const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14 18l-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6L14 18z"
    ></path>
  </svg>
);
