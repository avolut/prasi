import { PG } from "./global";

import throttle from "lodash.throttle";
import { compress, decompress } from "lz-string";
import * as Y from "yjs";
import { CompDoc } from "../../../base/global/content-editor";
import { MPage } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { PRASI_COMPONENT } from "../../../utils/types/render";
import {
  WS_MSG,
  WS_MSG_DIFF_LOCAL,
  WS_MSG_SET_PAGE,
  WS_MSG_SVDIFF_REMOTE,
  WS_MSG_SV_LOCAL,
} from "../../../utils/types/ws";
import { scanComponent } from "./comp";
import { execSiteJS } from "./init";
import { rebuildTree } from "./tree-logic";

const timeout = {
  reconnect: null as any,
  svd: null as any,
  setpage: null as any,
};
export const editorWS = async (p: PG) => {
  if (p.ws && p.ws.readyState === p.ws.OPEN) {
    if (p.page) {
    }
    return;
  }
  const render = () => {
    if (!p.focused) p.render();
  };

  return new Promise<void>(async (resolve) => {
    const wsurl = new URL(serverurl);
    wsurl.protocol = wsurl.protocol.startsWith("http:") ? "ws:" : "wss:";

    if (
      p.wsRetry.localIP &&
      ["localhost", "127.0.0.1"].includes(wsurl.hostname)
    ) {
      const ips = await api.local_ip();
      wsurl.hostname = ips[0];
    }

    wsurl.pathname = "/edit";
    clearTimeout(timeout.reconnect);

    p.ws = new WebSocket(wsurl);
    const ws = p.ws;

    if (ws) {
      const retry = (e: any) => {
        if (p.wsRetry.disabled) return;

        p.wsRetry.reconnecting = true;
        p.wsRetry.localIP = true;
        if (p.wsRetry.fast) {
          editorWS(p);
        } else {
          clearTimeout(timeout.reconnect);

          timeout.reconnect = setTimeout(() => {
            console.log("Reconnecting...");
            editorWS(p);
          }, 5000);
        }
      };
      ws.addEventListener("error", (e) => {
        console.log("error", e);
        retry(e);
      });
      ws.addEventListener("close", (e) => {
        console.log("close", e);
        retry(e);
      });
      ws.addEventListener("open", () => {
        if (p.wsRetry.reconnecting) {
          p.wsRetry.reconnecting = false;
          console.log("Connected");
        }
        resolve();
      });
      clearInterval(p.wsPingInterval);
      p.wsPingInterval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          wsend(p, JSON.stringify({ type: "ping" }));
          p.wsPingTs = Date.now();
        } else {
          p.wsPing = -1;
          p.softRender.topR();
        }
      }, 5000);
      ws.addEventListener("message", async (e) => {
        const msg = JSON.parse(e.data) as WS_MSG;

        if (msg.type === "pong") {
          p.wsPing = Date.now() - p.wsPingTs;
          p.softRender.topR();
          return;
        }

        switch (msg.type) {
          case "get_page":
            break;
          case "set_page":
            p.mpage = await setPage(msg);
            p.mpage.on("update", (e, origin) => {
              clearTimeout(timeout.setpage);
              timeout.setpage = setTimeout(() => {
                const doc = p.mpage;
                if (doc) {
                  if (!origin) {
                    const id = doc.getMap("map").get("id");
                    if (id) {
                      const sendmsg: WS_MSG_SV_LOCAL = {
                        type: "sv_local",
                        mode: "page",
                        id,
                        sv_local: compress(
                          Y.encodeStateVector(doc as any).toString()
                        ),
                      };
                      wsend(p, JSON.stringify(sendmsg));
                    }
                  } else if (origin === "updated_at") {
                    p.page = doc?.getMap("map").toJSON() as any;
                    render();
                  }
                }
              }, 200);
            });

            rebuildTree(p, { render, mode: "reset", note: "page-load" });
            if (p.mpageLoaded) {
              p.mpageLoaded(p.mpage);
              p.mpageLoaded = null;
            }
            break;
          case "sv_local":
            svLocal({ p, bin: extract(msg.sv_local), msg });
            break;
          case "svd_remote":
            svdRemote({ p, bin: extract(msg.diff_remote), msg });
            if (!timeout.setpage) {
              clearTimeout(timeout.svd);
              timeout.svd = setTimeout(() => {
                rebuildTree(p, { render, mode: "update", note: "svd-remote" });
              }, 100);
            }
            break;
          case "diff_local": {
            if (msg.mode === "page") {
              Y.applyUpdate(p.mpage as any, extract(msg.diff_local), "remote");
            }
            if (msg.mode === "comp") {
              Y.applyUpdate(
                p.comps.doc[msg.id] as any,
                extract(msg.diff_local),
                "remote"
              );
            }
            break;
          }
          case "set_comp":
            {
              const callback = p.comps.resolve[msg.comp_id];
              if (callback) {
                p.comps.doc[msg.comp_id] = new Y.Doc() as CompDoc;
                Y.applyUpdate(
                  p.comps.doc[msg.comp_id] as any,
                  extract(msg.changes),
                  "remote"
                );
                setTimeout(() => {
                  p.comps.doc[msg.comp_id].on(
                    "update",
                    throttle((e, origin) => {
                      if (origin === "remote") {
                        return;
                      }

                      const doc = p.comps.doc[msg.comp_id];
                      if (doc) {
                        if (!origin && origin !== "updated_at") {
                          const id = doc.getMap("map").get("id");
                          if (id) {
                            doc.transact(() => {
                              doc
                                .getMap("map")
                                .set("updated_at", new Date().toISOString());
                            }, "updated_at");

                            const sendmsg: WS_MSG_SV_LOCAL = {
                              type: "sv_local",
                              mode: "comp",
                              id,
                              sv_local: compress(
                                Y.encodeStateVector(doc as any).toString()
                              ),
                            };
                            wsend(p, JSON.stringify(sendmsg));
                          }
                        }
                      }
                    })
                  );
                }, 500);
                const comp = p.comps.doc[msg.comp_id]
                  .getMap("map")
                  .get("content_tree")
                  ?.toJSON() as IItem;

                const ids = new Set<string>();
                scanComponent(comp, ids);

                callback(
                  p.comps.doc[msg.comp_id]
                    .getMap("map")
                    .toJSON() as PRASI_COMPONENT
                );
                delete p.comps.pending[msg.comp_id];
                delete p.comps.resolve[msg.comp_id];
              }
            }
            break;
          case "sitejs_reload":
            p.site.js = msg.js || "";
            execSiteJS(p);
            console.log(`🔥 Site JS Reloaded: ${new Date().toLocaleString()}`);
            render();
            api.site_dts(p.site.id).then((e) => {
              p.site_dts = e || "";
              p.render();
            });

            break;
          case "undo":
          case "redo":
          case "new_comp":
          case "get_comp":
            console.log(msg);
        }
      });
      ws.addEventListener("open", () => {
        p.wsRetry.disabled = false;

        wsend(p, JSON.stringify({ type: "ping" }));
        p.wsPingTs = Date.now();
      });
    }
  });
};

const extract = (str: string) => {
  return Uint8Array.from(
    decompress(str)
      .split(",")
      .map((x) => parseInt(x, 10))
  );
};

const svLocal = async (arg: {
  bin: Uint8Array;
  msg: {
    id: string;
    mode: string;
    type: string;
  };
  p: PG;
}) => {
  const { bin, msg, p } = arg;
  const { id, mode, type } = msg;

  let doc = null as any;
  if (mode === "page") doc = p.mpage;
  if (mode === "comp") doc = p.comps.doc[id];
  if (!doc) return;

  const diff_remote = Y.encodeStateAsUpdate(doc, bin);
  const sv_remote = Y.encodeStateVector(doc);

  const sendmsg: any = {
    diff_remote: compress(diff_remote.toString()),
    sv_remote: compress(sv_remote.toString()),
    id: id,
    mode: mode,
    type: type,
  };
  await wsend(p, JSON.stringify(sendmsg));
};

const svdRemote = async (arg: {
  bin: Uint8Array;
  msg: WS_MSG_SVDIFF_REMOTE;
  p: PG;
}) => {
  const { bin, msg, p } = arg;
  const { id, mode, type } = msg;
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

  const sendDoc = async (doc: any) => {
    const diff_local = Y.encodeStateAsUpdate(doc as any, sv_remote);
    Y.applyUpdate(doc as any, diff_remote, "local");
    const sendmsg: WS_MSG_DIFF_LOCAL = {
      type: "diff_local",
      mode: msg.mode,
      id: msg.id,
      diff_local: compress(diff_local.toString()),
    };
    await wsend(p, JSON.stringify(sendmsg));
  };

  let doc = null as any;
  if (mode === "page") doc = p.mpage;
  if (mode === "comp") doc = p.comps.doc[id];
  if (!doc) return;
  sendDoc(doc);
};

export const wsend = async (local: PG, payload: string) => {
  const ws = local.ws;
  if (ws) {
    // console.log(">", JSON.parse(payload).type);
    if (ws.readyState !== ws.OPEN) {
      await new Promise<void>((resolve) => {
        const ival = setInterval(() => {
          if (ws.readyState === ws.OPEN) {
            clearInterval(ival);
            resolve();
          }
        }, 50);
      });
    }

    ws.send(payload);
  }
};

const setPage = async (msg: WS_MSG_SET_PAGE) => {
  const page = Uint8Array.from(
    decompress(msg.changes)
      .split(",")
      .map((x) => parseInt(x, 10))
  );

  const doc = new Y.Doc();
  Y.applyUpdate(doc as any, page, "remote");

  return doc as unknown as MPage;
};
