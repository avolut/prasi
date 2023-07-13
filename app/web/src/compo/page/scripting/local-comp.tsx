import { FC, ReactNode, useEffect, useRef } from "react";
import { SingleScope } from "../../../base/global/content-editor";
import { IContent, w } from "../../types/general";
import { createId } from "@paralleldrive/cuid2";

export type LocalFC = FC<{
  children: ReactNode;
  name: string;
  value: Record<string, any> & { render: () => void };
  effect?: (
    local: Record<string, any> & { render: () => void }
  ) => void | (() => void);
  deps?: any[];
}>;

export const createLocal = (opt: {
  item: IContent;
  scope: SingleScope;
  render: () => void;
}): LocalFC => {
  return ({ name, children, value, effect, deps }) => {
    if (!opt.scope.value[opt.item.id]) {
      opt.scope.value[opt.item.id] = {};
    }
    const scope = opt.scope.value[opt.item.id];

    const local = scope[name] ? scope[name] : useRef(value).current;
    local.render = opt.render;

    if (!scope[name]) {
      scope[name] = local;
    }

    for (const [k, v] of Object.entries(local)) {
      if (typeof value[k] === "undefined") delete local[k];
    }

    for (const [k, v] of Object.entries(value)) {
      if (k !== "render") local[k] = v;
    }

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
        }, deps || []);
      } else {
        if (!opt.scope.effect) {
          opt.scope.effect = {};
        }

        opt.scope.effect[opt.item.id] = { name, effect };
      }
    }

    return children;
  };
};
