import { FC } from "react";
import { PageResponse } from "../types";

export const page = (arg: {
  name?: string;
  url: string;
  ssr?: boolean;
  layout?: string;
  path?: string;
  component:
    | FC<Record<string, any> & { res: PageResponse }>
    | PromisedComponent; 
}) => {
  return arg;
};

export type PromisedComponent = () => Promise<{
  default: { component: FC<any>; layout?: string };
}>;
