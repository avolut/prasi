import { createAPI, createDB } from "../../../utils/script/init-api";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { ItemMeta, PG } from "./global";
import { mergeScopeUpwards } from "./tree-scope";

export const treePropEval = async (
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

      if (prop.meta?.type === "content-element") {
        // todo: create EItem
        result[name] = <>ini jsx</>;
        continue;
      }

      if (prop.valueBuilt) {
        const fn = new Function(
          ...Object.keys(args),
          `return ${prop.valueBuilt}`
        );
        try {
          result[name] = await fn(...Object.values(args));
        } catch (e) {
          const cname = meta.item.name;
          console.log(args);
          console.warn(e);
          console.warn(
            `ERROR in Component [${cname}], in prop [${name}]:\n ` + prop.value
          );
        }
      }
    }
    return result;
  }
};
