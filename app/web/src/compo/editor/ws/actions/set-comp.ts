import { WS_MSG_SET_COMP } from "../msg";
import { wsdoc } from "../wsdoc";
export const setComp = async (msg: WS_MSG_SET_COMP) => {
  if (!wsdoc.compsResolveCallback) {
    wsdoc.compsResolveCallback = {};
  }
  const comp = wsdoc.compsResolveCallback[msg.comp_id];
  if (comp) comp(msg.changes);
};
