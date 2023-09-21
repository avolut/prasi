import { produceCSS } from "../../../utils/css/gen";
import { IContent, MContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { FMCompDef, FNCompDef } from "../../../utils/types/meta-fn";
import { createElProp } from "../elements/e-relprop";
import { DefaultScript } from "../panel/script/monaco/monaco-element";
import { fillID } from "../tools/fill-id";
import { newMap } from "../tools/yjs-tools";
import { instantiateComp, loadComponent } from "./comp";
import { ItemMeta, PG, WithRequired } from "./global";
export type REBUILD_MODE = "update" | "reset";

const DEBUG = false;
const DEBUG_MAX_ITEM: number = 3;
const DEBUG_MIN_ITEM: number = 0;

let DEBUG_CUR_IDX = 0;
export const rebuildTree = async (
  p: PG,
  opt?: { render?: () => void; mode?: REBUILD_MODE; note: string }
) => {
  if (p.pendingRebuild) {
    return;
  }
  p.pendingRebuild = true;

  const _render = () => {
    if (opt?.render) {
      opt?.render();
    } else {
      p.render();
    }
  };

  const mode = opt?.mode || "update";

  if (mode === "reset") {
    p.treeMeta = {};
    p.compInstance = {};
    p.treeJSXProp = {};
  }

  p.treeFlatTemp = [];

  if (p.mpage) {
    if (DEBUG) {
      DEBUG_CUR_IDX = 0;
      console.clear();
    }
    const mpage = p.mpage.getMap("map").get("content_tree");
    await mpage?.doc?.transact(async () => {
      await Promise.all(
        mpage?.get("childs")?.map(async (mitem, idx) => {
          await walk(p, mode, {
            mitem,
            parent_id: "root",
            depth: 0,
            idx: 0,
            includeTree: p.comp?.id ? false : true,
          });
        }) || []
      );
    });
    p.treeFlat = p.treeFlatTemp;
  }

  p.pendingRebuild = false;
  _render();
};

export const walk = async (
  p: PG,
  mode: REBUILD_MODE,
  val: {
    mitem?: MContent;
    item?: IContent;
    minstance?: MItem;
    parent_id: string;
    parent_comp?: WithRequired<ItemMeta, "comp"> & { item: IItem };
    jsx_prop?: { name: string; called_by: Set<string>; mprop: FMCompDef };
    depth?: number;
    idx?: number;
    includeTree?: boolean;
    instanceFound?: boolean;
    skip?: boolean;
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

    if (item.adv) {
      let m = mitem;
      let _item = item as IItem;

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
      parent_comp: val.parent_comp as any,
      parent_jsxprop: val.jsx_prop,
      depth: val.depth || 0,
      elprop: createElProp(item, p),
      className: produceCSS(item, {
        mode: p.mode,
        hover: p.item.sideHover ? false : p.item.hover === item.id,
        active: p.item.sideHover ? false : p.item.active === item.id,
      }),
      comp,
    };

    if (comp) {
      if (!p.compInstance[comp.id]) {
        p.compInstance[comp.id] = new Set();
      }
      p.compInstance[comp.id].add(meta);
    }

    if (DEBUG) {
      DEBUG_CUR_IDX++;
      if (DEBUG_CUR_IDX >= DEBUG_MIN_ITEM && DEBUG_CUR_IDX <= DEBUG_MAX_ITEM) {
        const args = [
          DEBUG_CUR_IDX.toString().padEnd(5, ".") +
            (".".repeat(val.depth || 0) + item.name).padEnd(30, "_") +
            (item.adv?.js ? "* " : "_ ") +
            item.id,
        ].join(" ");

        let color = "black";
        if (comp) {
          color = "red";
        }

        console.log(
          "%c" + args,
          `color:${color}`,
          !!p.treeMeta[meta.item.id]?.comp,
          `⤴ ${val.parent_id}`
        );
      }
    }

    if (!val.skip) {
      p.treeMeta[meta.item.id] = meta;
    }

    if (item.type === "item" && item.component?.id) {
      let isRoot = false;
      if (p.comp) {
        if (p.comp.id === item.component.id) {
          if (!val.instanceFound && p.treeFlatTemp.length === 0) {
            p.treeFlatTemp.push({
              parent: "root",
              data: { meta, idx: 0 },
              id: meta.item.id,
              text: item.name,
            });
            isRoot = true;
            val.includeTree = true;
          }

          if (p.comp.instance_id === item.id) {
            p.treeFlatTemp.length = 0;
            p.treeFlatTemp.push({
              parent: "root",
              data: { meta, idx: 0 },
              id: meta.item.id,
              text: item.name,
            });
            isRoot = true;
            val.includeTree = true;
            val.instanceFound = true;
          }
        }
      }

      if (val.includeTree && !isRoot) {
        if (
          p.treeFlatTemp.length > 0 ||
          (p.treeFlatTemp.length === 0 && val.parent_id === "root")
        ) {
          val.includeTree = false;
          p.treeFlatTemp.push({
            parent: val.parent_id,
            data: { meta, idx: val.idx || 0 },
            id: item.id,
            text: item.name,
          });
        }
      }

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
            let child_ids = {};

            if (
              mode === "update" &&
              p.treeMeta[item.id] &&
              p.treeMeta[item.id].comp
            ) {
              const ecomp = p.treeMeta[item.id].comp;
              if (ecomp) child_ids = ecomp.child_ids;
            }

            meta.item = await instantiateComp(p, item, mcomp, child_ids);
            item = meta.item;
            meta.comp = {
              id: cid,
              mcomp,
              child_ids,
            };
          }
        }
      }
      if (p.comp && item.component?.id) {
        if (p.comp?.id !== item.component.id) {
          let cprops: [string, FNCompDef][] = Object.entries(
            item.component?.props || {}
          ).sort((a, b) => {
            return a[1].idx - b[1].idx;
          });
          const mcomp = p.comps.doc[item.component.id]
            .getMap("map")
            .get("content_tree");
          if (mcomp) {
            const mprops = mcomp.get("component")?.get("props");
            const iprops = mitem?.get("component")?.get("props");
            if (mprops && iprops) {
              for (const [key, cprop] of cprops) {
                let mp = mprops.get(key);
                if (mp) {
                  const mprop = mp?.toJSON() as FNCompDef;

                  if (!iprops.get(key)) {
                    iprops.set(key, mp);
                  }

                  const jsx_prop = iprops.get(key);
                  if (jsx_prop) {
                    const icontent = jsx_prop?.get("content");
                    if (mprop.meta?.type === "content-element" && icontent) {
                      await walk(p, mode, {
                        item: cprop.content,
                        mitem: icontent,
                        parent_id: item.id,
                        parent_comp: val.parent_comp,
                        jsx_prop: {
                          name: key,
                          called_by: new Set(),
                          mprop: jsx_prop,
                        },
                        idx: mprop.idx,
                        depth: (val.depth || 0) + 1,
                        includeTree: true,
                        instanceFound: val.instanceFound,
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
      await Promise.all(
        item.childs.map(async (child, idx) => {
          if (meta.comp) {
            return await walk(p, mode, {
              item: child,
              parent_comp: meta as any,
              mitem: meta.comp.mcomp.get("childs")?.get(idx),
              parent_id: item.id,
              jsx_prop: val.jsx_prop,
              depth: (val.depth || 0) + 1,
              includeTree: val.includeTree,
              instanceFound: val.instanceFound,
            });
          }
        })
      );
    } else if (item) {
      if (val.includeTree) {
        if (
          p.treeFlatTemp.length > 0 ||
          (p.treeFlatTemp.length === 0 && val.parent_id === "root")
        ) {
          p.treeFlatTemp.push({
            parent: val.parent_id,
            data: { meta, idx: val.idx || 0 },
            id: meta.item.id,
            text: item.name,
          });
        }
      }

      if (item.type !== "text" && Array.isArray(item.childs)) {
        await Promise.all(
          item.childs.map(async (child, idx) => {
            return await walk(p, mode, {
              idx,
              item: child,
              parent_comp: val.parent_comp,
              mitem: mitem?.get("childs")?.get(idx) as MContent,
              parent_id: item.id || "",
              jsx_prop: val.jsx_prop,
              depth: (val.depth || 0) + 1,
              includeTree: val.includeTree,
              instanceFound: val.instanceFound,
            });
          })
        );
      }
    }
  }
};

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
              meta.item = await instantiateComp(
                p,
                meta.item as IItem,
                mcomp,
                meta.comp.child_ids
              );

              const mprops = meta.mitem.get("component")?.get("props");
              if (mprops) {
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
                      await walk(p, "reset", {
                        mitem: content,
                        parent_id: meta.item.id,
                      });
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
