import { NodeModel } from "@minoru/react-dnd-treeview";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../logic/global";
import { ETreeBody } from "./body";
import { NodeContent, flattenTree } from "./utils/flatten";
import { MItem } from "../../../../utils/types/item";
import { Loading } from "../../../../utils/ui/loading";
import { useCallback } from "react";

export const ETree = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    ready: true,
    timeout: null as any,
  });
  let tree: NodeModel<NodeContent>[] = [];
  const comp = p.comps.doc[p.comp?.id || ""];

  const treeLoading = useCallback(() => {
    clearTimeout(local.timeout);
    local.timeout = setTimeout(() => {
      local.ready = true;
      local.render();
    }, 500);
    local.ready = false;
  }, [Object.keys(p.comps.doc).length]);

  if (comp) {
    const contentTree = comp.getMap("map").get("content_tree") as MItem;
    if (contentTree) tree = flattenTree(p, contentTree, treeLoading);
  } else if (p.mpage) {
    tree = flattenTree(
      p,
      p.mpage.getMap("map").get("content_tree"),
      treeLoading
    );
  }

  return (
    <div className={cx("tree flex flex-col")}>
      {local.ready ? (
        <div
          className={cx(
            "relative flex-1 overflow-auto flex flex-col items-stretch bg-slate-100"
          )}
        >
          <ETreeBody tree={tree} />
        </div>
      ) : (
        <Loading backdrop={false} />
      )}
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
