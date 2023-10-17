import { compress } from "lz-string";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { MPage } from "../../web/src/utils/types/general";
import { WS_MSG_SET_PAGE, WS_MSG_SV_LOCAL } from "../../web/src/utils/types/ws";
import { eg } from "../edit/edit-global";
import { loadPage } from "../edit/tools/load-page";

export const _ = {
  url: "/page-reload/:page_id",
  async api(page_id: string) {
    if (eg.edit.page[page_id]) {
      const rawPage = await loadPage(page_id);

      if (rawPage) {
        const ydoc = new Y.Doc() as MPage;
        let root = ydoc.getMap("map");
        syncronize(root as any, rawPage);
        const um = new Y.UndoManager(root, { ignoreRemoteMapChanges: true });
        const broadcast = () => {
          const sv_local = compress(
            Y.encodeStateVector(ydoc as any).toString()
          );
          const broadcast: WS_MSG_SV_LOCAL = {
            type: "sv_local",
            sv_local,
            mode: "page",
            id: page_id,
          };
          eg.edit.page[page_id].ws.forEach((w) =>
            w.send(JSON.stringify(broadcast))
          );
        };
        um.on("stack-item-added", broadcast);
        um.on("stack-item-updated", broadcast);

        eg.edit.page[page_id].doc = ydoc;
        eg.edit.page[page_id].undoManager = um;

        eg.edit.page[page_id].ws.forEach((w) => {
          const sent: WS_MSG_SET_PAGE = {
            type: "set_page",
            changes: compress(Y.encodeStateAsUpdate(ydoc as any).toString()),
          };
          w.send(JSON.stringify(sent));
        });
      }
    }

    return "ok";
  },
};
