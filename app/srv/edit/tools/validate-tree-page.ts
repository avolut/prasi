import { IContent } from "../../../web/src/compo/types/general";
import { IRoot } from "../../../web/src/compo/types/root";

export const validateTreePage = (item: IContent | IRoot) => {
  if (item && item.type !== "root") {
    if (item.adv && item.adv.html && item.adv.html.length > 25000) {
      item.adv.html = "";
    }
  }

  if (item) {
    if (item.type !== "text" && item.childs) {
      for (const c of item.childs) {
        validateTreePage(c);
      }
    }
  }
};
