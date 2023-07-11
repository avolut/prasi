import { FC, ReactNode, useEffect, useRef } from "react";
import { useLocal } from "web-utils";
import { IContent } from "../../types/general";
import { SingleScope } from "../../../base/global/content-editor";

export type LocalFC = FC<{
  children: ReactNode;
  name: string;
  value: Record<string, any> & { render: () => void };
  effect?: () => void | (() => void);
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
    if (!scope[name]) scope[name] = local;

    if (effect) {
      useEffect(effect, deps || []);
    }

    return children;
  };
};
