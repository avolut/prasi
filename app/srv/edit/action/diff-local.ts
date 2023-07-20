import { Websocket } from "hyper-express";
import { decompress } from "lz-string";
import * as Y from "yjs";
import { eg } from "../edit-global";

export const diffLocal = (ws: Websocket, msg: any) => {
  const diff_local = Uint8Array.from(
    decompress(msg.diff_local)
      .split(",")
      .map((x) => parseInt(x, 10))
  );
  let doc = null as any;
  let wss: Set<Websocket> = null as any;
  let um: Y.UndoManager = null as any;
  if (msg.mode === "page") {
    doc = eg.edit.page[msg.id].doc;
    wss = eg.edit.page[msg.id].ws;
    um = eg.edit.page[msg.id].undoManager;
  } else if (msg.mode === "comp") {
    doc = eg.edit.comp[msg.id].doc;
    wss = eg.edit.comp[msg.id].ws;
    um = eg.edit.comp[msg.id].undoManager;
  } else if (msg.mode === "site") {
    doc = eg.edit.site[msg.id].doc;
    wss = eg.edit.site[msg.id].ws;
    um = eg.edit.site[msg.id].undoManager;
  }

  if (doc && wss) {
    Y.applyUpdate(doc, diff_local);

    if (msg.mode === "page") {
      clearTimeout(eg.edit.page[msg.id].saveTimeout);
      eg.edit.page[msg.id].saveTimeout = setTimeout(() => {
        const page = eg.edit.page[msg.id].doc.getMap("map").toJSON();
        db.page.update({
          where: { id: msg.id },
          data: {
            ...page,
          },
        });
      }, 1500);
    } else if (msg.mode === "comp") {
      eg.edit.comp[msg.id].saveTimeout = setTimeout(() => {
        const comp = eg.edit.comp[msg.id].doc.getMap("map").toJSON();
        db.component.update({
          where: {
            id: msg.id,
          },
          data: {
            name: comp.name,
            content_tree: comp.content_tree,
          },
        });
      }, 1500);
    } else if (msg.mode === "site") {
      clearTimeout(eg.edit.site[msg.id].saveTimeout);
      eg.edit.site[msg.id].saveTimeout = setTimeout(() => {
        const site = eg.edit.site[msg.id].doc.getMap("site").toJSON();
        delete site.page;
        db.site.update({
          where: {
            id: msg.id,
          },
          data: {
            ...site,
          },
        });
      }, 1500);
    }

    // (um as any).broadcastTimeout = setTimeout(() => {
    //   const sv_local = compress(Y.encodeStateVector(doc as any).toString());
    //   const broadcast: WS_MSG_SV_LOCAL = {
    //     type: "sv_local",
    //     sv_local,
    //     mode: msg.mode,
    //     id: msg.id,
    //   };
    //   wss.forEach((w) => {
    //     if (w !== ws) {
    //       w.send(JSON.stringify(broadcast));
    //     }
    //   });
    // }, 500);
  }
};
