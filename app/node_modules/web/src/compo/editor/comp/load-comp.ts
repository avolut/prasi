import throttle from "lodash.throttle";
import { compress, decompress } from "lz-string";
import * as Y from "yjs";
import { CompDoc } from "../../../base/global/content-editor";
import { IContent } from "../../types/general";
import { IItem } from "../../types/item";
import { WS_MSG_GET_COMP, WS_MSG_SV_LOCAL } from "../ws/msg";
import { wsdoc } from "../ws/wsdoc";
import { component } from "../../page/component";
import { validate } from "uuid";

export const componentShouldLoad = (item: IContent) => {
  if (item.type === "item") {
    if (item.component && item.component.id) {
      if (typeof component.docs[item.component.id] === "undefined") {
        return true;
      }
    }
  }

  if (item.type !== "text" && item.childs) {
    for (const c of item.childs) {
      if (componentShouldLoad(c)) {
        return true;
      }
    }
  }
  return false;
};

export const loadComponents = async (
  item: IContent,
  comps?: Record<string, CompDoc | null>
) => {
  const _comps = comps || {};

  if (item.type === "item") {
    if (item.component && item.component.id && !_comps[item.component.id]) {
      const compid = item.component.id;
      if (validate(compid)) {
        const changes = await new Promise<string>(async (resolve) => {
          wsdoc.compsResolveCallback[compid] = resolve;
          await wsdoc.wsend(
            JSON.stringify({
              type: "get_comp",
              comp_id: compid,
            } as WS_MSG_GET_COMP)
          );
        });
        if (!changes) {
          _comps[compid] = null;
        } else {
          delete wsdoc.compsResolveCallback[compid];
          const compmsg = Uint8Array.from(
            decompress(changes)
              .split(",")
              .map((x) => parseInt(x, 10))
          );

          const doc = new Y.Doc() as CompDoc;
          Y.applyUpdate(doc as any, compmsg, "remote");

          _comps[compid] = doc;
          doc.on(
            "update",
            throttle(async (e, origin) => {
              if (!origin) {
                const sendmsg: WS_MSG_SV_LOCAL = {
                  type: "sv_local",
                  mode: "comp",
                  id: compid,
                  sv_local: compress(
                    Y.encodeStateVector(doc as any).toString()
                  ),
                };

                await wsdoc.wsend(JSON.stringify(sendmsg));
              }
            }, 300)
          );

          const cmap = doc.getMap("map");
          const ctree = cmap?.get("content_tree")?.toJSON() as IItem;

          await loadComponents(ctree as IItem, _comps);
        }
      }
    }
  }

  if (item.type !== "text") {
    for (const c of item.childs || []) {
      await loadComponents(c, _comps);
    }
  }

  return _comps;
};

export const loadSingleComponent = async (compid: string) => {
  const changes = await new Promise<string>(async (resolve) => {
    wsdoc.compsResolveCallback[compid] = resolve;
    await wsdoc.wsend(
      JSON.stringify({
        type: "get_comp",
        comp_id: compid,
      } as WS_MSG_GET_COMP)
    );
  });
  delete wsdoc.compsResolveCallback[compid];
  const compmsg = Uint8Array.from(
    decompress(changes)
      .split(",")
      .map((x) => parseInt(x, 10))
  );

  const doc = new Y.Doc() as CompDoc;
  Y.applyUpdate(doc as any, compmsg, "remote");

  doc.on(
    "update",
    throttle(async (e, origin) => {
      if (!origin) {
        const sendmsg: WS_MSG_SV_LOCAL = {
          type: "sv_local",
          mode: "comp",
          id: compid,
          sv_local: compress(Y.encodeStateVector(doc as any).toString()),
        };

        await wsdoc.wsend(JSON.stringify(sendmsg));
      }
    }, 300)
  );

  return doc;
};
