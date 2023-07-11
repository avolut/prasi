import { wsdoc } from "../../editor/ws/wsdoc";
import { w } from "../../types/general";

export const responsiveMode = () => {
  if (w.isEditor) {
    return wsdoc.mode;
  }

  return !isSSR && window.innerWidth <= 640 ? "mobile" : "desktop";
};
