import { Websocket } from "hyper-express";
import { compress } from "lz-string";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import {
  WS_MSG_GET_COMP,
  WS_MSG_SET_COMP,
  WS_MSG_SV_LOCAL,
} from "../../../web/src/compo/editor/ws/msg";
import { SingleComp, eg } from "../edit-global";

export const getComp = async (ws: Websocket, msg: WS_MSG_GET_COMP) => {
  const comp_id = msg.comp_id;
  if (!eg.edit.comp[comp_id]) {
    const rawComp = await db.component.findFirst({
      where: {
        id: comp_id,
      },
    });

    if (!rawComp) {
      const sent: WS_MSG_SET_COMP = {
        type: "set_comp",
        comp_id: comp_id,
        changes: "",
      };
      ws.send(JSON.stringify(sent));
      return;
    }

    if (rawComp) {
      const ydoc = new Y.Doc() as SingleComp["doc"];
      const map = ydoc.getMap("map");
      syncronize(map as any, rawComp);

      const ws = new Set<Websocket>();
      const um = new Y.UndoManager(map, { ignoreRemoteMapChanges: true });
      const broadcast = () => {
        const sv_local = compress(Y.encodeStateVector(ydoc as any).toString());
        const broadcast: WS_MSG_SV_LOCAL = {
          type: "sv_local",
          sv_local,
          mode: "comp",
          id: comp_id,
        };
        ws.forEach((w) => w.send(JSON.stringify(broadcast)));
      };
      um.on("stack-item-added", broadcast);
      um.on("stack-item-updated", broadcast);

      eg.edit.comp[comp_id] = {
        doc: ydoc,
        id: comp_id,
        undoManager: um,
        ws,
      };
    }
  }

  const comp = eg.edit.comp[comp_id];
  if (comp) {
    comp.ws.add(ws);
    const sent: WS_MSG_SET_COMP = {
      type: "set_comp",
      comp_id: comp_id,
      changes: compress(Y.encodeStateAsUpdate(comp.doc as any).toString()),
    };
    ws.send(JSON.stringify(sent));
  }
};
