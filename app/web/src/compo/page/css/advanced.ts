import { MetaItem } from "../../types/meta";
import { FNAdv } from "../../types/meta-fn";
import { responsiveVal } from "../tools/responsive-val";

export const cssAdv = (
  cur: { adv?: FNAdv; type: MetaItem["type"] },
  mode?: "mobile" | "desktop"
) => {
  const adv = responsiveVal<FNAdv>(cur, "adv", mode, {});

  return cx(
    adv.css &&
      css`
        ${adv.css}
      `
  );
};
