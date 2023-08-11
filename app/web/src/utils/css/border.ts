import get from "lodash.get";
import { FNBorder } from "../types/meta-fn";
import { responsiveVal } from "../../compo/page/tools/responsive-val";

export const cssBorder = (
  cur: { border?: FNBorder },
  mode?: "mobile" | "desktop"
) => {
  const border = responsiveVal<FNBorder>(cur, "border", mode, {
    style: "solid",
    stroke: {},
    rounded: {
      tr: 0,
      tl: 0,
      bl: 0,
      br: 0,
    },
    color: "transparent",
  });
  return cx(
    pick(border, "stroke.t", "border-left-width"),
    pick(border, "stroke.r", "border-right-width"),
    pick(border, "stroke.b", "border-bottom-width"),
    pick(border, "stroke.t", "border-top-width"),
    pick(border, "color", "border-color", "transparent"),
    pick(border, "style", "border-style", "dashed"),
    pick(border, "rounded.tl", "border-top-left-radius"),
    pick(border, "rounded.tr", "border-top-right-radius"),
    pick(border, "rounded.bl", "border-bottom-left-radius"),
    pick(border, "rounded.br", "border-bottom-right-radius")
  );
};

const pick = (obj: any, key: string, attr: string, notpx?: string) => {
  const val = get(obj, key);
  if (notpx) {
    if (val) return `${attr}: ${val};`;
    else return `${attr}: ${notpx};`;
  } else if (val) return `${attr}: ${val}px;`;
};
