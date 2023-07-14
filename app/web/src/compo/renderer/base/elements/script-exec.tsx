import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "web-init/src/web/error-boundary";
import { findScope } from "../../../page/content-edit/render-tools/init-scope";
import { createAPI, createDB } from "../../../page/scripting/api-db";
import { createLocal } from "../../../page/scripting/local-comp";
import { createPassProps } from "../../../page/scripting/pass-props";
import { IContent } from "../../../types/general";
import { SingleScope } from "../../../types/script";
import { RendererGlobal } from "../renderer-global";

type JsArg = {
  rg: typeof RendererGlobal;
  item: IContent;
  scope: SingleScope;
  children: ReactNode;
  className: string;
  render: () => void;
};

export const scriptExec = (arg: JsArg, api_url?: string) => {
  const adv = arg.item.adv;
  if (adv && adv.jsBuilt) {
    const output = { jsx: null };

    let error = false;
    try {
      const evalArgs = produceEvalArgs({ ...arg, output }, api_url);
      const scriptEval = new Function(...Object.keys(evalArgs), adv.jsBuilt);
      scriptEval(...Object.values(evalArgs));
    } catch (e) {
      error = true;
      console.log(e);
    }
    return output.jsx;
  }

  return null;
};

const produceEvalArgs = (
  arg: JsArg & { output: { jsx: ReactNode } },
  api_url?: string
) => {
  const { item, rg, children, output, scope, className, render } = arg;
  7;
  if (!scope.evargs[item.id]) {
    scope.evargs[item.id] = {
      local: createLocal({ item, scope, render }),
      passprop: createPassProps({ item, scope }),
    };
  }

  const PassProp = scope.evargs[item.id].passprop;
  const Local = scope.evargs[item.id].local;

  const result: any = {
    PassProp,
    Local,
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
    ...findScope(scope, item.id),
  };

  if (api_url) {
    result["api"] = createAPI(api_url);
    result["db"] = createDB(api_url);
  }

  return result;
};
