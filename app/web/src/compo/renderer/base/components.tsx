import { findScope } from "../../page/content-edit/render-tools/init-scope";
import { fillID } from "../../page/tools/fill-id";
import { IContent } from "../../types/general";
import { IItem } from "../../types/item";
import { IRoot } from "../../types/root";
import { RItem } from "./elements/r-item";
import { RendererGlobal } from "./renderer-global";

export const scanComponent = (
  item: IRoot | IContent,
  componentIDS?: Set<string>
) => {
  const ids = componentIDS || new Set();

  if (item.type === "item" && item.component?.id) {
    ids.add(item.component.id);
  }

  if (item.type !== "text") {
    for (const c of item.childs) {
      scanComponent(c, ids);
    }
  }
  return ids;
};

export const instantiateComp = (rg: typeof RendererGlobal, item: IItem) => {
  if (item.component?.id) {
    const comp = rg.component.def[item.component.id];
    if (comp && comp.content_tree) {
      const citem = fillID(
        JSON.parse(JSON.stringify(comp.content_tree))
      ) as IItem;
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
      return nitem;
    }
  }
};

export const initScope = (
  rg: typeof RendererGlobal & { render: () => void },
  item: IContent,
  parentID?: string
) => {
  let scope = rg.scope;

  if (scope) {
    if (!scope.tree[item.id]) {
      scope.tree[item.id] = {
        childs: new Set(),
        // name: item.name,
        // type: item.type,
        // lv: 0,
        parent_id: parentID || "root",
      };
    }
    if (item.type !== "text") {
      for (const c of item.childs) {
        if (!scope.tree[c.id]) {
          scope.tree[c.id] = {
            childs: new Set(),
            // name: c.name,
            // type: c.type,
            // lv: scope.tree[item.id].lv + 1,
            parent_id: item.id,
          };
        }
        scope.tree[item.id].childs.add(c.id);
      }
    }

    if (item.type === "item" && item.component) {
      const props = item.component.props;
      scope.value[item.id] = {};
      const sval = scope.value[item.id];
      if (props) {
        const exec = (fn: string) => {
          const existingScope = findScope(scope, item.id || "");
          const f = new Function(...Object.keys(existingScope), `return ${fn}`);
          return f(...Object.values(existingScope));
        };

        for (const [key, prop] of Object.entries(props)) {
          let val: any = null;
          let shouldEval = true;
          if (prop.meta?.type === "content-element") {
            if (prop.content) {
              val = <RItem item={prop.content} />;
              shouldEval = false;
            }
          }

          if (shouldEval) {
            try {
              val = exec(prop.valueBuilt || prop.value);
            } catch (e) {}
          }
          sval[key] = val;
        }
      }
    }
  }
};
