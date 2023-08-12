import { IContent } from "../../../utils/types/general";
import { PG } from "../logic/global";

export type ElProp = ReturnType<typeof createElProp>;
export const createElProp = (item: IContent, p: PG) => {
  return {
    onPointerEnter: (e: React.PointerEvent<HTMLDivElement>) => {
      if (p.item.hover !== item.id) {
        e.stopPropagation();
        e.preventDefault();
        p.item.hover = item.id;
        p.softRender.all();
      }
    },

    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
      if (p.item.active !== item.id) {
        e.stopPropagation();
        e.preventDefault();
        p.item.active = item.id;
        p.softRender.all();
      }
    },
  };
};
