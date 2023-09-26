import { FC } from "react";

export type PageResponse = {
  pathname: string;
  params: Record<string, any>;
  statusCode: number;
};

export type BPage = {
  name?: string;
  url: string;
  layout?: string;
  path?: string;
  component:
    | FC<Record<string, any> & { res: PageResponse }>
    | PromisedComponent;
};

export type PromisedComponent = () => Promise<{
  default: { component: FC<any>; layout?: string };
}>;
