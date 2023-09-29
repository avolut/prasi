import { FC } from "react";
import { createAPI, createDB } from "../../../utils/script/init-api";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { EItem } from "../elements/e-item";
import { ItemMeta, PG } from "./global";
import { mergeScopeUpwards } from "./tree-scope";

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
          // note: by default set prop to empty string
          // if it is undefined then it will be overidden by parent scope
          // it is not desirable for prop to inherit from parent scope.
          value = fn(...Object.values(args)) || "";
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
          value = {
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
                p.treeMeta[prop.content.id].scopeAttached = scopes;

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
