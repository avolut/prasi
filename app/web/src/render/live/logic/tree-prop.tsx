import { FC } from "react";
import { createAPI, createDB } from "../../../utils/script/init-api";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { ItemMeta, PG } from "./global";
import { mergeScopeUpwards } from "./tree-scope";
import { LItem } from "../elements/l-item";
import { extractNavigate, preload } from "./route";

export type PropCompFC = FC<{}>;

const jsxProps = {} as Record<string, any>;
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
          value = fn(...Object.values(args)) || null;

          const navs = extractNavigate(prop.valueBuilt || "");
          if (navs.length > 0) {
            navs.map((nav) => preload(p, nav));
          }
        } catch (e) {
          const cname = meta.item.name;
          console.warn(e);
          console.warn(
            `ERROR in Component [${cname}], in prop [${name}]:\n ` + prop.value
          );
        }
      }

      if (prop.meta?.type === "content-element") {
        if (!(typeof value === "object" && !!value && value._jsx)) {
          const id = `${meta.item.id}-${name}`;
          if (!jsxProps[id]) {
            jsxProps[id] = {
              _jsx: true,
              Comp: ({ parent_id }: { parent_id: string }) => {
                if (prop.content) {
                  const meta = p.treeMeta[parent_id];
                  const scopes: { meta: ItemMeta; value: any }[] = [];
                  mergeScopeUpwards(p, meta, {
                    each: (m, val) => {
                      scopes.push({ meta: m, value: val });
                      return true;
                    },
                  });

                  if (p.treeMeta[prop.content.id]) {
                    p.treeMeta[prop.content.id].scopeAttached = scopes;
                  }

                  return <LItem id={prop.content.id} fromProp={true} />;
                }
                return <></>;
              },
            };
          }
          value = jsxProps[id];
        }
      }

      result[name] = value;
    }

    return result;
  }
};
