import { ReactNode, Suspense, isValidElement, useEffect } from "react";
import { ErrorBoundary } from "web-init/src/web/error-boundary";
import { useLocal } from "web-utils";
import { IContent, w } from "../../../utils/types/general";
import { PG } from "../logic/global";
import { PItem } from "./p-item";
import { PText } from "./p-text";
import { createAPI, createDB } from "../../../utils/script/init-api";

type JsArg = {
  p: PG;
  item: IContent;
  children: ReactNode;
  className: string;
  render: () => void;
};

export const scriptExec = (arg: JsArg, api_url?: string) => {
  const adv = arg.item.adv;
  if (adv && adv.jsBuilt) {
    const output = { jsx: null };

    let error = false;
    let evalArgs = {} as any;
    try {
      evalArgs = produceEvalArgs({ ...arg, output }, api_url);
      const scriptEval = new Function(...Object.keys(evalArgs), adv.jsBuilt);
      scriptEval(...Object.values(evalArgs));
    } catch (e) {
      error = true;
      console.warn(e);
      console.warn(`ERROR in ${arg.item.type} [${arg.item.name}]:\n ` + adv.js);
    }
    return output.jsx;
  }

  return null;
};

const produceEvalArgs = (
  arg: JsArg & { output: { jsx: ReactNode } },
  api_url?: string
) => {
  const { item, p, children, output, className, render } = arg;

  if (!p.treeMeta[item.id]) {
    p.treeMeta[item.id] = {
      local: createLocal({ item, render }),
      passchild: createPassChild({ item }),
      passprop: createPassProp(),
    };
  }

  const meta = p.treeMeta[item.id];
  const PassProp = meta.passprop;
  const Local = meta.local;
  const PassChild = meta.passchild;
  const scopeProps = {
    ...window.exports,
    ...arg.item.nprops,
    params: w.params,
  };

  const result: any = {
    PassProp,
    Local,
    PassChild,
    children,
    props: {
      className: cx(className),
    },
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
    ...scopeProps,
  };

  if (api_url) {
    result["api"] = createAPI(api_url);
    result["db"] = createDB(api_url);
  }

  return result;
};

const createPassChild =
  (arg: { item: IContent }) =>
  ({ name }: { name: string }) => {
    const local = useLocal({ child: null as any });
    if (!local.child) {
      if (arg.item.type !== "text") {
        for (const child of arg.item.childs) {
          if (child.name === name) {
            local.child = child;
          }
        }
      }
    }
    if (local.child) {
      if (local.child.type === "item")
        return <PItem item={{ ...local.child, hidden: false }} />;
      else if (local.child.type === "text")
        return <PText item={{ ...local.child, hidden: false }} />;
    }
  };

const createPassProp = () => {
  return (prop: any) => {
    const nprops = { ...prop };
    delete nprops.children;

    thru(prop, nprops);

    return prop.children;
  };
};

const thru = (prop: any, nprops: any) => {
  let child = null;
  if (Array.isArray(prop)) {
    child = prop;
  } else {
    child = prop.children;
  }

  const assign = (c: any) => {
    if (isValidElement(c)) {
      const cprops: any = c.props;
      if (cprops && cprops.item) {
        if (!cprops.item.nprops) cprops.item.nprops = {};
        for (const [k, v] of Object.entries(nprops)) {
          cprops.item.nprops[k] = v;
        }
      } else if (cprops.children) {
        thru(cprops, nprops);
      }
    }
  };
  if (Array.isArray(child)) {
    for (const c of child) {
      assign(c);
    }
  } else {
    assign(child);
  }
};

const createLocal = (arg: { item: IContent; render: () => void }): LocalFC => {
  const { item, render } = arg;
  return ({ name, value, children, effect }) => {
    if (!item.scope) {
      item.scope = { ...value, render };
    }

    const local = item.scope;
    let child = children;
    thru(child, { [name]: local });

    useEffect(() => {
      if (effect) {
        const res = effect(local);
        if (res && res instanceof Promise) {
          return () => {
            res.then((e) => {
              if (typeof e === "function") e();
            });
          };
        } else {
          return res;
        }
      }
    }, []);

    return child as ReactNode;
  };
};

export type LocalEffects<T extends Record<string, any>> = {
  effect: (
    local: T & { render: () => void }
  ) => void | (() => void) | Promise<void | (() => void)>;
  deps: any[];
}[];

export type LocalFC = <T extends Record<string, any>>(arg: {
  name: string;
  value: T;
  children: ReactNode;
  effect?: (
    local: T & { render: () => void }
  ) => void | (() => void) | Promise<void | (() => void)>;

  effects?: LocalEffects<T>;
}) => ReactNode;
