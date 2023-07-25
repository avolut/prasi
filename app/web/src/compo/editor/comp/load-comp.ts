import throttle from "lodash.throttle";
import { compress, decompress } from "lz-string";
import { validate } from "uuid";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { CEGlobal, CompDoc } from "../../../base/global/content-editor";
import { component } from "../../page/component";
import { fillID } from "../../page/tools/fill-id";
import { IContent, MContent } from "../../types/general";
import { IItem, MItem } from "../../types/item";
import { MRoot } from "../../types/root";
import { WS_MSG_GET_COMP, WS_MSG_SV_LOCAL } from "../ws/msg";
import { wsdoc } from "../ws/wsdoc";

export const componentShouldLoad = (
  c: typeof CEGlobal,
  item: MItem | MRoot,
  excludeID?: string
) => {
  if (item && item.get) {
    const type = (item as MItem).get("type") as IContent["type"] | "root";
    const id = (item as MItem).get("id");
    if (id && type === "item") {
      const itemComp = (item as MItem).get("component");
      if (itemComp) {
        const compid = itemComp.get("id");
        if (compid && validate(compid)) {
          if (compid !== excludeID) {
            if (!c.instances[id]) return true;

            if (typeof component.docs[compid] === "undefined") {
              return true;
            } else {
              const updatedAt = itemComp.get("updated_at") || 0;
              const comp = component.docs[compid];
              if (comp) {
                const map = comp.getMap("map");
                const compUpdatedAt = new Date(
                  map.get("updated_at") as any
                ).getTime();
                if (compUpdatedAt > updatedAt) {
                  return true;
                }
              }
            }
          }
        }
      }
    }

    const childs = (item as MItem).get("childs");
    if (childs) {
      for (const child of childs) {
        if (componentShouldLoad(c, child, excludeID)) {
          return true;
        }
      }
    }
  }
  return false;
};

export const loadComponents = async (
  item: MContent | undefined,
  resultItems?: MItem[]
) => {
  const _comps = component.docs;
  const _res = resultItems || [];

  if (item) {
    const type = item.get("type");
    if (type === "item") {
      const itemComp = item.get("component");
      if (itemComp) {
        const compid = itemComp.get("id");
        if (compid && validate(compid)) {
          if (!_comps[compid]) {
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
              const doc = loadComponentDoc(changes, compid);
              _comps[compid] = doc;

              const cmap = doc.getMap("map");
              const ctree = cmap?.get("content_tree");

              await loadComponents(ctree);
            }
          }
          _res.push(item as MItem);
        }
      }
    }

    if (type !== "text") {
      for (const c of item.get("childs") || []) {
        await loadComponents(c, _res);
      }
    }
  }
  return _res;
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
  const doc = loadComponentDoc(changes, compid);
  return doc;
};

export const instantiateComp = (c: typeof CEGlobal, item: MItem) => {
  const itemComp = item.get("component");
  if (itemComp) {
    const compid = itemComp.get("id");
    if (compid && validate(compid)) {
      const comp = component.docs[compid];
      const updatedAt = itemComp.get("updated_at") || 0;
      if (comp) {
        const map = comp.getMap("map");
        const id = item.get("id");
        const compUpdatedAt = new Date(map.get("updated_at") as any).getTime();
        if (id) {
          const compjson = fillID(
            map.get("content_tree")?.toJSON() as any
          ) as IItem;

          c.instances[id] = {
            ...compjson,
            id,
            component: {
              id: compjson.component?.id || "",
              name: compjson.component?.name || "",
              props: {
                ...compjson.component?.props,
                ...itemComp.get("props")?.toJSON(),
              },
              updated_at: compUpdatedAt,
            },
          };
          if (compUpdatedAt > updatedAt) {
            syncronize(item as any, {
              id,
              name: item.get("name"),
              childs: [],
              component: {
                id: compid,
                props: itemComp.get("props")?.toJSON() || {},
                updated_at: compUpdatedAt,
              },
              type: item.get("type"),
            });
          }
        }
      }
    }
  }
};

const loadComponentDoc = (changes: string, compid: string) => {
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
