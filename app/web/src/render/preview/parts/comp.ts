import { WS_MSG_GET_COMP } from "../../../compo/editor/ws/msg";
import { fillID } from "../../../compo/page/tools/fill-id";
import { PRASI_COMPONENT } from "../../../compo/renderer/base/renderer-types";
import { IContent } from "../../../compo/types/general";
import { IItem } from "../../../compo/types/item";
import { IRoot } from "../../../compo/types/root";
import { PG } from "./global";
import { wsend } from "./ws";

export const newPageComp = (p: PG, item: IItem) => {
  if (item.component?.id) {
    if (!p.comp.doc[item.component.id]) {
      console.error("Component Not Found: ", item.component.id);
      return null;
    }

    const comp = p.comp.doc[item.component.id].getMap("map").toJSON();
    if (comp && comp.content_tree) {
      const citem = fillID(comp.content_tree) as IItem;

      const nitem = {
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

    for (const p of Object.values(item.component.props)) {
      if (p.meta?.type === "content-element" && p.content) {
        scanComponent(p.content, ids);
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
        if (!p.comp.doc[id] && !p.comp.pending[id]) return true;
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
    p.comp.pending[comp_id] = resolve;
    await wsend(
      p,
      JSON.stringify({
        type: "get_comp",
        comp_id: comp_id,
      } as WS_MSG_GET_COMP)
    );
  });
};
