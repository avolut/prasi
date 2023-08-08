import { responsiveVal } from "../../render/editor/tools/responsive-val";
import { FNLayout } from "../types/meta-fn";

export const cssLayout = (
  cur: { layout?: FNLayout },
  mode?: "mobile" | "desktop"
) => {
  const result: string[] = [];
  let layout = responsiveVal<FNLayout>(cur, "layout", mode, {
    dir: "col",
    align: "top-left",
    gap: 0,
  });

  if (layout) {
    if (layout.dir.startsWith("col")) {
      if (layout.dir === "col") {
        result.push("flex-col");
      } else if (layout.dir === "col-reverse") {
        result.push("flex-col-reverse");
      }

      if (layout.gap === "auto") {
        if (layout.align === "left") result.push("items-start justify-between");
        if (layout.align === "center")
          result.push("items-center justify-between");
        if (layout.align === "right") result.push("items-end justify-between");
      } else {
        result.push(
          css`
            gap: ${layout.gap}px;
          `
        );

        if (layout.align === "top-left")
          result.push("items-start justify-start");
        if (layout.align === "top-center")
          result.push("items-center justify-start");
        if (layout.align === "top-right")
          result.push("items-end justify-start");

        if (layout.align === "left") result.push("items-start justify-center");
        if (layout.align === "center")
          result.push("items-center justify-center");
        if (layout.align === "right") result.push("items-end justify-center");

        if (layout.align === "bottom-left")
          result.push("items-start justify-end");
        if (layout.align === "bottom-center")
          result.push("items-center justify-end");
        if (layout.align === "bottom-right")
          result.push("items-end justify-end");
      }
    } else {
      if (layout.dir === "row") {
        result.push("flex-row");
      } else if (layout.dir === "row-reverse") {
        result.push("flex-row-reverse");
      }

      if (layout.gap === "auto") {
        if (layout.align === "top") result.push("items-start justify-between");
        if (layout.align === "center")
          result.push("items-center justify-between");
        if (layout.align === "bottom") result.push("items-end justify-between");
      } else {
        result.push(
          css`
            gap: ${layout.gap}px;
          `
        );

        if (layout.align === "top-left")
          result.push("items-start justify-start");
        if (layout.align === "top-center")
          result.push("items-start justify-center");
        if (layout.align === "top-right")
          result.push("items-start justify-end");

        if (layout.align === "left") result.push("items-center justify-start");
        if (layout.align === "center")
          result.push("items-center justify-center");
        if (layout.align === "right") result.push("items-center justify-end");

        if (layout.align === "bottom-left")
          result.push("items-end justify-start");
        if (layout.align === "bottom-center")
          result.push("items-end justify-center");
        if (layout.align === "bottom-right")
          result.push("items-end justify-end");
      }
    }
  } else {
    return "flex-col items-start justify-start";
  }
  return result.join(" ").trim();
};
