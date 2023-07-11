import { FC, ReactNode } from "react";
import { SingleScope } from "../../../base/global/content-editor";
import { IContent } from "../../types/general";

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
