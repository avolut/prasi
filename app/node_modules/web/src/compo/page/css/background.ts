import { MetaItem } from "../../types/meta";
import { FNBackground } from "../../types/meta-fn";
import { responsiveVal } from "../tools/responsive-val";

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
    css`
      background-repeat: no-repeat;
    `,
    bg.color &&
      css`
        background-color: ${bg.color};
      `,
    bg.url &&
      typeof siteApiUrl === "string" &&
      css`
        background-image: url("${bgurl}");
      `,
    bg.size &&
      css`
        background-size: ${bg.size};
      `,
    bg.pos &&
      css`
        background-position: ${bg.pos};
      `
  );
};
