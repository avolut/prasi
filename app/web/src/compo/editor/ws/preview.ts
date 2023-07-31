import { compress, decompress } from "lz-string";
import { MPage } from "../../types/general";
import { setPage } from "./actions/set-page";
import { WS_MSG, WS_MSG_GET_PAGE } from "./msg";
import * as Y from "yjs";
import { PrasiRenderer } from "../../renderer/prasi/prasi-renderer";

export const PageLocal = {
  ws: null as null | WebSocket,
  retry: { localIP: false, disabled: false, fast: false },
  page: null as null | MPage,
  site: null as null | PrasiRenderer,
};

export const connectPreview = async (
  local: typeof PageLocal & { render: () => void },
  page_id: string,
  resolve: (doc: MPage) => void
) => {
  const wsurl = new URL(serverurl);
  wsurl.protocol = wsurl.protocol.startsWith("http:") ? "ws:" : "wss:";

  if (
    local.retry.localIP &&
    ["localhost", "127.0.0.1"].includes(wsurl.hostname)
  ) {
    const ips = await api.local_ip();
    wsurl.hostname = ips[0];
  }

  if (local.ws) {
    if (local.ws.readyState === local.ws.CONNECTING) {
      return;
    } else if (local.ws.readyState === local.ws.OPEN) {
      local.retry.disabled = true;
      local.ws.close();
    }
  }

  wsurl.pathname = "/edit";

  local.ws = new WebSocket(wsurl);
  const ws = local.ws;
  if (ws) {
    const retry = (e: any) => {
      if (local.retry.disabled) return;

      local.retry.localIP = true;
      if (local.retry.fast) {
        connectPreview(local, page_id, resolve);
      } else {
        setTimeout(() => {
          console.log("Reconnecting...");
          connectPreview(local, page_id, resolve);
        }, 2000);
      }
    };
    ws.addEventListener("error", retry);
    ws.addEventListener("close", retry);
    ws.addEventListener("message", async (e) => {
      const msg = JSON.parse(e.data) as WS_MSG;

      switch (msg.type) {
        case "get_page":
          break;
        case "set_page":
          local.page = await setPage(msg);
          local.page.on("update", (e, origin) => {
            const rg = local.site?.rg;
            if (rg) {
              const active = rg.page.active;
              if (active) {
                active.content_tree = local.page
                  ?.getMap("map")
                  .get("content_tree")
                  ?.toJSON() as any;
                console.clear();
                console.log('⚡ Live Update')
                local.render();
              }
            }
          });
          resolve(local.page);
          break;
        case "sv_local":
          sendDoc({ local, bin: extract(msg.sv_local), msg });
          break;
        case "svd_remote":
          sendDoc({ local, bin: extract(msg.diff_remote), msg });
          break;
        case "diff_local":
          if (msg.mode === "page") {
            Y.applyUpdate(local.page as any, extract(msg.diff_local), "remote");
          }
          break;
        case "undo":
        case "redo":
        case "new_comp":
        case "get_comp":
        case "set_comp":
          console.log(msg);
      }
    });
    ws.addEventListener("open", () => {
      local.retry.disabled = false;
      ws.send(
        JSON.stringify({
          type: "get_page",
          page_id,
        } as WS_MSG_GET_PAGE)
      );
    });
  }
};

const extract = (str: string) => {
  return Uint8Array.from(
    decompress(str)
      .split(",")
      .map((x) => parseInt(x, 10))
  );
};

const sendDoc = async (arg: {
  bin: Uint8Array;
  msg: {
    id: string;
    mode: string;
    type: string;
  };
  local: typeof PageLocal;
}) => {
  const { bin, msg, local } = arg;
  const { id, mode, type } = msg;

  let doc = null as any;
  if (mode === "page") doc = local.page;
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
  await wsend(local, JSON.stringify(sendmsg));
};

const wsend = async (local: typeof PageLocal, payload: string) => {
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
