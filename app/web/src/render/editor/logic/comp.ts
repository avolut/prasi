import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { PRASI_COMPONENT } from "../../../utils/types/render";
import { IRoot } from "../../../utils/types/root";
import { WS_MSG_GET_COMP } from "../../../utils/types/ws";
import { fillID } from "../tools/fill-id";
import { PG } from "./global";
import { wsend } from "./ws";

export const newPageComp = (p: PG, item: IItem) => {
  if (item.component?.id) {
    if (!p.comps.doc[item.component.id]) {
      console.error("Component Not Found: ", item.component.id);
      return null;
    }

    const comp = p.comps.doc[item.component.id].getMap("map").toJSON();
    if (comp && comp.content_tree) {
      const citem = fillID(comp.content_tree) as IItem;

      const nitem = {
        ...item,
        ...citem,
        id: item.id,
        component: {
          id: citem.component?.id || "",
          name: citem.component?.name || "",
          props: {
            ...citem.component?.props,
            ...item.component?.props,
          },
        },
      };

      return nitem as IItem;
    }
  }
};

export const scanComponent = (
  item: IRoot | IContent,
  componentIDS?: Set<string>
) => {
  const ids = componentIDS || new Set();

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

  if (item.type !== "text") {
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
  await Promise.all(
    [...compIds]
      .filter((id) => {
        if (!p.comps.doc[id] && !p.comps.pending[id]) return true;
        return false;
      })
      .map(async (id) => {
        const res = await loadSingleComponent(p, id);
        await loadComponent(p, res.content_tree);
        return res;
      })
  );
};

const loadSingleComponent = (p: PG, comp_id: string) => {
  return new Promise<PRASI_COMPONENT>(async (resolve) => {
    p.comps.pending[comp_id] = resolve;
    await wsend(
      p,
      JSON.stringify({
        type: "get_comp",
        comp_id: comp_id,
      } as WS_MSG_GET_COMP)
    );
  });
};

export const editComp = (p: PG, item: IContent) => {
  if (item.type === "item" && item.component) {
    const cid = item.component.id;
    let doc = p.comps.doc[cid];
    if (doc) {
      const map = doc.getMap("map");

      const foundIdx = p.compEdits.findIndex((c) => {
        if (c.id === item.component?.id) return true;
      });
      if (foundIdx < 0) {
        p.compEdits.push(item);
      }
      p.comp = {
        id: map.get("id") || "",
        content_tree: map.get("content_tree") as any,
        props: map.get("props") as any,
      };
      p.render();
    }
  }
};
