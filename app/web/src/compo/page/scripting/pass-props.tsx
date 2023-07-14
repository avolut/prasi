import { FC, ReactNode } from "react";
import { IContent } from "../../types/general";
import { SingleScope } from "../../types/script";

export const createPassProps: (opt: {
  item: IContent;
  scope: SingleScope;
}) => FC<
  Record<string, any> & {
    children: ReactNode;
  }
> = (opt) => {
  return (arg) => {
    const { children } = arg;

    if (!opt.scope.value[opt.item.id]) {
      opt.scope.value[opt.item.id] = {};
    }
    const scope = opt.scope.value[opt.item.id];

    if (arg) {
      for (const [k, v] of Object.entries(arg)) {
        if (k === "children") continue;
        scope[k] = v;
      }
    }

    return <>{children}</>;
  };
};
