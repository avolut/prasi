import { ReactNode, useEffect } from "react";
import { IContent, w } from "../../types/general";
import { SingleScope } from "../../types/script";

export type LocalEffects<T extends Record<string, any>> = {
  effect: (
    local: T & { render: () => void }
  ) => void | (() => void) | Promise<void | (() => void)>;
  deps: any[];
}[];

export type LocalFC = <T extends Record<string, any>>(arg: {
  name: string;
  value: T;
  children: ReactNode | ((local: T & { render: () => void }) => ReactNode);
  effect?: (
    local: T & { render: () => void }
  ) => void | (() => void) | Promise<void | (() => void)>;

  effects?: LocalEffects<T>;
}) => ReactNode;

export const createLocal = (opt: {
  item: IContent;
  scope: SingleScope;
  render: () => void;
}): LocalFC => {
  return ({ name, children, value, effect, effects }) => {
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

    if (!w.isEditor) {
      if (effect) {
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
      }

      if (effects) {
        for (const f of effects) {
          useEffect(() => {
            const result: any = f.effect(local);

            if (typeof result === "function") {
              return () => {};
            } else if (
              typeof result === "object" &&
              result instanceof Promise
            ) {
              return () => {
                result.then((e: any) => {
                  if (typeof e === "function") e();
                });
              };
            }
          }, f.deps);
        }
      }
    } else {
    }

    if (typeof children === "function") {
      return children(local);
    }
    return children;
  };
};
