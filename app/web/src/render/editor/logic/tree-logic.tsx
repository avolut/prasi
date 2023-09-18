import { produceCSS } from "../../../utils/css/gen";
import { IContent, MContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { createElProp } from "../elements/e-relprop";
import { DefaultScript } from "../panel/script/monaco/monaco-element";
import { newMap } from "../tools/yjs-tools";
import { instantiateComp, loadComponent } from "./comp";
import { ItemMeta, PG } from "./global";

export const updateComponentInTree = async (p: PG, comp_id: string) => {
  if (p.focused) {
    p.pendingRebuild = true;
    return;
  }

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
                        "reset",
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

export type REBUILD_MODE = "update" | "reset";

export const rebuildTree = async (
  p: PG,
  opt?: { render?: () => void; mode?: REBUILD_MODE }
) => {
  if (p.focused) {
    p.pendingRebuild = true;
    return;
  }

  p.status = "tree-rebuild";
  const _render = () => {
    if (opt?.render) {
      opt?.render();
    } else {
      p.render();
    }
  };

  const mode = opt?.mode || "reset";
  if (mode === "reset") {
    p.compInstance = {};
    p.treeMeta = {};
    p.treeFlat = [];
  } else if (mode === "update") {
    p.treeFlat = [];
  }

  if (p.mpage) {
    await Promise.all(
      p.mpage
        .getMap("map")
        .get("content_tree")
        ?.get("childs")
        ?.map(async (mitem, idx) => {
          await walk(
            p,
            mode,
            { mitem, parent_id: "root" },
            { parent_id: "root", idx }
          );
        }) || []
    );

    console.log(p.comp && p.treeFlat.length === 0);
    if (p.comp && p.treeFlat.length === 0) {
      p.comp = null;
      localStorage.removeItem(`prasi-comp-active-id`);
      localStorage.removeItem(`prasi-comp-instance-id`);
      localStorage.removeItem(`prasi-comp-active-last`);
      localStorage.removeItem(`prasi-comp-active-props`);
      await rebuildTree(p, opt);
    }
  }

  p.status = "ready";
  _render();
};

const walk = async (
  p: PG,
  mode: REBUILD_MODE,
  val: { mitem?: MContent; item?: IContent; parent_id: string },
  _flat?: { idx: number; parent_id: string }
) => {
  const item = val.mitem ? (val.mitem.toJSON() as IContent) : val.item;
  if (item) {
    const mitem = val.mitem;

    let comp: ItemMeta["comp"] = undefined;
    if (mitem && item.type === "item" && item.component?.id) {
      const cid = item.component.id;

      let doc = p.comps.doc[cid];

      if (!doc) {
        await loadComponent(p, cid);
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

    if (item.adv) {
      let m = mitem;
      let _item = item as IItem;
      if (comp && p.comp?.id === comp.item.id) {
        m = comp.mcomp;
        _item = comp.item;
      }

      if (m) {
        const adv = m.get("adv");
        if (adv && _item.adv) {
          if (
            typeof _item.adv.js === "string" &&
            _item.adv.js.replace(/\W/gi, "") ===
              DefaultScript.js.replace(/\W/gi, "")
          ) {
            delete _item.adv.js;
            delete _item.adv.jsBuilt;
            adv?.delete("js");
            adv?.delete("jsBuilt");
          }

          if (
            typeof _item.adv.css === "string" &&
            _item.adv.css.replace(/\W/gi, "") ===
              DefaultScript.css.replace(/\W/gi, "")
          ) {
            delete _item.adv.css;
            adv?.delete("css");
          }
        }
      }
    }

    const meta: ItemMeta = {
      mitem: mitem,
      item,
      parent_id: val.parent_id,
      elprop: createElProp(comp ? comp.item : item, p),
      className: produceCSS(comp ? comp.item : item, {
        mode: p.mode,
        hover: p.item.sideHover ? false : p.item.hover === item.id,
        active: p.item.sideHover ? false : p.item.active === item.id,
      }),
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

      if (!p.compInstance[comp.id]) {
        p.compInstance[comp.id] = new Set();
      }
      p.compInstance[comp.id].add(meta);
    }

    p.treeMeta[meta.item.id] = meta;

    let flat = _flat;
    if (p.comp?.id) {
      if (p.treeFlat.length === 0) {
        flat = undefined;
        if (comp && p.comp.instance_id === comp.item.id) {
          p.treeFlat.push({
            data: { meta, idx: 0 },
            id: meta.item.id,
            parent: "root",
            text: item.name,
          });
        }
      } else {
      }
    }

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
                  mode,
                  { mitem: content, parent_id: item.id },
                  flat ? { idx: idx++, parent_id: item.id } : undefined
                );
              }
            }
          }
        }

        if (comp.item) {
          const isEditing = p.comp?.instance_id === item.id;

          if (isEditing) {
            comp.mcomp.get("childs")?.forEach((child, idx) => {
              if (comp) {
                walk(
                  p,
                  mode,
                  { mitem: child, parent_id: comp.item.id },
                  { idx: idx, parent_id: comp.item.id }
                );
              }
            });
          } else {
            for (const child of comp.item.childs) {
              walk(p, mode, { item: child, parent_id: comp.item.id });
            }
          }
        }
      } else {
        mitem.get("childs")?.forEach((child, idx) => {
          walk(
            p,

            mode,
            { mitem: child, parent_id: item.id },
            flat ? { idx, parent_id: item.id } : undefined
          );
        });
      }
    } else if (item && item.type !== "text") {
      for (const child of item.childs) {
        walk(p, mode, { item: child, parent_id: item.id });
      }
    }
  }
};
