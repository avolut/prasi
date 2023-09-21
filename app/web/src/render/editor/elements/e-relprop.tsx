import { FC } from "react";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { closeEditComp, editComp } from "../logic/comp";
import { PG } from "../logic/global";

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

    onPointerDown: async (e: React.PointerEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const render = () => {
        if (item.type !== "text") {
          p.softRender.all();
        }
      };
      if (item.type !== "text") {
        e.preventDefault();
        (document.activeElement as any)?.blur();
      }

      let _item = item;

      let meta = p.treeMeta[_item.id];
      if (!meta && _item.originalId) {
        meta = p.treeMeta[_item.originalId];
      }

      const regularSelectActive = () => {
        p.item.active = _item.id;
        if (_item.originalId) {
          p.item.activeOriginalId = _item.originalId;
        }

        render();
        localStorage.setItem("prasi-item-active-oid", p.item.activeOriginalId);
        localStorage.setItem("prasi-item-active-id", p.item.active);
      };

      if (p.comp?.instance_id === _item.id) {
        regularSelectActive();
        return;
      }

      if (meta) {
        if (meta.parent_comp) {
          const comp_id = meta.parent_comp.comp.id;

          if (comp_id === p.comp?.id) {
            regularSelectActive();
          } else {
            let cur = meta.parent_comp;

            while (cur) {
              if (cur.parent_comp?.comp.id === p.comp?.id) {
                break;
              }
              cur = cur.parent_comp as any;
            }
            if (cur) {
              p.item.active = cur.item.id;
              if (cur.item.originalId) {
                p.item.activeOriginalId = cur.item.originalId;
              }

              render();
              localStorage.setItem(
                "prasi-item-active-oid",
                p.item.activeOriginalId
              );
              localStorage.setItem("prasi-item-active-id", p.item.active);
            } else {
              closeEditComp(p);
            }
          }
          return;
        }
      }

      if (item.type !== "text") {
        closeEditComp(p);
      }
      regularSelectActive();
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
          editComp(p, item.id);
        }}
      >
        Edit
      </div>
    </div>
  );
};
