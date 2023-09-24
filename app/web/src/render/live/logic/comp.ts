import { createId } from "@paralleldrive/cuid2";
import { IContent } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { FNCompDef, FNComponent } from "../../../utils/types/meta-fn";
import { PRASI_COMPONENT } from "../../../utils/types/render";
import { IRoot } from "../../../utils/types/root";
import { WS_MSG_GET_COMP } from "../../../utils/types/ws";
import { fillID } from "../../editor/tools/fill-id";
import { PG } from "./global";
import { wsend } from "./ws";
import * as Y from "yjs";

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