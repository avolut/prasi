import { FC, ReactNode, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "web-init";
import { deepClone } from "web-utils";
import { createAPI, createDB } from "../../../utils/script/init-api";
import { ItemMeta, PG } from "./global";
import { IItem } from "../../../utils/types/item";
import { EItem } from "../elements/e-item";

export const treeScopeEval = (p: PG, meta: ItemMeta, children: ReactNode) => {
  const item = meta.item;
  const className = meta.className;
  const elprop = meta.elprop;
  if (item.adv && item.adv.jsBuilt) {
    const adv = item.adv;
    let args = {};
    try {
      if (!meta.memoize) {
        meta.memoize = {
          Local: createLocal(p, meta),
          PassProp: createPassProp(p, meta),
        };
      }

      // prepare args
      if (!p.script.db) p.script.db = createDB(p.site.api_url);
      if (!p.script.api) p.script.api = createAPI(p.site.api_url);
      const w = window as any;
      const finalScope = mergeScopeUpwards(p, meta);
      const output = { jsx: null as any };
      args = {
        ...w.exports,
        ...finalScope,
        ...meta.memoize,
        db: p.script.db,
        api: p.script.api,
        children,
        props: { ...elprop, className },
        render: (jsx: ReactNode) => {
          // output.jsx = jsx;
          output.jsx = (
            <ErrorBoundary>
              <Suspense
                fallback={
                  <div className="flex flex-1 items-center justify-center w-full h-full relative">
                    {p.ui.loading}
                  </div>
                }
              >
                {jsx}
              </Suspense>
            </ErrorBoundary>
          );
        },
      };

      // execute
      const fn = new Function(...Object.keys(args), item.adv.jsBuilt);
      const res = fn(...Object.values(args));
      if (res instanceof Promise) {
        res.catch((e: any) => {
          console.warn(e);
          console.warn(`ERROR in ${item.type} [${item.name}]:\n ` + adv.js);
          console.warn(`Available var:`, args);
        });
      }

      return output.jsx;
    } catch (e) {
      console.warn(e);
      console.warn(`ERROR in ${item.type} [${item.name}]:\n ` + adv.js);
      console.warn(`Available var:`, args);
    }
  }
};

export const mergeScopeUpwards = (p: PG, meta: ItemMeta) => {
  // merge scope upwards
  if (!meta.scope) {
    meta.scope = {};
  }
  const scopes = [meta.scope];
  let cur = meta;
  while (cur) {
    if (cur.scope) {
      const scope = { ...cur.scope };
      if (cur.comp?.propval) {
        for (const [k, v] of Object.entries(cur.comp.propval)) {
          scope[k] = v;
        }
      }

      scopes.unshift(scope);
    }
    cur = p.treeMeta[cur.parent_id];
  }

  const finalScope: any = {};
  for (const scope of scopes) {
    for (const [k, v] of Object.entries(scope)) {
      let val = v;
      if (v && typeof v === "object") {
        const t: { _jsx: true; Comp: FC<{ from_item_id: string }> } = v as any;
        if (t._jsx && t.Comp) {
          val = <t.Comp from_item_id={meta.item.id} />;
        }
      }
      finalScope[k] = val;
    }
  }

  return finalScope;
};

const createPassProp = (p: PG, meta: ItemMeta) => {
  return (arg: Record<string, any> & { children: ReactNode }) => {
    if (!meta.scope) {
      meta.scope = {};
    }
    for (const [k, v] of Object.entries(arg)) {
      if (k === "children") continue;
      meta.scope[k] = v;
    }

    return arg.children;
  };
};

const createLocal = (p: PG, meta: ItemMeta) => {
  return ({
    name,
    value,
    effect,
    children,
  }: {
    name: string;
    value: any;
    effect?: (value: any) => void | Promise<void>;
    children: ReactNode;
  }) => {
    if (!meta.scope) {
      meta.scope = {};
    }
    if (!meta.scope[name]) {
      meta.scope[name] = {
        ...deepClone(value),
        render: () => {
          if (!p.focused) {
            p.render();
          }
        },
      };
    }

    useEffect(() => {
      if (effect) {
        effect(meta.scope[name]);
      }
    }, []);

    return children;
  };
};
