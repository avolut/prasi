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
    wrap: undefined,
  });

  if (layout) {
    if (layout.wrap) {
      result.push(
        layout.wrap === "flex-wrap" ? "flex-wrap: wrap;" : "flex-wrap: nowrap;"
      );
    }
    if (layout.dir.startsWith("col")) {
      if (layout.dir === "col") {
        result.push("flex-direction: column;");
      } else if (layout.dir === "col-reverse") {
        result.push("flex-direction: column-reverse;");
      }
      if (layout.gap === "auto") {
        if (layout.align === "left")
          result.push("align-items:start; justify-content: space-between;");
        if (layout.align === "center")
          result.push("align-items:center; justify-content: space-between;");
        if (layout.align === "right")
          result.push("align-items:end; justify-content: space-between;");
      } else {
        result.push(`gap: ${layout.gap}px;`);

        if (layout.align === "top-left")
          result.push("align-items:start; justify-content: start;");
        if (layout.align === "top-center")
          result.push("align-items:center; justify-content: start;");
        if (layout.align === "top-right")
          result.push("align-items:end; justify-content: start;");

        if (layout.align === "left")
          result.push("align-items:start; justify-content: center;");
        if (layout.align === "center")
          result.push("align-items:center; justify-content: center;");
        if (layout.align === "right")
          result.push("align-items:end; justify-content: center;");

        if (layout.align === "bottom-left")
          result.push("align-items:start; justify-content: end;");
        if (layout.align === "bottom-center")
          result.push("align-items:center; justify-content: end;");
        if (layout.align === "bottom-right")
          result.push("align-items:end; justify-content: end;");
      }
    } else {
      if (layout.dir === "row") {
        result.push("flex-direction: row;");
      } else if (layout.dir === "row-reverse") {
        result.push("flex-direction: row-reverse;");
      }

      if (layout.gap === "auto") {
        if (layout.align === "top")
          result.push("align-items:start; justify-content: space-between;");
        if (layout.align === "center")
          result.push("align-items:center; justify-content: space-between;");
        if (layout.align === "bottom")
          result.push("align-items:end; justify-content: space-between;");
      } else {
        result.push(
          `
            gap: ${layout.gap}px;
          `
        );

        if (layout.align === "top-left")
          result.push("align-items:start; justify-content: start;");
        if (layout.align === "top-center")
          result.push("align-items:start; justify-content: center;");
        if (layout.align === "top-right")
          result.push("align-items:start; justify-content: end;");

        if (layout.align === "left")
          result.push("align-items:center; justify-content: start;");
        if (layout.align === "center")
          result.push("align-items:center; justify-content: center;");
        if (layout.align === "right")
          result.push("align-items:center; justify-content: end;");

        if (layout.align === "bottom-left")
          result.push("align-items:end; justify-content: start;");
        if (layout.align === "bottom-center")
          result.push("align-items:end; justify-content: center;");
        if (layout.align === "bottom-right")
          result.push("align-items:end; justify-content: end;");
      }
    }
  } else {
    return "flex-direction:column; align-items:start; justify-content: start;";
  }
  return result.join("\n\t").trim();
};
