import { produceCSS } from "../../../utils/css/gen";
import { IItem } from "../../../utils/types/item";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { createElProp } from "../elements/e-relprop";
import { fillID } from "../tools/fill-id";
import { PG } from "./global";
import { walk } from "./tree-logic";

export const intantiateJSXPropMeta = (arg: {
  p: PG;
  parent_id: string;
  name: string;
  prop: FNCompDef;
}) => {
  const { p, parent_id, name, prop } = arg;
  if (!p.treeJSXProp[parent_id]) {
    p.treeJSXProp[parent_id] = {};
  }
  if (!p.treeJSXProp[parent_id][name]) {
    p.treeJSXProp[parent_id][name] = fillID(
      JSON.parse(JSON.stringify(prop.content))
    ) as IItem;
  }

  const item = p.treeJSXProp[parent_id][name];

  if (!p.treeMeta[item.id]) {
    const parent = p.treeMeta[parent_id];
    if (parent) {
      const depth = parent.depth + 1;

      p.treeMeta[item.id] = {
        item,
        parent_id: parent_id,
        parent_comp: parent.parent_comp,
        depth,
        elprop: createElProp(item, p),
        className: produceCSS(item, {
          mode: p.mode,
          hover: p.item.sideHover ? false : p.item.hover === item.id,
          active: p.item.sideHover ? false : p.item.active === item.id,
        }),
      };

      walk(p, "update", {
        parent_id: item.id,
        item,
        skip: true,
        depth: depth,
        idx: 0,
      });
    }
  }

  return p.treeMeta[item.id];
};
