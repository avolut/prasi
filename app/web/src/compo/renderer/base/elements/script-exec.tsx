import { ReactNode, Suspense, isValidElement } from "react";
import { ErrorBoundary } from "web-init/src/web/error-boundary";
import { createAPI, createDB } from "../../../page/scripting/api-db";
import { LocalFC } from "../../../page/scripting/local-comp";
import { createPassChild } from "../../../page/scripting/pass-child-r";
import { IContent } from "../../../types/general";
import { RendererGlobal } from "../renderer-global";

type JsArg = {
  rg: typeof RendererGlobal;
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
      console.log(e);
      console.log(`ERROR: ` + adv.jsBuilt);
    }
    return output.jsx;
  }

  return null;
};

const produceEvalArgs = (
  arg: JsArg & { output: { jsx: ReactNode } },
  api_url?: string
) => {
  const { item, rg, children, output, className, render } = arg;

  if (!item.cmemo) {
    item.cmemo = {
      local: createLocal({ item, render }),
      passchild: createPassChild({ item }),
      passprop: createPassProp(),
    };
  }

  const PassProp = item.cmemo.passprop;
  const Local = item.cmemo.local;
  const PassChild = item.cmemo.passchild;
  const scopeProps = { ...window.exports, ...arg.item.nprops };

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
                {rg.ui.loading}
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

const createPassProp = () => {
  return (prop: any) => {
    const nprops = { ...prop };
    delete nprops.children;

    try {
      if (!prop.children[0].props.item.nprops) {
        prop.children[0].props.item.nprops = {};
      }
      const cprops = prop.children[0].props.item.nprops;
      for (const [k, v] of Object.entries(nprops)) {
        cprops[k] = v;
      }
    } catch (e) {}
    return prop.children;
  };
};
const createLocal = (arg: { item: IContent; render: () => void }): LocalFC => {
  const { item, render } = arg;
  return ({ name, value, children, effect }) => {
    if (!item.scope) {
      item.scope = { ...value, render };
    }

    const local = item.scope;
    let child = children;
    if (typeof children === "function") {
      child = children(local);
    }

    if (Array.isArray(child)) {
      for (const c of child) {
        if (isValidElement(c)) {
          const cprops: any = c.props;
          if (!cprops.item.nprops) cprops.item.nprops = {};
          cprops.item.nprops[name] = local;
        }
      }
    } else {
      if (isValidElement(child)) {
        if (!child.props.item.nprops) child.props.item.nprops = {};
        child.props.item.nprops[name] = local;
      }
    }

    return child as ReactNode;
  };
};
