import throttle from "lodash.throttle";
import { compress } from "lz-string";
import { CEGlobal } from "../../../base/global/content-editor";
import { MPage } from "../../types/general";
import { diffLocal } from "./actions/diff-local";
import { setComp } from "./actions/set-comp";
import { setPage } from "./actions/set-page";
import { svLocal } from "./actions/sv-local";
import { svdiffRemote } from "./actions/svdiff-remote";
import { WS_MSG, WS_MSG_GET_PAGE, WS_MSG_SV_LOCAL } from "./msg";
import { wsdoc } from "./wsdoc";
import * as Y from "yjs";

export const connectWS = async (page: {
  id: string;
  ce: typeof CEGlobal & { render: () => void };
  connected: (page: MPage) => void;
}) => {
  const wsurl = new URL(serverurl);
  wsurl.protocol = wsurl.protocol.startsWith("http:") ? "ws:" : "wss:";

  if (
    wsdoc.retry.localIP &&
    ["localhost", "127.0.0.1"].includes(wsurl.hostname)
  ) {
    const ips = await api.local_ip();
    wsurl.hostname = ips[0];
  }

  if (wsdoc.ws) {
    if (wsdoc.ws.readyState === wsdoc.ws.CONNECTING) {
      return;
    } else if (wsdoc.ws.readyState === wsdoc.ws.OPEN) {
      wsdoc.retry.disabled = true;
      wsdoc.ws.close();
    }
  }

  wsurl.pathname = "/edit";
  wsdoc.ws = new WebSocket(wsurl);
  if (wsdoc.ws) {
    const ws = wsdoc.ws;
    const retry = (e: any) => {
      if (wsdoc.retry.disabled) return;

      wsdoc.retry.localIP = true;
      if (wsdoc.retry.fast) {
        connectWS(page);
      } else {
        setTimeout(() => {
          console.log("Reconnecting...");
          connectWS(page);
        }, 2000);
      }
    };
    ws.addEventListener("error", retry);
    ws.addEventListener("close", retry);
    ws.addEventListener("message", async (e) => {
      const msg = JSON.parse(e.data) as WS_MSG;

      switch (msg.type) {
        case "set_page":
          {
            const doc = await setPage(msg);
            doc.on(
              "update",
              throttle(async (e, origin) => {
                if (!origin && origin !== "updated_at") {
                  doc.transact(() => {
                    doc
                      .getMap("map")
                      .set("updated_at", new Date().toISOString());
                  }, "updated_at");

                  const sendmsg: WS_MSG_SV_LOCAL = {
                    type: "sv_local",
                    mode: "page",
                    id: page.id,
                    sv_local: compress(
                      Y.encodeStateVector(doc as any).toString()
                    ),
                  };
                  await wsdoc.wsend(JSON.stringify(sendmsg));
                }
              }, 300)
            );
            page.connected(doc);
          }
          break;
        case "set_comp":
          await setComp(msg);
          break;
        case "svd_remote":
          await svdiffRemote(msg);
          break;
        case "sv_local":
          await svLocal(msg);
          break;
        case "diff_local":
          {
            if (!wsdoc.pendingDiffLocal) wsdoc.pendingDiffLocal = [];

            const focused = (document.activeElement as HTMLDivElement)
              .isContentEditable;

            if (
              !focused ||
              (focused && Date.now() - (wsdoc.lastTypedTimeestamp || 0) > 2000)
            ) {
              for (const msg of wsdoc.pendingDiffLocal) {
                await diffLocal(msg);
                wsdoc.pendingDiffLocal.shift();
              }
              await diffLocal(msg);
              page.ce.render();
            } else {
              wsdoc.pendingDiffLocal.push(msg);
            }
          }
          break;
      }
    });

    ws.addEventListener("open", () => {
      wsdoc.retry.disabled = false;
      ws.send(
        JSON.stringify({
          type: "get_page",
          page_id: page.id,
        } as WS_MSG_GET_PAGE)
      );
    });
  }
};
