import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "web-init/src/web/error-boundary";
import { IContent } from "../../types/general";
import { SingleScope } from "../../types/script";
import { Loading } from "../../ui/loading";
import { findScope } from "../content-edit/render-tools/init-scope";
import { createAPI, createDB } from "./api-db";
import { createLocal } from "./local-comp";
import { createPassProps } from "./pass-props";

type JsArg = {
  item: IContent;
  scope: SingleScope;
  children: ReactNode;
  className: string[];
  elementProp: any;
  render: () => void;
};

export const execElement = (arg: JsArg, api_url?: string) => {
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
    }
    return output.jsx;
  }

  return null;
};

const produceEvalArgs = (
  arg: JsArg & { output: { jsx: ReactNode } },
  api_url?: string
) => {
  const { item, children, output, scope, className, elementProp, render } = arg;

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
      ...elementProp,
    },
    render: (jsx: ReactNode) => {
      output.jsx = (
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="flex flex-1 items-center justify-center w-full h-full relative">
                <Loading />
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
