import { FC } from "react";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { editComp } from "../logic/comp";
import { PG } from "../logic/global";
const hoverAttempt: { id: string; ts: number }[] = [];

export type ElProp = ReturnType<typeof createElProp>;
export const createElProp = (
  item: IContent,
  p: PG,
  instance?: { id: string; cid: string; pid?: string }
) => {
  return {
    onPointerEnter: (e: React.PointerEvent<HTMLDivElement>) => {
      hoverAttempt.unshift({ id: item.id, ts: Date.now() });
      if (hoverAttempt.length > 6) {
        hoverAttempt.pop();
      }

      const hoverCounts: Record<string, { count: number; ts: number }> = {};
      for (const a of hoverAttempt) {
        if (!hoverCounts[a.id]) {
          hoverCounts[a.id] = { count: 1, ts: a.ts };
        } else {
          hoverCounts[a.id].count++;
        }
      }

      if (
        hoverCounts[item.id].count > 1 &&
        Date.now() - hoverCounts[item.id].ts < 1000
      ) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }

      if (p.comp?.id && !instance?.cid) {
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

      if (
        !p.treeMeta[item.id] &&
        instance?.pid &&
        p.treeMeta[instance?.pid].item
      ) {
        if (p.comp?.id !== instance.cid && instance.pid !== p.comp?.item.id) {
          editComp(p, p.treeMeta[instance?.pid].item);
        }
        if (p.item.active !== item.id) {
          p.item.active = item.id;
          console.log(item.id, instance.id, instance.pid);
          p.softRender.all();
        }
        return;
      }

      if (p.comp?.id && !instance?.cid) {
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
