import { ReactNode, useEffect } from "react";
import { IContent, w } from "../../types/general";
import { SingleScope } from "../../types/script";

export type LocalFC = <T extends Record<string, any>>(arg: {
  name: string;
  value: T;
  children: ReactNode | ((local: T & { render: () => void }) => ReactNode);
  effect?: (
    local: T & { render: () => void }
  ) => void | (() => void) | Promise<void | (() => void)>;
}) => ReactNode;

export const createLocal = (opt: {
  item: IContent;
  scope: SingleScope;
  render: () => void;
}): LocalFC => {
  return ({ name, children, value, effect }) => {
    if (!opt.scope.value[opt.item.id]) {
      opt.scope.value[opt.item.id] = {};
    }
    const scope = opt.scope.value[opt.item.id];

    if (!scope[name]) {
      scope[name] = JSON.parse(JSON.stringify(value));
      for (const [k, v] of Object.entries(scope[name])) {
        if (typeof value[k] === "undefined") delete scope[name][k];
      }
      for (const [k, v] of Object.entries(value)) {
        if (k !== "render") {
          if (typeof v === "function") {
            scope[name][k] = v;
          } else {
            scope[name][k] = v;
          }
        }
      }
    }
    const local = scope[name];
    local.render = opt.render;

    if (effect) {
      if (!w.isEditor) {
        useEffect(() => {
          const result: any = effect(local);

          if (typeof result === "function") {
            return () => {};
          } else if (typeof result === "object" && result instanceof Promise) {
            return () => {
              result.then((e: any) => {
                if (typeof e === "function") e();
              });
            };
          }
        }, []);
      } else {
        if (!opt.scope.effect) {
          opt.scope.effect = {};
        }

        opt.scope.effect[opt.item.id] = { name, effect };
      }
    }

    if (typeof children === "function") {
      return children(local);
    }
    return children;
  };
};
