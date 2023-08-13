import { WS_MSG_REDO, WS_MSG_UNDO } from "../../../utils/types/ws";
import { PG } from "./global";
import { wsend } from "./ws";

export const undoManager = {
  undo(p: PG) {
    let sendmsg: WS_MSG_UNDO;

    if (p.comp?.id) {
      sendmsg = {
        type: "undo",
        mode: "comp",
        id: p.comp.id,
      };
    } else {
      sendmsg = {
        type: "undo",
        mode: "page",
        id: p.page?.id || "",
      };
    }
    wsend(p, JSON.stringify(sendmsg));
  },
  redo(p: PG) {
    let sendmsg: WS_MSG_REDO;
    if (p.comp?.id) {
      sendmsg = {
        type: "redo",
        mode: "comp",
        id: p.comp.id,
      };
    } else {
      sendmsg = {
        type: "redo",
        mode: "page",
        id: p.page?.id || "",
      };
    }
    wsend(p, JSON.stringify(sendmsg));
  },
};
