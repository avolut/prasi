import { ReactNode, Suspense, isValidElement, useEffect } from "react";
import { ErrorBoundary } from "web-init/src/web/error-boundary";
import { createAPI, createDB } from "../../../page/scripting/api-db";
import { LocalFC } from "../../../page/scripting/local-comp";
import { createPassChild } from "../../../page/scripting/pass-child-r";
import { IContent } from "../../../types/general";
import { RendererGlobal } from "../renderer-global";
import { useGlobal } from "web-utils";

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

const Preload = ({ children, url }: { children: ReactNode; url: string[] }) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");
  useEffect(() => {
    for (const u of url) {
      const router = rg.page.router;
      if (router) {
        const found = router.lookup(u);
        if (found && !found.content_tree && !rg.page.preloads[found.id]) {
          rg.page.preloads[found.id] = new Promise(async (resolve) => {
            const page = await rg.page.load(found.id, true);
            if (page) {
              found.content_tree = page.content_tree;
              found.js_compiled = page.js_compiled;
              delete rg.page.preloads[found.id];
              resolve(found as any);

              let res: any[] = [];
              res = await api.comp_scan(found.id);
              if (res) {
                for (const c of res) {
                  if (!rg.component.def[c.id]) {
                    rg.component.def[c.id] = {
                      id: c.id,
                      content_tree: c.content_tree,
                    };
                  }
                }
              }
            }
          });
        }
      }
    }
  }, []);

  return children;
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
    Preload,
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
  if (Array.isArray(child)) {
    for (const c of child) {
      if (isValidElement(c)) {
        const cprops: any = c.props;
        if (cprops.item) {
          if (!cprops.item.nprops) cprops.item.nprops = {};
          for (const [k, v] of Object.entries(nprops)) {
            cprops.item.nprops[k] = v;
          }
        }
      }
    }
  } else {
    if (isValidElement(child)) {
      const cprops: any = child.props;
      if (cprops.item) {
        if (!cprops.item.nprops) cprops.item.nprops = {};
        for (const [k, v] of Object.entries(nprops)) {
          cprops.item.nprops[k] = v;
        }
      } else if (cprops.children) {
        for (const [ck, cv] of Object.entries(cprops.children)) {
          const cprops = (cv as any).props;
          if (cprops.item) {
            if (!cprops.item.nprops) cprops.item.nprops = {};
            for (const [k, v] of Object.entries(nprops)) {
              cprops.item.nprops[k] = v;
            }
          }
        }
      }
    }
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
    if (typeof children === "function") {
      child = children(local);
    }
    thru(child, { [name]: local });

    return child as ReactNode;
  };
};
