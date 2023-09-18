import { ReactNode, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "web-init";
import { deepClone } from "web-utils";
import { createAPI, createDB } from "../../../utils/script/init-api";
import { ItemMeta, PG } from "./global";

export const treeScopeEval = (p: PG, meta: ItemMeta, children: ReactNode) => {
  const item = meta.item;
  if (item.adv && item.adv.jsBuilt) {
    const adv = item.adv;
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
      const args = {
        ...w.exports,
        ...finalScope,
        ...meta.memoize,
        db: p.script.db,
        api: p.script.api,
        children,
        props: {},
        render: (jsx: ReactNode) => {
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
      fn(...Object.values(args));

      return output.jsx;
    } catch (e) {
      console.warn(e);
      console.warn(`ERROR in ${item.type} [${item.name}]:\n ` + adv.js);
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
      scopes.unshift(cur.scope);
    }
    cur = p.treeMeta[cur.parent_id];
  }
  const finalScope: any = {};
  for (const scope of scopes) {
    for (const [k, v] of Object.entries(scope)) {
      finalScope[k] = v;
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
    const [_, set] = useState({});
    meta.scope = {
      ...meta.scope,
      [name]: {
        ...deepClone(value),
        render: () => {
          if (!p.focused) {
            set({});
          }
        },
      },
    };

    useEffect(() => {
      if (effect) {
        effect(meta.scope[name]);
      }
    }, []);

    return children;
  };
};
