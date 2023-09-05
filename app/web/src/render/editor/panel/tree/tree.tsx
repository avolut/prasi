import { NodeModel } from "@minoru/react-dnd-treeview";
import { useCallback } from "react";
import { useGlobal, useLocal } from "web-utils";
import { MItem } from "../../../../utils/types/item";
import { Loading } from "../../../../utils/ui/loading";
import { EditorGlobal } from "../../logic/global";
import { ETreeBody } from "./body";
import { NodeContent, flattenTree } from "./utils/flatten";
import { Tooltip } from "../../../../utils/ui/tooltip";

export const ETree = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    ready: true,
    timeout: null as any,
    search: "",
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

  if (!local.search) {
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
  } else {
  }

  return (
    <div
      className={cx("tree flex flex-col")}
      onMouseLeave={() => {
        p.item.multiple = [];
        p.render();
      }}
    >
      <div className="border-b flex items-stretch h-[25px]">
        <input
          type="search"
          className={cx("flex-1 outline-none px-1 text-sm ")}
          placeholder="Search"
          value={local.search}
          onInput={(e) => {
            local.search = e.currentTarget.value;
            local.render();
          }}
        />
        <Tooltip
          content="Multi Select"
          placement="right"
          className="border-l p-1 flex items-center justify-center"
        >
          <input
            type="checkbox"
            checked={p.item.selectMode === "multi"}
            onClick={(e) => {
              p.item.selectMode = e.currentTarget.checked ? "multi" : "single";
              p.render();
            }}
          />
        </Tooltip>
      </div>
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
