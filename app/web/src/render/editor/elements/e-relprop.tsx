import { FC } from "react";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { editComp } from "../logic/comp";
import { PG } from "../logic/global";

export type ElProp = ReturnType<typeof createElProp>;
export const createElProp = (
  item: IContent,
  p: PG,
  editComponentId?: string
) => {
  return {
    onPointerEnter: (e: React.PointerEvent<HTMLDivElement>) => {
      if (p.comp?.id && !editComponentId) {
        p.item.hover = item.id;
        p.softRender.all();
        return;
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

      if (p.comp?.id && !editComponentId) {
        p.comp = null;
        p.compEdits = [];
        p.item.active = item.id;
        p.render();
        return;
      }

      if (p.item.active !== item.id) {
        p.item.active = item.id;
        p.softRender.all();
      }
    },
  };
};

export const ComponentOver: FC<{ item: IItem; p: PG; elprop: ElProp }> = ({
  item,
  p,
  elprop,
}) => {
  return (
    <div
      className={cx(
        "absolute inset-0 flex items-center justify-center transition-all",
        "bg-white bg-opacity-90 opacity-0",
        p.item.hover === item.id && "border-2 border-blue-100",
        p.item.active === item.id
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
