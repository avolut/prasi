import { MetaItem } from "../../types/meta";
import { FNDimension } from "../../types/meta-fn";
import { responsiveVal } from "../tools/responsive-val";

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
      css`
        & > .txt-box > * {
          white-space: nowrap !important;
        }
      `,
    dim.w === "full" &&
      css`
        width: 100%;
      `,
    dim.w &&
      typeof dim.w === "number" &&
      dim.w >= 0 &&
      css`
        width: ${dim.w}px;
        overflow-x: clip;
      `,
    dim.h === "full" &&
      css`
        height: ${editor
          ? "100%"
          : "100" +
            (cur.type === "section"
              ? mode === "mobile"
                ? "vh"
                : "vh"
              : "%")};
        margin-bottom: auto;
      `,

    dim.h &&
      typeof dim.h === "number" &&
      dim.h >= 0 &&
      css`
        height: ${dim.h}px;
        overflow-y: clip;
      `
  );
};
