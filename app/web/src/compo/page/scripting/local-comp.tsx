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
  children: ReactNode;
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
      const cache: any[] = [];
      scope[name] = JSON.parse(
        JSON.stringify(value, (key, value) => {
          if (typeof value === "object" && value !== null) {
            // Duplicate reference found, discard key
            if (cache.includes(value)) return;

            // Store value in our collection
            cache.push(value);
          }
          return value;
        })
      );
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

    useEffect(() => {
      if (!w.isEditor) {
        if (effect) {
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
        }
      } else {
        if (effect) {
          if (!opt.scope.effectRun) {
            opt.scope.effectRun = {};
          }

          if (!opt.scope.effectRun[opt.item.id]) {
            effect(local);
            opt.scope.effectRun[opt.item.id] = true;
          }
        }
      }
    }, []);

    return children;
  };
};
