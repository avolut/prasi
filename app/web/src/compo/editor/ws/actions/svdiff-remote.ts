import { compress, decompress } from "lz-string";
import * as Y from "yjs";
import { w } from "../../../types/general";
import { WS_MSG_DIFF_LOCAL, WS_MSG_SVDIFF_REMOTE } from "../msg";
import { wsdoc } from "../wsdoc";
import { component } from "../../../page/component";

export const svdiffRemote = async (msg: WS_MSG_SVDIFF_REMOTE) => {
  const sv_remote = Uint8Array.from(
    decompress(msg.sv_remote)
      .split(",")
      .map((x) => parseInt(x, 10))
  );
  const diff_remote = Uint8Array.from(
    decompress(msg.diff_remote)
      .split(",")
      .map((x) => parseInt(x, 10))
  );

  const sendDoc = async (doc: any) => {
    const diff_local = Y.encodeStateAsUpdate(doc as any, sv_remote);
    Y.applyUpdate(doc as any, diff_remote, "local");
    const sendmsg: WS_MSG_DIFF_LOCAL = {
      type: "diff_local",
      mode: msg.mode,
      id: msg.id,
      diff_local: compress(diff_local.toString()),
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
