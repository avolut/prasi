import { ReactNode, Suspense, useEffect, useState } from "react";
import { deepClone } from "web-utils";
import { IContent } from "../../../utils/types/general";
import { ItemMeta, PG } from "./global";
import { ErrorBoundary } from "web-init";

export const treeScopeEval = async (
  p: PG,
  item: IContent,
  meta: ItemMeta,
  children: ReactNode
) => {
  if (item.adv && item.adv.jsBuilt) {
    const adv = item.adv;
    try {
      if (!meta.memoize) {
        meta.memoize = {
          Local: createLocal(p, meta),
        };
      }

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

      // prepare args
      const output = { jsx: null as any };
      const args = {
        ...finalScope,
        ...meta.memoize,
        children,
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
      await fn(...Object.values(args));

      return output.jsx;
    } catch (e) {
      console.warn(e);
      console.warn(`ERROR in ${item.type} [${item.name}]:\n ` + adv.js);
    }
  }
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
