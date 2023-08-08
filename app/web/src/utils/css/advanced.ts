import { responsiveVal } from "../../compo/page/tools/responsive-val";
import { MetaItem } from "../types/meta";
import { FNAdv } from "../types/meta-fn";

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
