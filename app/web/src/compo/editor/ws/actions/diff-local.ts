import { decompress } from "lz-string";
import * as Y from "yjs";
import { WS_MSG_DIFF_LOCAL } from "../msg";
import { wsdoc } from "../wsdoc";
import { component } from "../../../page/component";

export const diffLocal = async (msg: WS_MSG_DIFF_LOCAL) => {
  const diff_local = Uint8Array.from(
    decompress(msg.diff_local)
      .split(",")
      .map((x) => parseInt(x, 10))
  );
  if (msg.mode === "page") {
    const page = wsdoc.page;
    if (page && page.doc) Y.applyUpdate(page.doc as any, diff_local, "remote");
  } else if (msg.mode === "comp") {
    const comp = component.docs[msg.id];
    wsdoc.reloadComponentId.add(msg.id);
    if (comp) Y.applyUpdate(comp as any, diff_local, "remote");
  }
};
