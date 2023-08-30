import { Websocket } from "hyper-express";
import { eg } from "../edit-global";
import { UndoManager } from "yjs";
import { WS_MSG_REDO, WS_MSG_UNDO } from "../../../web/src/utils/types/ws";

export const undo = (ws: Websocket, msg: WS_MSG_UNDO) => {
  const um = getUndoManager(msg);
  if (um && um.canUndo()) {
    um.undo();
  }
};

export const redo = (ws: Websocket, msg: WS_MSG_REDO) => {
  const um = getUndoManager(msg);
  if (um && um.canRedo()) {
    um.redo();
  }
};

const getUndoManager = (msg: WS_MSG_UNDO | WS_MSG_REDO) => {
  let undoManager = null as null | UndoManager;
  if (msg.mode === "page") {
    if (eg.edit.page[msg.id]) {
      undoManager = eg.edit.page[msg.id].undoManager;
    }
  } else if (msg.mode === "site") {
    if (eg.edit.site[msg.id]) {
      undoManager = eg.edit.site[msg.id].undoManager;
    }
  } else if (msg.mode === "comp") {
    if (eg.edit.comp[msg.id]) {
      undoManager = eg.edit.comp[msg.id].undoManager;
    }
  }

  return undoManager;
};
