import { produceCSS } from "../../../utils/css/gen";
import { IContent, MContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { createElProp } from "../elements/e-relprop";
import { DefaultScript } from "../panel/script/monaco/monaco-element";
import { newMap } from "../tools/yjs-tools";
import { instantiateComp, loadComponent } from "./comp";
import { ItemMeta, PG } from "./global";
export type REBUILD_MODE = "update" | "reset";

const DEBUG = false;
const DEBUG_MAX_ITEM: number = 9999;
const DEBUG_MIN_ITEM: number = 0;

let DEBUG_CUR_IDX = 0;
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
  }
  p.treeFlat = [];

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

    if (p.comp && p.treeFlat.length === 0) {
      if (!p.comps.pending[p.comp.id]) {
        p.comp = null;
        localStorage.removeItem(`prasi-comp-active-id`);
        localStorage.removeItem(`prasi-comp-instance-id`);
        localStorage.removeItem(`prasi-comp-active-last`);
        localStorage.removeItem(`prasi-comp-active-props`);
        await rebuildTree(p, opt);
      }
    }
  }

  p.status = "ready";
  _render();
};

const walk = async (
  p: PG,
  mode: REBUILD_MODE,
  val: {
    mitem?: MContent;
    item?: IContent;
    minstance?: MItem;
    parent_id: string;
    depth?: number;
    idx?: number;
    includeTree?: boolean;
  }
) => {
  let item = val.item as IContent;
  let mitem = val.mitem;

  if (val.mitem && !val.item) {
    item = val.mitem.toJSON() as any;
  }

  if (mitem) {
    const mcomp = mitem.get("component");
    if (mcomp) {
      if ((mcomp as any).get("child_ids")) {
        (mcomp as any).delete("child_ids");
      }
    }
  }

  if (item) {
    let comp: ItemMeta["comp"] = undefined;

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
          if (mode === "reset" || !p.treeMeta[item.id]) {
            const child_ids: any = {};
            const icomps = await instantiateComp(p, item, mcomp, child_ids);

            comp = {
              id: cid,
              mcomp,
              item: icomps,
              child_ids,
            };
          } else {
            comp = p.treeMeta[item.id].comp;
          }
        }
      }
    }

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
      depth: val.depth || 0,
      elprop: createElProp(comp ? comp.item : item, p),
      className: produceCSS(comp ? comp.item : item, {
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

    if (mode === "reset") {
      p.treeMeta[meta.item.id] = meta;
    }

    if (DEBUG) {
      DEBUG_CUR_IDX++;
      if (DEBUG_CUR_IDX >= DEBUG_MIN_ITEM && DEBUG_CUR_IDX <= DEBUG_MAX_ITEM) {
        const args = [
          (".".repeat(val.depth || 0) + item.name).padEnd(30, "_") +
            (item.adv?.js ? "* " : "_ ") +
            item.id,
        ].join(" ");

        if (comp) {
          console.log("%c" + args, "color:red", `⤴ ${val.parent_id}`);
        } else {
          console.log(args, `⤴ ${val.parent_id}`);
        }
      }
    }

    if (comp && comp.item) {
      if (!val.includeTree && p.comp && p.comp.instance_id === comp.item.id) {
        p.treeFlat.push({
          parent: "root",
          data: { meta, idx: 0 },
          id: meta.item.id,
          text: item.name,
        });
        val.includeTree = true;
      } else if (val.includeTree) {
        p.treeFlat.push({
          parent: val.parent_id,
          data: { meta, idx: val.idx || 0 },
          id: meta.item.id,
          text: item.name,
        });
        val.includeTree = false;
      }

      await Promise.all(
        comp.item.childs.map((child, idx) => {
          if (comp) {
            walk(p, mode, {
              item: child,
              mitem: comp.mcomp.get("childs")?.get(idx),
              parent_id: comp.item.id,
              depth: (val.depth || 0) + 1,
              includeTree: val.includeTree,
            });
          }
        })
      );
    } else if (item) {
      if (val.includeTree) {
        p.treeFlat.push({
          parent: val.parent_id,
          data: { meta, idx: val.idx || 0 },
          id: meta.item.id,
          text: item.name,
        });
      }

      if (item.type !== "text") {
        await Promise.all(
          item.childs.map((child, idx) =>
            walk(p, mode, {
              idx,
              item: child,
              mitem: mitem?.get("childs")?.get(idx) as MContent,
              parent_id: item.id || "",
              depth: (val.depth || 0) + 1,
              includeTree: val.includeTree,
            })
          )
        );
      }
    }
  }
};

// let cprops: [string, FNCompDef][] = [];
// const mcomp = p.comps.doc[comp.id].getMap("map").get("content_tree");
// if (mcomp) {
//   const mprops = mcomp.get("component")?.get("props");
//   if (mprops) {
//     let idx = 0;
//     for (const [key, prop] of cprops) {
//       let mprop = mprops.get(key);
//       if (!mprop) {
//         mprops.set(key, newMap(prop) as any);
//         mprop = mprops.get(key);
//       }
//       if (mprop && prop.meta?.type === "content-element") {
//         let content = mprop.get("content");

//         if (!content) {
//           mprop.set(
//             "content",
//             newMap({
//               id: createId(),
//               name: key,
//               type: "item",
//               dim: { w: "full", h: "full" },
//               childs: [],
//               adv: {
//                 css: "",
//               },
//             }) as any
//           );
//           content = mprop.get("content");
//         }

//         if (content) {
//           await walk(
//             p,
//             mode,
//             {
//               mitem: content,
//               parent_id: item.id,
//               depth: (val.depth || 0) + 1,
//             },
//             flat ? { idx: idx++, parent_id: item.id } : undefined
//           );
//         }
//       }
//     }
//   }
// }

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
                      walk(p, "reset", {
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
