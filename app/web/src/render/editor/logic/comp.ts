import { createId } from "@paralleldrive/cuid2";
import * as Y from "yjs";
import { IContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { FNCompDef, FNComponent } from "../../../utils/types/meta-fn";
import { PRASI_COMPONENT } from "../../../utils/types/render";
import { IRoot } from "../../../utils/types/root";
import { WS_MSG_GET_COMP } from "../../../utils/types/ws";
import { fillID } from "../tools/fill-id";
import { ItemMeta, PG } from "./global";
import { rebuildTree } from "./tree-logic";
import { wsend } from "./ws";

export const scanComponent = (
  item: IRoot | IContent,
  componentIDS?: Set<string>
) => {
  const ids = componentIDS || new Set();
  if (!item) return ids;

  if (item.type === "item" && item.component?.id) {
    ids.add(item.component.id);

    if (item.component.props) {
      for (const p of Object.values(item.component.props)) {
        if (p.meta?.type === "content-element" && p.content) {
          scanComponent(p.content, ids);
        }
      }
    }
  }

  if (item.type !== "text" && item.childs) {
    for (const c of item.childs) {
      scanComponent(c, ids);
    }
  }
  return ids;
};

export const loadComponent = async (
  p: PG,
  itemOrID: string | IRoot | IContent
) => {
  const compIds = new Set<string>();
  let tree: IRoot | IContent = null as any;
  if (typeof itemOrID !== "string") {
    tree = itemOrID;
  } else {
    if (!!p.comps.pending[itemOrID]) {
      await p.comps.pending[itemOrID];
    } else {
      loadSingleComponent(p, itemOrID);
      const res = await p.comps.pending[itemOrID];
      tree = res.content_tree;
    }
  }

  scanComponent(tree, compIds);
  const promises = [...compIds]
    .filter((id) => {
      if (!p.comps.doc[id] && !p.comps.pending[id]) return true;
      return false;
    })
    .map(async (id) => {
      const res = await loadSingleComponent(p, id);
      await loadComponent(p, res.content_tree);
      return res;
    });

  if (promises.length > 0) {
    await Promise.all(promises);
  }
};

const loadSingleComponent = (p: PG, comp_id: string) => {
  p.comps.pending[comp_id] = new Promise<PRASI_COMPONENT>(async (resolve) => {
    p.comps.resolve[comp_id] = async (comp: PRASI_COMPONENT) => {
      resolve(comp);
    };
    await wsend(
      p,
      JSON.stringify({
        type: "get_comp",
        comp_id: comp_id,
      } as WS_MSG_GET_COMP)
    );
  });
  return p.comps.pending[comp_id];
};

export const closeEditComp = async (p: PG) => {
  if (p.comp) {
    const cur = p.comp.last ? p.comp.last.pop() : null;
    if (cur) {
      if (cur.props) {
        p.comp.props = cur.props;
      } else {
        p.comp.props = {};
      }
      p.item.active = cur.active_id;
      p.item.activeOriginalId = cur.active_oid || "";
      localStorage.setItem("prasi-item-active-id", p.item.active);
      localStorage.setItem("prasi-item-active-oid", p.item.activeOriginalId);

      if (cur.instance_id) {
        p.comp.instance_id = cur.instance_id;
      }

      if (cur.comp_id) {
        p.comp.id = cur.comp_id;
        localStorage.setItem(
          "prasi-comp-instance-id",
          p.comp.instance_id || ""
        );
        localStorage.setItem(`prasi-comp-active-id`, p.comp.id);
        localStorage.setItem(
          `prasi-comp-active-last`,
          JSON.stringify(p.comp.last)
        );
        localStorage.setItem(
          `prasi-comp-active-props`,
          JSON.stringify(p.comp.props)
        );
      } else {
        p.comp = null;
      }
    } else {
      p.comp = null;
    }

    if (!p.comp) {
      localStorage.removeItem(`prasi-comp-active-id`);
      localStorage.removeItem(`prasi-comp-instance-id`);
      localStorage.removeItem(`prasi-comp-active-last`);
      localStorage.removeItem(`prasi-comp-active-props`);
    }
  }

  await rebuildTree(p, { mode: "update", note: "close-edit-comp" });
};

export const editCompByMeta = (p: PG, meta: ItemMeta) => {
  if (meta.parent_comp && p.comp?.id !== meta.parent_comp.comp.id) {
    if (!p.comp) {
      p.comp = {
        id: meta.parent_comp.comp.id,
        instance_id: meta.parent_comp.item.id,
        last: [{ active_id: "", active_oid: "" }],
        props: meta.parent_comp.item.component?.props || {},
      };
    } else {
      p.comp.last.push({
        active_id: p.item.active,
        active_oid: p.item.activeOriginalId,
        instance_id: p.comp.instance_id,
        comp_id: p.comp.id,
        props: p.comp.props,
      });

      p.comp.id = meta.parent_comp.comp.id;
      p.comp.instance_id = meta.parent_comp.item.id;
      p.comp.props = meta.parent_comp.item.component?.props || {};
    }
    rebuildTree(p, { mode: "update", note: "click-comp-meta" });
  }
};

export const editComp = (p: PG, id: string) => {
  const item = p.treeMeta[id].item;
  if (item && item.type === "item" && item.component) {
    const cid = item.component.id;
    let doc = p.comps.doc[cid];
    if (doc) {
      const map = doc.getMap("map").get("content_tree")?.toJSON() as IItem;
      if (map && map.component) {
        map.component.props = {
          ...map.component.props,
          ...item.component.props,
        };

        if (!p.comp) {
          p.comp = {
            id: cid,
            instance_id: item.id,
            last: [{ active_id: item.id, active_oid: item.originalId }],
            props: map.component.props,
          };
        } else {
          if (!p.comp.last) p.comp.last = [];
          p.comp.last.push({
            active_id: p.item.active,
            active_oid: p.item.activeOriginalId,
            instance_id: p.comp.instance_id,
            comp_id: p.comp.id,
            props: p.comp.props,
          });

          p.comp.id = cid;
          p.comp.instance_id = item.id;
          p.comp.props = map.component.props;
        }
        p.item.active = p.comp.instance_id || "";
        rebuildTree(p, { mode: "update", note: "edit-comp" });

        localStorage.setItem("prasi-item-active-id", p.item.active);
        localStorage.setItem("prasi-item-active-oid", p.item.activeOriginalId);
        localStorage.setItem("prasi-comp-instance-id", item.id);
        localStorage.setItem("prasi-comp-active-id", p.comp.id);
        localStorage.setItem(
          "prasi-comp-active-last",
          JSON.stringify(p.comp.last)
        );
        localStorage.setItem(
          "prasi-comp-active-props",
          JSON.stringify(p.comp.props)
        );
      }
    }
  }
};

export const instantiateComp = (
  p: PG,
  item: IItem,
  mcomp: MItem,
  child_ids: Record<string, string>
) => {
  const comp = item.component as FNComponent;
  let mprops = mcomp.get("component")?.get("props")?.toJSON() as Record<
    string,
    FNCompDef
  >;

  if (!mprops) {
    mcomp.get("component")?.set("props", new Y.Map() as any);
    mprops = mcomp.get("component")?.get("props")?.toJSON() as any;
  }

  let nitem = {};
  nitem = fillID(mcomp.toJSON() as any, (i) => {
    if (!i.originalId) {
      i.originalId = i.id;
    }
    let newid = i.id;
    if (child_ids[i.originalId]) {
      newid = child_ids[i.originalId];
    } else {
      newid = createId();
    }

    i.id = newid;
    child_ids[i.originalId] = newid;

    return false;
  }) as IItem;

  const props: any = {};
  for (const [k, v] of Object.entries(mprops)) {
    props[k] = v;
    if (comp.props[k]) {
      props[k].value = comp.props[k].value;
      props[k].valueBuilt = comp.props[k].valueBuilt;
      props[k].content = comp.props[k].content;
    }
  }

  return {
    ...nitem,
    id: item.id,
    originalId: item.originalId || (nitem as IItem).originalId,
    component: { ...comp, props },
  } as IItem;
};
