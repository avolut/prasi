import { FC, ReactNode, Suspense, useEffect } from "react";
import { deepClone } from "web-utils";
import { createAPI, createDB } from "../../../utils/script/init-api";
import { ItemMeta, PG } from "./global";
import { ErrorBoundary } from "web-init";

export const JS_DEBUG = false;

export const treeScopeEval = (p: PG, meta: ItemMeta, children: ReactNode) => {
  const className = meta.className;
  const elprop = meta.elprop;

  let item = meta.item;

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

      if (JS_DEBUG) {
        const args = [
          (".".repeat(meta.depth || 0) + meta.item.name).padEnd(30, "_") +
            " " +
            meta.item.id,
        ].join(" ");

        if (meta.comp) {
          console.log("%c" + args, "color:red", finalScope);
        } else {
          console.log(args, finalScope);
        }
      }

      const output = { jsx: null as any };
      args = {
        ...w.exports,
        ...finalScope,
        ...meta.memoize,
        db: p.script.db,
        api: p.script.api,
        children,
        props: { ...elprop, className },
        useEffect: useEffect,
        render: (jsx: ReactNode) => {
          output.jsx = (
            <ErrorBoundary
              onError={(e) => {
                console.warn(e);
              }}
            >
              <Suspense
                fallback={
                  <div className="flex flex-1 items-center justify-center w-full h-full relative">
                    {p.ui.loading}
                  </div>
                }
              >
                {/* <pre className={"text-[9px] font-mono text-black"}>
                  {item.id}-{item.name}
                </pre> */}
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
          console.warn(
            (
              `ERROR in ${item.type} [${item.name}]:\n ` +
              ((adv.js || "") as any)
            ).trim()
          );
          console.warn(`Available var:`, args, `\n\n`);
        });
      }

      return output.jsx;
    } catch (e) {
      console.warn(e);
      console.warn(
        (
          `ERROR in ${item.type} [${item.name}]:\n ` + ((adv.js || "") as any)
        ).trim()
      );
      console.warn(`Available var:`, args, `\n\n`);
    }
  }
};

export const mergeScopeUpwards = (p: PG, meta: ItemMeta) => {
  // merge scope upwards
  if (!meta.scope) {
    meta.scope = {};
  }
  const scopes = [];
  scopes.push(meta.scope);

  let cur = meta;

  while (cur) {
    let scope = null;

    if (cur.scope || cur.comp?.propval) {
      scope = { ...cur.scope, ...cur.comp?.propval };

      scopes.unshift(scope);
    }

    cur = p.treeMeta[cur.parent_id];
  }

  const finalScope: any = {};
  for (const scope of scopes) {
    for (const [k, v] of Object.entries(scope)) {
      let val = v;
      if (v && typeof v === "object") {
        const t: { _jsx: true; Comp: FC<{ parent_id: string }> } = v as any;
        if (t._jsx && t.Comp) {
          val = <t.Comp parent_id={meta.item.id} />;
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
  const Local = ({
    name,
    value,
    effect,
    children,
    hook,
    deps,
  }: {
    name: string;
    value: any;
    effect?: (value: any) => void | Promise<void>;
    children: ReactNode;
    hook?: () => void;
    deps?: any[];
  }) => {
    if (!meta.scope) {
      meta.scope = {};
    }

    if (!meta.scope[name] || meta.item.id === p.item.active) {
      meta.scope[name] = {
        ...deepClone(value),
        render: () => {
          if (!p.focused) {
            p.render();
          }
        },
      };
    }

    if (typeof hook === "function") {
      try {
        hook();
      } catch (e) {
        console.warn(e);
      }
    }

    useEffect(() => {
      if (effect) {
        effect(meta.scope[name]);
      }
    }, deps || []);

    return children;
  };

  return Local;
};
