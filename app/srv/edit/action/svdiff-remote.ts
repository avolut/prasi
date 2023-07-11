import { Websocket } from "hyper-express";
import { compress, decompress } from "lz-string";
import * as Y from "yjs";
import { WS_MSG_DIFF_LOCAL, WS_MSG_SVDIFF_REMOTE } from "../../../web/src/compo/editor/ws/msg";
import { eg } from "../edit-global";

export const svdiffRemote = async (
  ws: Websocket,
  msg: WS_MSG_SVDIFF_REMOTE
) => {
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

  let doc = null as any;
  if (msg.mode === "page") {
    doc = eg.edit.page[msg.id].doc;
  } else if (msg.mode === "comp") {
    doc = eg.edit.comp[msg.id].doc;
  } else if (msg.mode === "site") {
    doc = eg.edit.site[msg.id].doc;
  }

  if (doc) {
    const diff_local = Y.encodeStateAsUpdate(doc as any, sv_remote);
    Y.applyUpdate(doc as any, diff_remote);
    const sendmsg: WS_MSG_DIFF_LOCAL = {
      type: "diff_local",
      mode: msg.mode,
      id: msg.id,
      diff_local: compress(diff_local.toString()),
    };
    ws.send(JSON.stringify(sendmsg));
  }
};
