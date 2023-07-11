import { compress, decompress } from "lz-string";
import * as Y from "yjs";
import { w } from "../../../types/general";
import { WS_MSG_SVDIFF_REMOTE, WS_MSG_SV_LOCAL } from "../msg";
import { wsdoc } from "../wsdoc";
import { component } from "../../../page/component";

export const svLocal = async (msg: WS_MSG_SV_LOCAL) => {
  const sv_local = Uint8Array.from(
    decompress(msg.sv_local)
      .split(",")
      .map((x) => parseInt(x, 10))
  );
  const sendDoc = async (doc: any) => {
    const diff_remote = Y.encodeStateAsUpdate(doc, sv_local);
    const sv_remote = Y.encodeStateVector(doc);

    const sendmsg: WS_MSG_SVDIFF_REMOTE = {
      diff_remote: compress(diff_remote.toString()),
      sv_remote: compress(sv_remote.toString()),
      id: msg.id,
      mode: msg.mode,
      type: "svd_remote",
    };
    await wsdoc.wsend(JSON.stringify(sendmsg));
  };

  if (msg.mode === "page") {
    const page = wsdoc.page;
    if (page && page.doc) sendDoc(page.doc);
  } else if (msg.mode === "comp") {
    const comp = component.docs[msg.id];
    if (comp) sendDoc(comp);
  }
};
