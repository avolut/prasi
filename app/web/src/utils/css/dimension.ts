import { responsiveVal } from "../../render/editor/tools/responsive-val";
import { MetaItem } from "../types/meta";
import { FNDimension } from "../types/meta-fn";

export const cssDimension = (
  cur: { dim?: FNDimension; type: MetaItem["type"] },
  mode?: "mobile" | "desktop",
  editor?: boolean
) => {
  const dim = responsiveVal<FNDimension>(cur, "dim", mode, {
    h: "fit",
    w: "fit",
  });

  return cx(
    dim.w === "fit" &&
      `
        & > .txt-box > * {
          white-space: nowrap !important;
        }
      `,
    dim.w === "full" &&
      `
        width: 100%;
      `,
    dim.w &&
      typeof dim.w === "number" &&
      dim.w >= 0 &&
      `
        width: ${dim.w}${dim.wUnit || "px"};
        overflow-x: clip;
      `,
    dim.h === "full" &&
      `
        height: ${
          editor
            ? "100%"
            : "100" +
              (cur.type === "section" ? (mode === "mobile" ? "vh" : "vh") : "%")
        };
        margin-bottom: auto;
      `,

    dim.h &&
      typeof dim.h === "number" &&
      dim.h >= 0 &&
      `
        height: ${dim.h}${dim.hUnit || "px"};
        overflow-y: clip;
      `
  );
};
