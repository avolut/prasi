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
    `
      border-left-width: ${
        get(border, "stroke.l") ? get(border, "stroke.l") : 0
      }px;
    `,
    `
      border-right-width: ${
        get(border, "stroke.r") ? get(border, "stroke.r") : 0
      }px;
    `,
    `
      border-bottom-width: ${
        get(border, "stroke.b") ? get(border, "stroke.b") : 0
      }px;
    `,
    `
      border-top-width: ${
        get(border, "stroke.t") ? get(border, "stroke.t") : 0
      }px;
    `,
    `
      border-color: ${border.color ? border.color : "transparent"};
    `,
    `
      border-style: ${border.style ? border.style : "dashed"};
    `,
    `
      border-top-left-radius: ${
        get(border, "rounded.tl") ? get(border, "rounded.tl") : 0
      }px;
    `,
    `
      border-top-right-radius: ${
        get(border, "rounded.tr") ? get(border, "rounded.tr") : 0
      }px;
    `,
    `
      border-bottom-left-radius: ${
        get(border, "rounded.bl") ? get(border, "rounded.bl") : 0
      }px;
    `,
    `
      border-bottom-right-radius: ${
        get(border, "rounded.br") ? get(border, "rounded.br") : 0
      }px;
    `
  );
};