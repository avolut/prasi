import { responsiveVal } from "../../render/editor/tools/responsive-val";
import { MetaItem } from "../types/meta";
import { FNBackground } from "../types/meta-fn";

export const cssBackground = (
  cur: { bg?: FNBackground; type: MetaItem["type"] },
  mode?: "mobile" | "desktop"
) => {
  const bg = responsiveVal<FNBackground>(cur, "bg", mode, {
    size: "contain",
    pos: "center",
  });

  let bgurl = `${siteApiUrl}${bg.url}`;
  if (bg && bg.url && bg.url.startsWith("http")) {
    bgurl = bg.url;
  }

  return cx(
    `
      background-repeat: no-repeat;
    `,
    bg.color &&
      `
        background-color: ${bg.color};
      `,
    bg.url &&
      typeof siteApiUrl === "string" &&
      `
        background-image: url("${bgurl}");
      `,
    bg.size &&
      `
        background-size: ${bg.size};
      `,
    bg.pos &&
      `
        background-position: ${bg.pos};
      `
  );
};
