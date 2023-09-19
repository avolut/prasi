import { createId } from "@paralleldrive/cuid2";
import { IContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { FNComponent } from "../../../utils/types/meta-fn";
import { PRASI_COMPONENT } from "../../../utils/types/render";
import { IRoot } from "../../../utils/types/root";
import { WS_MSG_GET_COMP } from "../../../utils/types/ws";
import { fillID } from "../tools/fill-id";
import { PG } from "./global";
import { rebuildTree, updateComponentInTree } from "./tree-logic";
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
      if (p.status !== "tree-rebuild") {
        await updateComponentInTree(p, comp.id);
      }
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

export const closeEditComp = (p: PG) => {
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

  rebuildTree(p, { mode: "update" });
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
        rebuildTree(p, { mode: "update" });

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

export const instantiateComp = async (
  p: PG,
  item: IItem,
  mcomp: MItem,
  child_ids: Record<string, string>
) => {
  const comp = item.component as FNComponent;

  let nitem = {};
  nitem = fillID(mcomp.toJSON() as any, (i) => {
    if (!i.originalId) {
      i.originalId = i.id;
    }
    const newid = createId();
    child_ids[i.id] = newid;
    i.id = newid;

    if (p.item.activeOriginalId === i.originalId) {
      p.item.active = newid;
    }

    return false;
  }) as IItem;
  return { ...nitem, id: item.id, component: comp } as IItem;
};
