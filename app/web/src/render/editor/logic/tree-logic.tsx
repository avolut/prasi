import { createId } from "@paralleldrive/cuid2";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { produceCSS } from "../../../utils/css/gen";
import { IContent, MContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { FNAdv, FNCompDef } from "../../../utils/types/meta-fn";
import { IText } from "../../../utils/types/text";
import { createElProp } from "../elements/e-relprop";
import { DefaultScript } from "../panel/script/monaco/monaco-el";
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
  if (p.pendingRebuild || p.focused) {
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
  // console.log("rebuild", mode);

  if (mode === "reset") {
    p.treeMeta = {};
    p.compInstance = {};
  }

  p.treeFlatTemp = [];

  if (p.mpage) {
    if (DEBUG) {
      DEBUG_CUR_IDX = 0;
      console.clear();
    }
    const mpage = p.mpage.getMap("map").get("content_tree");

    await mpage?.doc?.transact(async () => {
      let parent_id = "root";
      let includeTree = p.comp?.id ? false : true;

      const pageName = p.mpage?.getMap("map").get("name") as string;

      if (
        p.layout.section &&
        p.layout.content &&
        !pageName.startsWith("layout:")
      ) {
        await walk(p, mode, {
          item: p.layout.section,
          parent_id: "root",
          depth: 0,
          idx: 0,
          includeTree: false,
        });

        parent_id = p.layout.content.id;
        p.layout.content.type = "item";
        if (p.layout.content.type === "item")
          p.layout.content.childs = (p.page?.content_tree.childs ||
            []) as unknown as IItem[];
      }

      await Promise.all(
        mpage?.get("childs")?.map(async (mitem) => {
          await walk(p, mode, {
            mitem,
            parent_id,
            depth: 0,
            idx: 0,
            includeTree,
          });
        }) || []
      );
    });
    p.treeFlat = p.treeFlatTemp;

    const root = p.treeFlat.find((e) => e.parent === "root");
    if (
      p.comp &&
      root &&
      p.comp.id === root.data.meta.comp?.id &&
      p.comp.instance_id !== root.data.meta.item.id
    ) {
      p.comp.instance_id = root.id;
    }
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
    parent_prop?: ItemMeta;
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
            e.originalId = e.id;
            e.id = child_ids[e.id];
          }
          return false;
        }) as any;
      } catch (e) {
        return;
      }
    } else if (val.mitem && val.mitem.toJSON) {
      item = val.mitem.toJSON() as any;
    } else {
      delete val.mitem;
    }
  }

  if (val.parent_comp) {
    const pchild_ids = val.parent_comp.comp?.child_ids;
    if (pchild_ids && item.originalId) {
      if (pchild_ids[item.originalId]) {
        const walkInner = (item: IItem | IText) => {
          if (item.originalId) {
            const pid = pchild_ids[item.originalId];
            if (pid) {
              item.id = pid;
            }
          }
          if (item.type === "item") {
            for (const c of item.childs) {
              walkInner(c);
            }
          }
        };
        walkInner(item as any);
      }
    }
  }

  if (item) {
    let comp: ItemMeta["comp"] = undefined as any;

    if (item.type === "item" && item.component?.id) {
      const cid = item.component.id;
      let doc = p.comps.doc[cid];
      if (!doc) {
        if (p.comp?.id === cid) {
          await loadComponent(p, cid);
          doc = p.comps.doc[cid];
        } else {
          loadComponent(p, cid).then(() => {
            rebuildTree(p);
          });
        }
      }

      if (doc) {
        const mcomp = doc?.getMap("map").get("content_tree");
        if (mcomp) {
          if (!p.compInstance[item.id]) {
            p.compInstance[item.id] = {};
          }
          const child_ids = p.compInstance[item.id];
          const itemnew = instantiateComp(p, item, mcomp, child_ids);
          for (const [k, v] of Object.entries(itemnew)) {
            if (k !== "id") (item as any)[k] = v;
          }

          comp = {
            id: cid,
            mcomp,
            child_ids,
          };
        }
      }
    }

    if (item.adv) {
      let m = mitem;
      let _item = item as IItem;

      if (m && !p.script.active) {
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
      depth: val.depth || 0,
      elprop: createElProp(item, p),
      parent_prop: val.parent_prop,
      className: produceCSS(item, {
        mode: p.mode,
        hover: p.item.sideHover ? false : p.item.hover === item.id,
        active: p.item.sideHover ? false : p.item.active === item.id,
      }),
      comp,
    };

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
      if (p.treeMeta[meta.item.id]) {
        for (const [k, v] of Object.entries(meta)) {
          (p.treeMeta[meta.item.id] as any)[k] = v;
        }
      } else {
        p.treeMeta[meta.item.id] = meta;
      }
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
          if (
            !meta.parent_comp ||
            (meta.parent_comp && meta.parent_comp.comp.id === p.comp?.id)
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
      }

      const cid = item.component.id;
      let doc = p.comps.doc[cid];
      if (doc) {
        const mcomp = doc.getMap("map").get("content_tree") as MItem;

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
                    let mcontent = jsx_prop.get("content");

                    let isNew = false;
                    if (!mcontent) {
                      isNew = true;
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
                      mcontent = jsx_prop.get("content");
                    }

                    if (!!mcontent) {
                      const icontent = mcontent.toJSON() as IItem;
                      const adv = icontent.adv as FNAdv;
                      if (
                        Object.keys(icontent).length === 6 &&
                        adv &&
                        adv.js === undefined &&
                        adv.css === "" &&
                        adv.html === undefined &&
                        icontent.childs.length === 0
                      ) {
                        isNew = true;
                      }

                      if (isNew) {
                        const defaultJSX = findDefaultJSX(p, mcontent);
                        if (defaultJSX && mcontent) {
                          syncronize(mcontent as any, defaultJSX);
                        }
                        mcontent = jsx_prop.get("content");
                      }
                      if (mcontent) {
                        await walk(p, mode, {
                          item: mcontent.toJSON() as any,
                          mitem: mcontent,
                          parent_id: item.id,
                          parent_comp: val.parent_comp,
                          parent_prop: meta,
                          idx: mprop.idx,
                          depth: (val.depth || 0) + 1,
                          includeTree: p.comp?.id !== item.component?.id,
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
            if (meta.comp && meta.comp.mcomp) {
              return await walk(p, mode, {
                item: child,
                parent_comp: meta as any,
                mitem: meta.comp.mcomp.get("childs")?.get(idx),
                parent_id: item.id,
                parent_prop: val.parent_prop,
                depth: (val.depth || 0) + 1,
                includeTree: val.includeTree,
                instanceFound: val.instanceFound,
              });
            }
          })
        );
      }
    } else if (item) {
      if (
        val.includeTree &&
        (!meta.parent_comp ||
          (meta.parent_comp && meta.parent_comp.comp.id === p.comp?.id))
      ) {
        if (
          p.treeFlatTemp.length > 0 ||
          (p.treeFlatTemp.length === 0 &&
            (val.parent_id === "root" || item.type === "section"))
        ) {
          let parent = val.parent_id;
          if (
            p.treeFlatTemp.length === 0 &&
            (val.parent_id === "root" || item.type === "section")
          ) {
            parent = "root";
          }
          p.treeFlatTemp.push({
            parent,
            data: { meta, idx: val.idx || 0 },
            id: meta.item.id,
            text: item.name,
          });
        }
      }

      if (item.type !== "text" && Array.isArray(item.childs)) {
        await Promise.all(
          item.childs.map(async (child, idx) => {
            const rmchild = mitem?.get("childs")?.get(idx);
            const mchild = rmchild instanceof Y.Map ? rmchild : undefined;
            return await walk(p, mode, {
              idx,
              item: child,
              parent_comp: val.parent_comp,
              mitem: mchild as MContent,
              parent_id: item.id || "",
              parent_prop: val.parent_prop,
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

export const findDefaultJSX = (p: PG, mitem: MItem): IItem => {
  let resetJSXProp: any = false;
  if (mitem && mitem.parent && (mitem.parent as any).get("content")) {
    let name = "";
    (mitem as any).parent.parent.forEach((e: any, k: any) => {
      if (e === mitem.parent) {
        name = k;
      }
    });

    if (name) {
      try {
        const cid = (mitem as any).parent.parent.parent.get("id");
        const comp = p.comps.doc[cid];
        if (comp) {
          const mchilds = comp
            .getMap("map")
            .get("content_tree")
            ?.get("childs")
            ?.toJSON() as IItem[];
          for (const c of mchilds) {
            if (
              c &&
              c.name &&
              c.name.startsWith("jsx:") &&
              c.name.substring(4).trim() === name
            ) {
              c.hidden = false;
              c.name = name;
              c.id = mitem.get("id") || "";
              c.originalId = mitem.get("originalId") || "";
              resetJSXProp = c;
            }
          }
        }
      } catch (e) {}
    }
  }

  return resetJSXProp;
};
