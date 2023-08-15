import {
  ReactElement,
  ReactNode,
  Suspense,
  isValidElement,
  useEffect,
} from "react";
import { ErrorBoundary } from "web-init/src/web/error-boundary";
import { useLocal } from "web-utils";
import { createAPI, createDB } from "../../../utils/script/api";
import { IContent } from "../../../utils/types/general";
import { PG } from "../logic/global";
import { EItem } from "./e-item";
import { ElProp } from "./e-relprop";
import { EText } from "./e-text";

type JsArg = {
  p: PG;
  item: IContent;
  children: ReactNode;
  className: string;
  render: () => void;
  elprop: ElProp;
  componentOver: ReactElement | null;
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

export const tempMeta: any = {};
const produceEvalArgs = (
  arg: JsArg & { output: { jsx: ReactNode } },
  api_url?: string
) => {
  const { item, p, children, output, className, render } = arg;

  let meta = p.treeMeta;
  if (!p.treeMeta[item.id]) {
    tempMeta[item.id] = {} as any;
    meta = tempMeta;
  }

  if (typeof meta[item.id].local === "undefined") {
    meta[item.id].local = createLocal({ item, render, p });
    meta[item.id].passchild = createPassChild({ item });
    meta[item.id].passprop = createPassProp();
  }

  const tm = meta[item.id];
  const PassProp = tm.passprop;
  const Local = tm.local;
  const PassChild = tm.passchild;
  const scopeProps = {
    ...window.exports,
    ...item.nprops,
  };

  const result: any = {
    PassProp,
    Local,
    PassChild,
    children:
      arg.componentOver !== null ? (
        <>
          {children}
          {arg.componentOver}
        </>
      ) : (
        children
      ),
    props: {
      className: cx(className),
      ...arg.elprop,
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

export const createPassChild =
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
        return <EItem item={{ ...local.child, hidden: false }} />;
      else if (local.child.type === "text")
        return <EText item={{ ...local.child, hidden: false }} />;
    }
  };

export const createPassProp = () => {
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

export const createLocal = (arg: {
  p: PG;
  item: IContent;
  render: () => void;
}): LocalFC => {
  const { item, render, p } = arg;
  return ({ name, value, children, effect }) => {
    if (!item.scope) {
      item.scope = { ...value, render };
    }

    const local = item.scope;
    let child = children;
    thru(child, { [name]: local });

    useEffect(() => {
      if (effect) {
        if (p.page) {
          if (!p.page.effects) {
            p.page.effects = {};
          }

          if (!p.page.effects[item.id]) {
            p.page.effects[item.id] = true;

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
