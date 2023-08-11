import { Websocket } from "hyper-express";
import { decompress } from "lz-string";
import * as Y from "yjs";
import { eg } from "../edit-global";

export const diffLocal = (ws: Websocket, msg: any) => {
  return new Promise<void>((resolve) => {
    const diff_local = Uint8Array.from(
      decompress(msg.diff_local)
        .split(",")
        .map((x) => parseInt(x, 10))
    );
    let doc = null as unknown as Y.Doc;
    let wss: Set<Websocket> = null as any;
    let um: Y.UndoManager = null as any;
    if (msg.mode === "page") {
      doc = eg.edit.page[msg.id].doc as any;
      wss = eg.edit.page[msg.id].ws;
      um = eg.edit.page[msg.id].undoManager;
    } else if (msg.mode === "comp") {
      doc = eg.edit.comp[msg.id].doc as any;
      wss = eg.edit.comp[msg.id].ws;
      um = eg.edit.comp[msg.id].undoManager;
    } else if (msg.mode === "site") {
      doc = eg.edit.site[msg.id].doc as any;
      wss = eg.edit.site[msg.id].ws;
      um = eg.edit.site[msg.id].undoManager;
    }

    if (doc && wss) {
      Y.applyUpdate(doc, diff_local);

      if (msg.mode === "page") {
        clearTimeout(eg.edit.page[msg.id].saveTimeout);
        eg.edit.page[msg.id].saveTimeout = setTimeout(async () => {
          if (msg.id) {
            const page = eg.edit.page[msg.id].doc.getMap("map").toJSON();
            await db.page.update({
              where: { id: msg.id },
              data: {
                ...page,
                updated_at: new Date(),
              },
            });
            resolve();
          }
        }, 1500);
      } else if (msg.mode === "comp") {
        eg.edit.comp[msg.id].saveTimeout = setTimeout(async () => {
          const comp = eg.edit.comp[msg.id].doc.getMap("map").toJSON();
          await db.component.update({
            where: {
              id: msg.id,
            },
            data: {
              name: comp.name,
              content_tree: comp.content_tree,
              updated_at: new Date(),
            },
          });
        }, 1500);
      } else if (msg.mode === "site") {
        clearTimeout(eg.edit.site[msg.id].saveTimeout);
        eg.edit.site[msg.id].saveTimeout = setTimeout(async () => {
          const site = eg.edit.site[msg.id].doc.getMap("site").toJSON();
          delete site.page;
          await db.site.update({
            where: {
              id: msg.id,
            },
            data: {
              ...site,
            },
          });
        }, 1500);
      }
    }
  });
};
