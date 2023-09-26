import { FC, ReactNode, Suspense, useEffect } from "react";
import { deepClone } from "web-utils";
import { createAPI, createDB } from "../../../utils/script/init-api";
import { ErrorBox } from "../../editor/elements/e-error";
import { ItemMeta, PG } from "./global";

export const JS_DEBUG = false;

export const treeScopeEval = (
  p: PG,
  meta: ItemMeta,
  children: ReactNode,
  js: string
) => {
  const className = meta.className;

  let item = meta.item;

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

    for (const [k, v] of Object.entries(finalScope)) {
      if (v && typeof v === "object") {
        const t: { _jsx: true; Comp: FC<{ parent_id: string }> } = v as any;
        if (t._jsx && t.Comp) {
          finalScope[k] = <t.Comp parent_id={meta.item.id} />;
        }
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
      props: { className },
      useEffect: useEffect,
      render: (jsx: ReactNode) => {
        output.jsx = (
          <ErrorBox>
            <Suspense>{jsx}</Suspense>
          </ErrorBox>
        );
      },
    };

    // execute
    const fn = new Function(...Object.keys(args), js);
    const res = fn(...Object.values(args));
    if (res instanceof Promise) {
      res.catch((e: any) => {
        console.warn(e);
        console.warn(
          (
            `ERROR in ${item.type} [${item.name}]:\n ` +
            ((adv?.js || "") as any)
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
        `ERROR in ${item.type} [${item.name}]:\n ` + ((adv?.js || "") as any)
      ).trim()
    );
    console.warn(`Available var:`, args, `\n\n`);
  }
};

export const mergeScopeUpwards = (
  p: PG,
  meta: ItemMeta,
  opt?: {
    debug?: boolean;
    each?: (meta: ItemMeta, values: Record<string, any>) => boolean;
  }
) => {
  if (!meta.scope) {
    meta.scope = {};
  }

  let cur = meta;

  const finalScope: any = {};

  while (cur) {
    let scope = null;

    if (cur.scopeAttached) {
      for (const s of cur.scopeAttached) {
        if (s.value) {
          for (const [k, v] of Object.entries(s.value)) {
            if (typeof finalScope[k] === "undefined") finalScope[k] = v;
          }

          if (opt?.each) {
            if (!opt.each(s.meta, s.value)) {
              break;
            }
          }
        }
      }
    }

    if (cur.scope || cur.comp?.propval) {
      scope = { ...cur.scope, ...cur.comp?.propval };

      for (const [k, v] of Object.entries(scope)) {
        if (typeof finalScope[k] === "undefined") finalScope[k] = v;
      }

      if (opt?.each) {
        if (!opt.each(cur, scope)) {
          break;
        }
      }
    }

    cur = p.treeMeta[cur.parent_id];
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

const cachedLocal = {} as Record<string, Record<string, any>>;

const createLocal = (p: PG, meta: ItemMeta) => {
  const Local = ({
    name,
    value,
    effect,
    children,
    hook,
    deps,
    cache,
  }: {
    name: string;
    value: any;
    effect?: (value: any) => void | Promise<void>;
    children: ReactNode;
    hook?: (value: any) => void;
    deps?: any[];
    cache?: boolean;
  }) => {
    if (!meta.scope) {
      meta.scope = {};
    }
    const genScope = () => {
      if (!meta.scope[name]) {
        try {
          meta.scope[name] = {
            ...deepClone(value),
            render: () => {
              if (meta.render) meta.render();
              else p.render();
            },
          };
        } catch (e) {
          console.warn(e);
        }
      }
    };

    if (cache === false) {
      genScope();
    } else {
      const page_id = p.page?.id;
      if (page_id) {
        if (!cachedLocal[page_id]) {
          cachedLocal[page_id] = {};
        }
        if (cachedLocal[page_id][meta.item.originalId || meta.item.id]) {
          meta.scope[name] =
            cachedLocal[page_id][meta.item.originalId || meta.item.id];
          meta.scope[name].render = () => {
            if (meta.render) meta.render();
            else p.render();
          };
        } else {
          genScope();
          cachedLocal[page_id][meta.item.originalId || meta.item.id] =
            meta.scope[name];
        }
      }
    }

    if (typeof hook === "function") {
      try {
        hook(meta.scope[name]);
      } catch (e) {
        console.warn(e);
      }
    }

    useEffect(() => {
      if (effect) {
        try {
          effect(meta.scope[name]);
        } catch (e) {
          console.warn(e);
        }
      }
    }, deps || []);

    return children;
  };

  return Local;
};
