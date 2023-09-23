import { createId } from "@paralleldrive/cuid2";
import { produceCSS } from "../../../utils/css/gen";
import { IContent, MContent } from "../../../utils/types/general";
import { MItem } from "../../../utils/types/item";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { fillID } from "../../editor/tools/fill-id";
import { newMap } from "../../editor/tools/yjs-tools";
import { instantiateComp, loadComponent } from "./comp";
import { ItemMeta, PG } from "./global";

export const rebuildTree = async (p: PG, _: { note: string }) => {
  if (!p.mpage) {
    console.warn("MPage not loaded");
  }

  if (p.mpage) {
    p.treeMeta = {};
    const mpage = p.mpage.getMap("map").get("content_tree");
    await mpage?.doc?.transact(async () => {
      await Promise.all(
        mpage?.get("childs")?.map(async (mitem, idx) => {
          await walk(p, {
            mitem,
            parent_id: "root",
            idx,
          });
        }) || []
      );
    });

    p.render();
  }
};

const walk = async (
  p: PG,
  val: {
    item?: IContent;
    mitem?: MContent;
    parent_id: string;
    idx: number;
    parent_comp?: ItemMeta["parent_comp"];
  }
) => {
  let item = val.item as IContent;
  let mitem = val.mitem;

  if (val.mitem) {
    if (val.parent_comp) {
      try {
        const child_ids = val.parent_comp.comp.child_ids;
        item = fillID(val.mitem.toJSON() as any, (e) => {
          if (child_ids[e.id]) {
            e.originalId = e.id;
            e.id = child_ids[e.id];
          }
          return false;
        }) as any;
      } catch (e) {
        return;
      }
    } else {
      item = val.mitem.toJSON() as any;
    }
  }

  if (val.parent_comp) {
    const pchild_ids = val.parent_comp.comp?.child_ids;

    if (pchild_ids && item.originalId) {
      if (pchild_ids[item.originalId]) {
        item.id = pchild_ids[item.originalId];
      }
    }
  }

  if (item) {
    let comp: ItemMeta["comp"] = undefined as any;

    if (item.type === "item" && item.component?.id) {
      comp = {
        id: item.component.id,
        child_ids: {},
        mcomp: p.comps.doc[item.component.id]
          ?.getMap("map")
          .get("content_tree"),
      };
    }

    const meta: ItemMeta = {
      mitem: mitem,
      item,
      parent_id: val.parent_id,
      parent_comp: val.parent_comp as any,
      className: produceCSS(item, {
        mode: p.mode,
      }),
      comp,
    };

    p.treeMeta[meta.item.id] = meta;

    if (item.type === "item" && item.component?.id) {
      const cid = item.component.id;
      let doc = p.comps.doc[cid];
      if (!doc) {
        await loadComponent(p, cid);
        doc = p.comps.doc[cid];
      }

      if (doc) {
        const mcomp = doc.getMap("map").get("content_tree") as MItem;
        if (mcomp) {
          if (!p.compInstance[item.id]) {
            p.compInstance[item.id] = {};
          }
          const child_ids = p.compInstance[item.id];
          const itemnew = instantiateComp(p, item, mcomp, child_ids);
          for (const [k, v] of Object.entries(itemnew)) {
            if (k !== "id") (meta.item as any)[k] = v;
          }

          meta.comp = {
            id: cid,
            mcomp,
            child_ids,
          };
        }

        let cprops: [string, FNCompDef][] = Object.entries(
          item.component?.props || {}
        ).sort((a, b) => {
          return a[1].idx - b[1].idx;
        });
        if (mcomp) {
          const mprops = mcomp.get("component")?.get("props");
          const iprops = mitem?.get("component")?.get("props");

          if (mprops && iprops) {
            for (const [name, cprop] of cprops) {
              let mp = mprops.get(name);
              if (mp) {
                const mprop = mp?.toJSON() as FNCompDef;
                const jsx_prop = iprops.get(name);

                if (jsx_prop) {
                  if (mprop.meta?.type === "content-element") {
                    let icontent = jsx_prop.get("content");

                    if (!icontent) {
                      jsx_prop.set(
                        "content",
                        newMap({
                          id: createId(),
                          name: name,
                          type: "item",
                          dim: { w: "full", h: "full" },
                          childs: [],
                          adv: {
                            css: "",
                          },
                        }) as any
                      );
                    }

                    if (icontent)
                      await walk(p, {
                        item: cprop.content,
                        mitem: icontent,
                        parent_id: item.id,
                        parent_comp: val.parent_comp,
                        idx: mprop.idx,
                      });
                  }
                }
              }
            }
          }
        }
        await Promise.all(
          item.childs.map(async (child, idx) => {
            if (meta.comp && meta.comp.mcomp) {
              return await walk(p, {
                item: child,
                parent_comp: meta as any,
                mitem: meta.comp.mcomp.get("childs")?.get(idx),
                parent_id: item.id,
                idx,
              });
            }
          })
        );
      }
    } else {
      if (item.type !== "text" && Array.isArray(item.childs)) {
        await Promise.all(
          item.childs.map(async (child, idx) => {
            return await walk(p, {
              idx,
              item: child,
              parent_comp: val.parent_comp,
              mitem: mitem?.get("childs")?.get(idx) as MContent,
              parent_id: item.id || "",
            });
          })
        );
      }
    }
  }
};
