import { FC } from "react";
import { Request, Response } from "hyper-express";
import { Asset } from "../../src/asset";

export type PageResponse = {
  pathname: string;
  params: Record<string, any>;
  statusCode: number;
};

export type BPage = {
  name?: string;
  url: string;
  ssr?: boolean;
  layout?: string;
  path?: string;
  component:
    | FC<Record<string, any> & { res: PageResponse }>
    | PromisedComponent;
};

export type OnRequestSSR = (arg: {
  req: Request;
  res: Response;
  ssr: {
    stream: (props?: Record<string, any>) => Promise<string>;
    render: (props?: Record<string, any>) => Promise<string>;
  };
  asset: Asset;
  mode: "dev" | "prod" | "staging";
}) => any;

export type SSR = {
  App: FC<{
    initScript: string;
    name: string;
    props: Record<string, any>;
    res: PageResponse;
    indexCSS?: string;
    onlyRoot?: boolean;
  }> | null;
  handler: Record<string, OnRequestSSR>;
  initScript: (inject: string) => string;
};

export type PromisedComponent = () => Promise<{
  default: { component: FC<any>; layout?: string };
}>;
