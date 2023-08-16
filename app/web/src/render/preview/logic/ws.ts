import { PG } from "./global";

import { page } from "dbgen";
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
} from "../../../utils/types/ws";
import { scanComponent } from "./comp";
import { createAPI, createDB } from "../../../utils/script/init-api";
import importModule from "../../editor/tools/dynamic-import";

export const previewWS = async (p: PG) => {
  if (p.ws && p.ws.readyState === p.ws.OPEN) {
    if (p.page) {
    }
    return;
  }

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

    p.ws = new WebSocket(wsurl);
    const ws = p.ws;

    if (ws) {
      const retry = (e: any) => {
        console.log("Reconnecting...");
      };
      ws.addEventListener("error", retry);
      ws.addEventListener("close", retry);
      ws.addEventListener("open", () => resolve());
      ws.addEventListener("message", async (e) => {
        const msg = JSON.parse(e.data) as WS_MSG;

        switch (msg.type) {
          case "get_page":
            break;
          case "set_page":
            p.mpage = await setPage(msg);
            p.mpage.on(
              "update",
              throttle((e, origin) => {
                if (p.mpage) {
                  p.status = "init";
                  const page = p.mpage.getMap("map")?.toJSON() as page;
                  console.clear();
                  console.log(
                    `🔥 Page updated: ${
                      page.url
                    } ${new Date().toLocaleString()}`
                  );
                  p.pageComp = {};

                  if (!p.pages[page.id]) {
                    p.pages[page.id] = {
                      id: page.id,
                      js: page.js_compiled || "",
                      content_tree: page.content_tree as any,
                    };
                  } else {
                    p.pages[page.id].content_tree = page.content_tree as any;
                    p.pages[page.id].js = page.js_compiled as any;
                  }
                  p.render();
                }
              })
            );
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
            break;
          case "diff_local":
            if (msg.mode === "page") {
              Y.applyUpdate(p.mpage as any, extract(msg.diff_local), "remote");
            }
            if (msg.mode === "comp") {
              Y.applyUpdate(
                p.comp.doc[msg.id] as any,
                extract(msg.diff_local),
                "remote"
              );
            }
            break;
          case "set_comp":
            {
              const callback = p.comp.pending[msg.comp_id];
              if (callback) {
                p.comp.doc[msg.comp_id] = new Y.Doc() as CompDoc;
                Y.applyUpdate(
                  p.comp.doc[msg.comp_id] as any,
                  extract(msg.changes),
                  "remote"
                );
                p.comp.doc[msg.comp_id].on(
                  "update",
                  throttle((e, origin) => {
                    p.pageComp = {};
                    p.status = "init";

                    console.log(
                      `🔥 Component updated: ${p.comp.doc[msg.comp_id]
                        .getMap("map")
                        .get("name")} ${new Date().toLocaleString()}`
                    );
                    p.render();
                  })
                );
                const comp = p.comp.doc[msg.comp_id]
                  .getMap("map")
                  .get("content_tree")
                  ?.toJSON() as IItem;

                const ids = new Set<string>();
                scanComponent(comp, ids);

                callback(
                  p.comp.doc[msg.comp_id]
                    .getMap("map")
                    .toJSON() as PRASI_COMPONENT
                );
                delete p.comp.pending[msg.comp_id];
              }
            }
            break;
          case "sitejs_reload":
            if (msg.js) {
              p.site.js = msg.js;

              const exec = (fn: string, scopes: any) => {
                if (p) {
                  scopes["api"] = createAPI(p.site.api_url);
                  scopes["db"] = createDB(p.site.api_url);
                  const f = new Function(...Object.keys(scopes), fn);
                  const res = f(...Object.values(scopes));
                  return res;
                }
                return null;
              };
              const w = window as any;
              const scope = {
                types: {},
                exports: w.exports,
                load: importModule,
                render: p.render,
                module: {
                  exports: {} as any,
                },
              };

              p.status = "init";
              console.clear();
              console.log(
                `🔥 Site JS Reloaded: ${new Date().toLocaleString()}`
              );
              exec(p.site.js, scope);

              if (scope.module.exports) {
                for (const [k, v] of Object.entries(scope.module.exports)) {
                  w.exports[k] = v;
                }
              }

              p.render();
            }
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
  if (mode === "comp") doc = p.comp.doc[id];
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
  if (mode === "comp") doc = p.comp.doc[id];
  if (!doc) return;
  sendDoc(doc);
};

export const wsend = async (local: PG, payload: string) => {
  const ws = local.ws;
  if (ws) {
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
