import { PG } from "../../../render/editor/logic/global";
import { wsdoc } from "../../editor/ws/wsdoc";
import { w } from "../../types/general";

export const responsiveMode = (p?: PG) => {
  return !isSSR && window.innerWidth <= 640 ? "mobile" : "desktop";
};
