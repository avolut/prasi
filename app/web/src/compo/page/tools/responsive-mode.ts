import { PG } from "../../../render/editor/logic/global";
import { wsdoc } from "../../editor/ws/wsdoc";
import { w } from "../../types/general";

export const responsiveMode = (p?: PG) => {
  if (w.isEditor) {
    return wsdoc.mode;
  }

  return !isSSR && window.innerWidth <= 640 ? "mobile" : "desktop";
};
