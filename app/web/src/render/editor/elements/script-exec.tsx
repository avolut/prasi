import {
  FC,
  ReactElement,
  ReactNode,
  Suspense,
  isValidElement,
  useEffect,
} from "react";
import { ErrorBoundary } from "web-init/src/web/error-boundary";
import { useLocal } from "web-utils";
import { createAPI, createDB } from "../../../utils/script/init-api";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
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
  const p = arg.p;
  const item = arg.item;
  const adv = item.adv;

  if (adv && adv.jsBuilt) {
    const output = { jsx: null as any };
    let evalArgs = {} as any;
    try {
      evalArgs = produceEvalArgs({ ...arg, output }, api_url);
      const scriptEval = new Function(...Object.keys(evalArgs), adv.jsBuilt);
      scriptEval(...Object.values(evalArgs));

      // if (p.comp?.item.name === "button") {
      //   if (item.name === "inside"){
      //     console.log('evargs', evalArgs, item);
      //   }
      // }
    } catch (e) {
      console.warn(e);
      console.warn(`ERROR in ${item.type} [${item.name}]:\n ` + adv.js);
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

  if (
    typeof arg.item.adv?.js === "string" &&
    meta[item.id].js !== arg.item.adv?.js
  ) {
    meta[item.id].js = arg.item.adv?.js || "";
    meta[item.id].local = createLocal({ item, render, p });
    meta[item.id].passchild = createPassChild({ item });
    meta[item.id].passprop = createPassProp();
  }

  const tm = meta[item.id];
  const PassProp = tm.passprop;
  const Local = tm.local;
  const PassChild = tm.passchild;

  if (typeof item.nprops === "object" && !Array.isArray(item.nprops)) {
    for (const [_, v] of Object.entries(item.nprops)) {
      if (isValidElement(v) && v.props) {
        const props = v.props as any;
        if (props.item) {
          props.item.nprops = item.nprops;
        }
      }
    }
  }

  const scopeProps = {
    ...window.exports,
    ...item.nprops,
  };

  for (const [k, v] of Object.entries(scopeProps)) {
    if (typeof v === "object") {
      const c: { _jsx: true; content: IItem; Comp: FC<any> } = v as any;
      if (c !== null && c._jsx && c.content) {
        c.content.nprops = scopeProps;
        if (!c.content.name.startsWith("jsx:")) {
          c.content.name = `jsx:${c.content.name}`;
        }
        scopeProps[k] = <c.Comp item={c.content} />;
      }
    }
  }

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

export const createPassChild = (arg: { item: IContent }) => {
  return ({ name }: { name: string }) => {
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
        return (
          <EItem key={arg.item.id} item={{ ...local.child, hidden: false }} />
        );
      else if (local.child.type === "text")
        return (
          <EText key={arg.item.id} item={{ ...local.child, hidden: false }} />
        );
    }
  };
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
  return ({ name, value, children, effect, hook }) => {
    if (!item.scope) {
      item.scope = { ...value, render };
    }

    const local = item.scope;
    let child = children;
    thru(child, { [name]: local });

    if (hook) {
      hook(local);
    }
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

  hook?: (
    local: T & { render: () => void }
  ) => void | (() => void) | Promise<void | (() => void)>;
}) => ReactNode;
