import { Websocket } from "hyper-express";
import { compress, decompress } from "lz-string";
import * as Y from "yjs";
import {
  WS_MSG_SVDIFF_REMOTE,
  WS_MSG_SV_LOCAL,
} from "../../../web/src/compo/editor/ws/msg";
import { eg } from "../edit-global";
import { getComp } from "./get-comp";

export const svLocal = async (ws: Websocket, msg: WS_MSG_SV_LOCAL) => {
  const changes = Uint8Array.from(
    decompress(msg.sv_local)
      .split(",")
      .map((x) => parseInt(x, 10))
  );
  let doc = null as any;
  if (msg.mode === "page") {
    doc = eg.edit.page[msg.id].doc;
  } else if (msg.mode === "comp") {
    if (!eg.edit.comp[msg.id]) {
      await getComp(ws, { comp_id: msg.id, type: "get_comp" });
    }

    doc = eg.edit.comp[msg.id].doc;
  } else if (msg.mode === "site") {
    doc = eg.edit.site[msg.id].doc;
  }

  if (doc) {
    const diff_remote = Y.encodeStateAsUpdate(doc, changes);
    const sv_remote = Y.encodeStateVector(doc);

    const sendmsg: WS_MSG_SVDIFF_REMOTE = {
      diff_remote: compress(diff_remote.toString()),
      sv_remote: compress(sv_remote.toString()),
      id: msg.id,
      mode: msg.mode,
      type: "svd_remote",
    };
    ws.send(JSON.stringify(sendmsg));
  }
};
