import { FC } from "react";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { editComp } from "../logic/comp";
import { PG } from "../logic/global";
import { rebuildTree } from "../logic/tree-logic";
const hoverAttempt: { id: string; ts: number }[] = [];

export type ElProp = ReturnType<typeof createElProp>;
export const createElProp = (item: IContent, p: PG) => {
  return {
    onPointerEnter: (e: React.PointerEvent<HTMLDivElement>) => {
      if (p.item.sideHover) {
        p.item.sideHover = false;
        p.softRender.all();
      }

      if (p.item.hover !== item.id) {
        e.stopPropagation();
        e.preventDefault();
        p.item.hover = item.id;
        p.softRender.all();
      }
    },

    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (item.type !== "text") {
        e.preventDefault();
        (document.activeElement as any)?.blur();
      }

      let _item = item;
      if (p.comp) {
        const meta = p.treeMeta[_item.id];

        if (meta.mitem) {
          let cur = meta.mitem;

          let found = false;
          let last_idx = p.comp.last.length - 1;

          const doc = p.comps.doc[p.comp.id];
          if (doc) {
            const compid = doc.getMap("map").get("content_tree")?.get("id");

            while (cur) {
              const curid = cur.get("id");
              if (p.comp.instance_id === curid || curid === compid) {
                found = true;
                break;
              }

              const idx = p.comp.last.findIndex((e) => e.instance_id === curid);
              if (idx >= 0) {
                last_idx = idx;
                found = true;
                break;
              }

              if (cur.parent && cur.parent.parent) {
                cur = cur.parent.parent as any;
              } else {
                cur = cur.parent as any;
              }
            }

            if (!found) {
              p.comp = null;
              localStorage.removeItem(`prasi-comp-active-id`);
              localStorage.removeItem(`prasi-comp-instance-id`);
              localStorage.removeItem(`prasi-comp-active-last`);
              localStorage.removeItem(`prasi-comp-active-props`);
              rebuildTree(p);
            } else if (last_idx !== p.comp.last.length - 1) {
              const last = p.comp.last[last_idx];
              p.comp.last.splice(0, last_idx - 1);
              if (last) {
                p.comp.id = last.comp_id || "";
                p.comp.instance_id = last.instance_id || "";
                p.comp.props = last.props || {};
                p.item.active = last.active_id;

                localStorage.setItem("prasi-item-active-id", p.item.active);
              localStorage.setItem("prasi-comp-instance-id", item.id);
                localStorage.setItem("prasi-comp-active-id", p.comp.id);
                localStorage.setItem(
                  "prasi-comp-active-last",
                  JSON.stringify(p.comp.last)
                );
                localStorage.setItem(
                  "prasi-comp-active-props",
                  JSON.stringify(p.comp.props)
                );
              }
            }
          }
        }

        if (p.comp && meta.comp && meta.comp.id === p.comp.id) {
          _item = meta.comp.item;
        }
      }

      if (p.item.active !== _item.id) {
        p.item.active = _item.id;
        p.softRender.all();
        localStorage.setItem("prasi-item-active-id", p.item.active);
      }
    },
  };
};

export const ComponentOver: FC<{
  item: IItem;
  p: PG;
  elprop: ElProp;
}> = ({ item, p, elprop }) => {
  if (p.compDirectEdit) {
    return <></>;
  }
  return (
    <div
      className={cx(
        "absolute inset-0 flex items-center justify-center transition-all",
        "bg-white bg-opacity-90 opacity-0 transition-all",
        !p.item.sideHover &&
          p.item.hover === item.id &&
          "border-2 border-blue-100",
        !p.item.sideHover && p.item.active === item.id
          ? cx(
              "border-2 border-blue-500",
              css`
                opacity: 1;
              `
            )
          : css`
              &:hover {
                opacity: 1;
              }
            `
      )}
      {...elprop}
      onPointerDown={async (e) => {
        elprop.onPointerDown(e);
      }}
    >
      <div
        className={cx(
          "flex items-center border border-slate-500 bg-white text-black rounded-sm text-[13px] px-[2px] min-h-[20px] text-center leading-3 absolute cursor-pointer z-10",
          css`
            font-family: "Source Sans 3", system-ui, -apple-system,
              BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
              Open Sans, Helvetica Neue, sans-serif;
          `
        )}
        onPointerDown={async (e) => {
          e.stopPropagation();
          editComp(p, item);
        }}
      >
        Edit
      </div>
    </div>
  );
};
