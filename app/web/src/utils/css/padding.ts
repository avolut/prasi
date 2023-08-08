import { responsiveVal } from "../../render/editor/tools/responsive-val";
import { FNPadding } from "../types/meta-fn";

export const cssPadding = (
  cur: { padding?: FNPadding },
  mode?: "mobile" | "desktop"
) => {
  const padding = responsiveVal<FNPadding>(cur, "padding", mode, {
    l: 0,
    b: 0,
    t: 0,
    r: 0,
  });

  return cx(
    padding.l !== undefined &&
      css`
        padding-left: ${padding.l}px;
      `,
    padding.r !== undefined &&
      css`
        padding-right: ${padding.r}px;
      `,
    padding.b !== undefined &&
      css`
        padding-bottom: ${padding.b}px;
      `,
    padding.t !== undefined &&
      css`
        padding-top: ${padding.t}px; 
      `
  );
};
