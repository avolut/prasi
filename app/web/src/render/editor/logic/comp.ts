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
    const res = await loadSingleComponent(p, itemOrID);
    tree = res.content_tree;
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
  return new Promise<PRASI_COMPONENT>(async (resolve) => {
    p.comps.pending[comp_id] = (comp: PRASI_COMPONENT) => {
      updateComponentInTree(p, comp.id);
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
};

export const editComp = (p: PG, _item: IContent) => {
  const item = p.treeMeta[_item.id].item;
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
            last: [{ active_id: item.id }],
            props: map.component.props,
          };
        } else {
          if (!p.comp.last) p.comp.last = [];
          p.comp.last.push({
            active_id: p.item.active,
            comp_id: p.comp.id,
            props: p.comp.props,
          });

          p.comp.id = cid;
          p.comp.props = map.component.props;
        }
        p.item.active = map.id;
        rebuildTree(p);

        localStorage.setItem("prasi-item-active-id", p.item.active);
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

export const instantiateComp = async (item: IItem, mcomp: MItem) => {
  const comp = item.component as FNComponent;
  
  if (!comp.child_ids) {
    comp.child_ids = {};
  }

  const ids = comp.child_ids;

  const nitem = fillID(mcomp.toJSON() as any, (i) => {
    if (ids[i.id]) {
      i.id = ids[i.id];
    } else {
      const newid = createId();
      ids[i.id] = newid;
      i.id = newid;
    }
    return false;
  }) as IItem;

  return { ...nitem, ...item, name: nitem.name, childs: nitem.childs };
};
