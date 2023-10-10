import { createId } from "@paralleldrive/cuid2";
import { Websocket } from "hyper-express";
import { WS_MSG } from "../../web/src/utils/types/ws";
import { diffLocal } from "./action/diff-local";
import { getComp } from "./action/get-comp";
import { getPage } from "./action/get-page";
import { svLocal } from "./action/sv-local";
import { svdiffRemote } from "./action/svdiff-remote";
import { redo, undo } from "./action/undo-redo";
import { eg } from "./edit-global";
import { decompress } from "lz-string";

eg.edit = {
  site: {},
  comp: {},
  page: {},
  ws: new WeakMap(),
};
const site = {
  saveTimeout: null as any,
};

export const collabEditHandler = (ws: Websocket) => {
  eg.edit.ws.set(ws, {
    clientID: createId(),
  });

  ws.on("message", async (raw: string) => {
    try {
      const msg = JSON.parse(raw) as WS_MSG;

      if (msg.type === "ping") {
        ws.send(JSON.stringify({ type: "pong" }));
        return;
      }

      switch (msg.type) {
        case "site-js":
          clearTimeout(site.saveTimeout);
          site.saveTimeout = setTimeout(async () => {
            const js = JSON.parse(decompress(msg.src));
            await db.site.update({
              where: {
                id: msg.id_site,
              },
              data: {
                js: js.src,
                js_compiled: js.compiled,
              },
            });
          }, 1000);
          break;
        case "get_page":
          await getPage(ws, msg);
          break;
        case "get_comp":
          await getComp(ws, msg);
          break;
        case "sv_local":
          await svLocal(ws, msg);
          break;
        case "diff_local":
          await diffLocal(ws, msg);
          break;
        case "svd_remote":
          await svdiffRemote(ws, msg);
          break;
        case "undo":
          undo(ws, msg);
          break;
        case "redo":
          redo(ws, msg);
          break;
      }
    } catch (e) {
      console.log(e);
    }
  });

  ws.on("close", (e) => {
    eg.edit.ws.delete(ws);

    for (const page of Object.values(eg.edit.page)) {
      page.ws.delete(ws);
    }

    for (const site of Object.values(eg.edit.site)) {
      site.ws.delete(ws);
    }

    for (const comp of Object.values(eg.edit.comp)) {
      comp.ws.delete(ws);
    }
  });
};
