import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { PRASI_COMPONENT } from "../../../utils/types/render";
import { IRoot } from "../../../utils/types/root";
import { fillID } from "../../editor/tools/fill-id";
import { PG } from "./global";

export const newPageComp = (p: PG, item: IItem) => {
  if (item.component?.id) {
    if (!p.comp.raw[item.component.id]) {
      console.error("Component Not Found: ", item.component.id);
      return null;
    }
    const comp = JSON.parse(JSON.stringify(p.comp.raw[item.component.id]));

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
  await Promise.all(
    [...compIds]
      .filter((id) => {
        if (!p.comp.raw[id] && !p.comp.pending[id]) return true;
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
    const res = await fetch(`${serverurl}/spa-comp/${comp_id}`);
    const comp = await res.json();

    if (comp) {
      p.comp.raw[comp.id] = comp as PRASI_COMPONENT;
      resolve(p.comp.raw[comp.id]);
    }
  });
};
