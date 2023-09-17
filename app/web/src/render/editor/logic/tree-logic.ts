import { IContent, MContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { newMap } from "../tools/yjs-tools";
import { instantiateComp, loadComponent } from "./comp";
import { ItemMeta, PG } from "./global";
import { treePropEval } from "./tree-prop";

export const updateComponentInTree = async (p: PG, comp_id: string) => {
  const doc = p.comps.doc[comp_id];
  if (p.compInstance[comp_id] && doc) {
    const mcomp = doc.getMap("map").get("content_tree");
    if (mcomp) {
      const promises: Promise<void>[] = [];
      p.compInstance[comp_id].forEach((meta) => {
        promises.push(
          new Promise<void>(async (done) => {
            if (meta.comp && meta.mitem && meta.item) {
              meta.comp.item = await instantiateComp(
                meta.item as IItem,
                meta.mitem as MItem,
                mcomp
              );
              const mprops = meta.mitem.get("component")?.get("props");
              if (mprops) {
                let idx = 0;
                const cprops = mcomp
                  .get("component")
                  ?.get("props")
                  ?.toJSON() as Record<string, FNCompDef>;
                for (const [key, prop] of Object.entries(cprops)) {
                  let mprop = mprops.get(key);
                  if (!mprop) {
                    mprops.set(key, newMap(prop) as any);
                    mprop = mprops.get(key);
                  }
                  if (mprop && prop.meta?.type === "content-element") {
                    const content = mprop.get("content");
                    if (content) {
                      walk(
                        p,
                        { mitem: content, parent_id: meta.item.id },
                        { idx: idx++, parent_id: meta.item.id }
                      );
                    }
                  }
                }
              }
            }
            done();
          })
        );
      });
      await Promise.all(promises);
      p.render();
    }
  }
};

export const rebuildTree = async (p: PG, render?: () => void) => {
  p.status = "tree-rebuild";
  const _render = () => {
    if (render) {
      render();
    } else {
      p.render();
    }
  };
  _render();

  p.compInstance = {};
  p.treeMeta = {};
  p.treeFlat = [];

  if (p.comp?.id) {
    const cid = p.comp?.id;
    if (!p.comps.doc[cid]) {
      await loadComponent(p, cid);
    }
    const mitem = p.comps.doc[cid].getMap("map").get("content_tree") as MItem;
    await walk(p, { mitem, parent_id: "root" }, { parent_id: "root", idx: 0 });
  } else if (p.mpage) {
    await Promise.all(
      p.mpage
        .getMap("map")
        .get("content_tree")
        ?.get("childs")
        ?.map(async (mitem, idx) => {
          await walk(
            p,
            { mitem, parent_id: "root" },
            { parent_id: "root", idx }
          );
        }) || []
    );
  }

  p.status = "ready";
  _render();
};

const walk = async (
  p: PG,
  val: { mitem?: MContent; item?: IContent; parent_id: string },
  flat?: { idx: number; parent_id: string }
) => {
  const item = val.mitem ? (val.mitem.toJSON() as IContent) : val.item;
  if (item) {
    const mitem = val.mitem;

    let comp: ItemMeta["comp"] = undefined;
    if (item.type === "item" && item.component?.id) {
      const cid = item.component.id;
      if (cid !== p.comp?.id) {
        let doc = p.comps.doc[cid];

        if (!doc) {
          if (!p.comps.pending[cid]) {
            await loadComponent(p, cid);
          }

          if (p.comps.pending[cid]) await p.comps.pending[cid];
          doc = p.comps.doc[cid];
        }

        if (doc) {
          const mcomp = doc.getMap("map").get("content_tree") as MItem;

          comp = {
            id: cid,
            mcomp,
            item: await instantiateComp(item, mitem as MItem, mcomp),
          };
        }
      }
    }

    const meta: ItemMeta = {
      mitem: mitem,
      item,
      parent_id: val.parent_id,
      comp,
    };

    let cprops: [string, FNCompDef][] = [];

    if (comp) {
      const props = comp.mcomp
        .get("component")
        ?.get("props")
        ?.toJSON() as Record<string, FNCompDef>;

      cprops = Object.entries(props).sort((a, b) => {
        return a[1].idx - b[1].idx;
      });

      await treePropEval(p, meta, cprops);

      if (!p.compInstance[comp.id]) {
        p.compInstance[comp.id] = new Set();
      }
      p.compInstance[comp.id].add(meta);
    }

    p.treeMeta[meta.item.id] = meta;
    if (flat) {
      p.treeFlat.push({
        data: { meta, idx: flat.idx },
        id: meta.item.id,
        parent: flat.parent_id,
        text: item.name,
      });
    }

    if (mitem) {
      if (comp) {
        // jsx prop as child in tree
        const mprops = mitem.get("component")?.get("props");
        if (mprops) {
          let idx = 0;
          for (const [key, prop] of cprops) {
            let mprop = mprops.get(key);
            if (!mprop) {
              mprops.set(key, newMap(prop) as any);
              mprop = mprops.get(key);
            }
            if (mprop && prop.meta?.type === "content-element") {
              const content = mprop.get("content");
              if (content) {
                walk(
                  p,
                  { mitem: content, parent_id: item.id },
                  { idx: idx++, parent_id: item.id }
                );
              }
            }
          }
        }

        if (comp.item) {
          for (const child of comp.item.childs) {
            // only add to treeMeta, not treeFlat
            walk(p, { item: child, parent_id: comp.item.id });
          }
        }
      } else {
        mitem.get("childs")?.forEach((child, idx) => {
          walk(
            p,
            { mitem: child, parent_id: item.id },
            { idx, parent_id: item.id }
          );
        });
      }
    } else if (item && item.type !== "text") {
      for (const child of item.childs) {
        walk(p, { item: child, parent_id: item.id });
      }
    }
  }
};
