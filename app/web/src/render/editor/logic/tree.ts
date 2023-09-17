import { IContent, MContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { newMap } from "../tools/yjs-tools";
import { instantiateComp, loadComponent } from "./comp";
import { ItemMeta, PG } from "./global";

export const updateComponentInTree = (p: PG, comp_id: string) => {
  const doc = p.comps.doc[comp_id];
  if (p.compInstance[comp_id] && doc) {
    const mcomp = doc.getMap("map").get("content_tree");
    if (mcomp) {
      p.compInstance[comp_id].forEach(async (meta) => {
        if (meta.comp) {
          meta.comp.mcomp = await instantiateComp(
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
                  walk(p, content, { idx: idx++, parent_id: meta.item.id });
                }
              }
            }
          }
        }
      });
    }
  }
};

export const rebuildTree = (p: PG, render?: () => void) => {
  p.status = "tree-rebuild";
  if (render) {
    render();
  } else {
    p.render();
  }

  if (p.mpage) {
    p.compInstance = {};
    p.treeMeta = {};
    p.treeFlat = [];
    Promise.all(
      p.mpage
        .getMap("map")
        .get("content_tree")
        ?.get("childs")
        ?.map(async (mitem, idx) => {
          await walk(p, mitem, { parent_id: "root", idx });
        }) || []
    ).then(() => {
      p.status = "ready";
      if (render) {
        render();
      } else {
        p.render();
      }
    });
  }
};

export const rebuildTreeItem = async (p: PG, item_id: string) => {};

const walk = async (
  p: PG,
  mitem: MContent,
  flat?: { idx: number; parent_id: string }
) => {
  const item = mitem.toJSON() as IContent;
  let comp: ItemMeta["comp"] = undefined;
  if (item.type === "item" && item.component?.id) {
    const cid = item.component.id;

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
        mitem: await instantiateComp(item, mitem as MItem, mcomp),
      };
    }
  }

  const meta: ItemMeta = {
    mitem,
    item,
    scope: {},
    script: {},
    comp,
  };

  if (comp) {
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

  if (item.type !== "text") {
    if (comp) {
      const mprops = mitem.get("component")?.get("props");
      if (mprops) {
        let idx = 0;
        const cprops = comp.mcomp
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
              walk(p, content, { idx: idx++, parent_id: item.id });
            }
          }
        }
      }

      comp.mitem.get("childs")?.forEach((child) => {
        walk(p, child);
      });
    } else {
      mitem.get("childs")?.forEach((child, idx) => {
        walk(p, child, { idx, parent_id: item.id });
      });
    }
  }
};
