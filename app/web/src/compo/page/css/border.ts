import get from "lodash.get";
import { FNBorder, FNPadding } from "../../types/meta-fn";
import { responsiveVal } from "../tools/responsive-val";

export const cssBorder = (
  cur: { border?: FNBorder },
  mode?: "mobile" | "desktop"
) => {
  const border = responsiveVal<FNBorder>(cur, "border", mode, {
    style: "solid",
    stroke: 0,
    rounded: {
      tr: 0,
      tl: 0,
      bl: 0,
      br: 0,
    },
    color: "transparent",
  });
  return cx(
    css`
      border-width: ${border.stroke ? border.stroke : 0}px;
    `,
    css`
      border-color: ${border.color ? border.color : "transparent"};
    `,
    css`
      border-style: ${border.style ? border.style : "dashed"};
    `,
    css`
      border-top-left-radius: ${get(border, "rounded.tl")
        ? get(border, "rounded.tl")
        : 0}px;
    `,
    css`
      border-top-right-radius: ${get(border, "rounded.tr")
        ? get(border, "rounded.tr")
        : 0}px;
    `,
    css`
      border-bottom-left-radius: ${get(border, "rounded.bl")
        ? get(border, "rounded.bl")
        : 0}px;
    `,
    css`
      border-bottom-right-radius: ${get(border, "rounded.br")
        ? get(border, "rounded.br")
        : 0}px;
    `
  );
};
