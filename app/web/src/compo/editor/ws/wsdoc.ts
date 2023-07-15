import { component_group, site } from "dbgen";
import { CEGlobal } from "../../../base/global/content-editor";
import { component } from "../../page/component";
import { PrasiAPI } from "../../types/general";
import { WS_MSG_DIFF_LOCAL, WS_MSG_REDO, WS_MSG_UNDO } from "./msg";

export type SiteConfig = {
  api_url?: string;
  prasi?: {
    port: number;
    dburl: string;
  };
};
export const wsdoc = {
  site: null as
    | (Omit<site, "config"> & {
        config: SiteConfig;
      })
    | null,
  page_id: "",
  mode: "desktop" as "mobile" | "desktop",
  compGroup: {} as Record<
    string,
    { info: component_group; comps: { id: string; name: string }[] }
  >,
  retry: {
    disabled: false,
    fast: false,
    localIP: false,
  },
  ws: null as null | WebSocket,
  apiDef: { apiEntry: null as any, prismaTypes: {}, apiTypes: "" } as PrasiAPI,
  async wsend(payload: string) {
    const ws = this.ws;
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
  },
  lastTypedTimeestamp: -1,
  session: null as null | Awaited<ReturnType<(typeof api)["session"]>>,
  pendingDiffLocal: [] as WS_MSG_DIFF_LOCAL[],
  page: null as null | (typeof CEGlobal & { render: () => void }),
  compsResolveCallback: {} as Record<string, (changes: string) => void>,
  keyDown: null as null | string,
  undoManager: {
    undo() {
      let sendmsg: WS_MSG_UNDO;

      if (component.edit.show && component.edit.id) {
        sendmsg = {
          type: "undo",
          mode: "comp",
          id: component.edit.id,
        };
        wsdoc.wsend(JSON.stringify(sendmsg));
      } else {
        sendmsg = {
          type: "undo",
          mode: "page",
          id: wsdoc.page?.doc.getMap("map").get("id") || "",
        };
        wsdoc.wsend(JSON.stringify(sendmsg));
      }
    },
    redo() {
      let sendmsg: WS_MSG_REDO;
      if (component.edit.show && component.edit.id) {
        sendmsg = {
          type: "redo",
          mode: "comp",
          id: component.edit.id,
        };
        wsdoc.wsend(JSON.stringify(sendmsg));
      } else {
        sendmsg = {
          type: "redo",
          mode: "page",
          id: wsdoc.page?.doc.getMap("map").get("id") || "",
        };
        wsdoc.wsend(JSON.stringify(sendmsg));
      }
    },
  },
};
