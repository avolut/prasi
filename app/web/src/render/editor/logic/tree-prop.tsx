import { FC, isValidElement } from "react";
import { createAPI, createDB } from "../../../utils/script/init-api";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { EItem } from "../elements/e-item";
import { ItemMeta, PG } from "./global";
import { intantiateJSXPropMeta } from "./tree-jsxprop";
import { mergeScopeUpwards } from "./tree-scope";
import { IItem } from "../../../utils/types/item";

export type PropCompFC = FC<{}>;

export const treePropEval = (
  p: PG,
  meta: ItemMeta,
  cprops: [string, FNCompDef][]
) => {
  if (meta.item.type === "item" && meta.item.component) {
    if (!p.script.db) p.script.db = createDB(p.site.api_url);
    if (!p.script.api) p.script.api = createAPI(p.site.api_url);

    const props = meta.item.component.props;

    const w = window as any;
    const finalScope = mergeScopeUpwards(p, meta);
    const args = {
      ...w.exports,
      ...finalScope,
      db: p.script.db,
      api: p.script.api,
    };

    const result: any = {};
    for (const [name, _prop] of cprops) {
      const prop = props[name] || _prop;

      let value: any = null;
      if (prop.valueBuilt) {
        const fn = new Function(
          ...Object.keys(args),
          `return ${prop.valueBuilt}`
        );
        try {
          value = fn(...Object.values(args));
        } catch (e) {
          const cname = meta.item.name;
          console.warn(e);
          console.warn(
            `ERROR in Component [${cname}], in prop [${name}]:\n ` + prop.value
          );
        }
      }

      if (prop.meta?.type === "content-element") {
        if (!isValidElement(value)) {
          value = {
            _jsx: true,
            Comp: ({ parent_id }: { parent_id: string }) => {
              if (prop.content) {
                if (!p.treeJSXProp[prop.content.id]) {
                  p.treeJSXProp[prop.content.id] = new Set();
                }
                p.treeJSXProp[prop.content.id].add(parent_id);

                return <EItem id={prop.content.id} fromProp={true} />;
              }
              return <></>;
            },
          };
        }
      }

      result[name] = value;
    }

    return result;
  }
};
