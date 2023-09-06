import { NodeModel } from "@minoru/react-dnd-treeview";
import { useCallback, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { MItem } from "../../../../utils/types/item";
import { Loading } from "../../../../utils/ui/loading";
import { Tooltip } from "../../../../utils/ui/tooltip";
import { EditorGlobal } from "../../logic/global";
import { ETreeBody } from "./body";
import { NodeContent, flattenTree } from "./utils/flatten";
import { fuzzyMatch } from "./utils/search";

export const ETree = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    ready: true,
    timeout: null as any,
    search: "",
    hovering: false,
    multi: false,
  });
  let tree: NodeModel<NodeContent>[] = [];
  const comp = p.comps.doc[p.comp?.id || ""];
  // useEffect(() => {
  //   const keyDown = async (evt: KeyboardEvent) => {
  //     if (evt.shiftKey || evt.metaKey) {
  //       local.multi = true;
  //       if (local.hovering) {
  //         p.item.selectMode = "multi";
  //         p.render();
  //       } else {
  //         local.render();
  //       }
  //       return;
  //     }
  //   };

  //   const keyUp = async (evt: KeyboardEvent) => {
  //     local.multi = false;
  //     p.item.selectMode = "single";
  //     p.render();
  //     return;
  //   };
  //   window.addEventListener("keydown", keyDown, true);
  //   window.addEventListener("keyup", keyUp, true);
  //   return () => {
  //     window.removeEventListener("keydown", keyDown, true);
  //     window.removeEventListener("keyup", keyUp, true);
  //   };
  // }, []);
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
    tree = tree.filter((e) => fuzzyMatch(local.search, e.text));
    tree.map((item) => {
      item.parent = "root";
    });
  }

  return (
    <div
      className={cx("tree flex flex-col")}
      onMouseEnter={() => {
        local.hovering = true;
        if (local.multi) {
          p.item.selectMode = "multi";
          p.render();
        } else {
          local.render();
        }
      }}
      onMouseLeave={() => {
        local.hovering = false;
        local.render();
      }}
    >
      <div className="border-b flex items-stretch h-[24px]">
        <input
          name="search"
          type="search"
          autoComplete="off"
          className={cx("flex-1 outline-none px-2 text-[13px] ")}
          placeholder="Search..."
          value={local.search}
          onInput={(e) => {
            local.search = e.currentTarget.value;
            local.render();
          }}
        />
        <Tooltip
          content="Multi Select"
          placement="right"
          className={cx(
            "border-l p-1 flex items-center justify-center cursor-pointer",
            p.item.selectMode === "multi" ? "bg-blue-600" : "hover:bg-blue-100"
          )}
          onClick={(e) => {
            p.item.selectMode =
              p.item.selectMode === "single" ? "multi" : "single";
            p.render();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 16 16"
            className={cx(
              p.item.selectMode === "multi" ? "text-white" : "opacity-40"
            )}
          >
            <path
              fill="currentColor"
              d="M8.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L2.324 8.384a.75.75 0 111.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 01.02-.022zm-.92 5.14l.92.92a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 10-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"
            ></path>
          </svg>
        </Tooltip>
      </div>
      {local.ready ? (
        <div
          className={cx(
            "relative flex-1 overflow-auto flex flex-col items-stretch bg-slate-100"
          )}
        >
          <ETreeBody tree={tree} meta={local} />
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
