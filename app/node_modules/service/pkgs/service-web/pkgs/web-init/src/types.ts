import { CSSAttribute, extractCss as GooberExtractCSS } from "goober";
import { RadixRouter } from "radix3";
import React, { FC, ReactNode } from "react";
import { OnRequestSSR, BPage as Page, SSR } from "web-types";
import { PrismaClient } from "../../../../../../../app/db/node_modules/.gen";
import type * as SRVAPI from "../../../../../../../app/gen/srv/api/srv";
import { DbDefCols, DbDefRels } from "service-db/src/glbdb";

export type PageResponse = {
  pathname: string;
  params: Record<string, any>;
  statusCode: number;
};

type Api = typeof SRVAPI;
type ApiName = keyof Api;

interface WebGlobal {
  extractCss: typeof GooberExtractCSS;
  router: RadixRouter<Page>;
  routerSSR: RadixRouter<{ ssr: OnRequestSSR; params: any }>;
  navigate: (href: string) => void;
  isSSR: boolean;

  __WEB_NAME__: string;
  __SRV_URL__: string;
  __SSR__: SSR;
  __PAGES__: Record<string, Page>;
  __MODE__: "dev" | "prod" | "staging";
  __SSR_PROP__: Record<string, any>;
  __STATUS_CODE__: number;
  __LAYOUTS__: Record<
    string,
    | FC<{ children: ReactNode }>
    | { default: Promise<{ default: FC<{ children: ReactNode }> }> }
  >;
  __CURPAGE__: Page;

  db: PrismaClient & {
    _tables: () => Promise<string[]>;
    _definition: (
      table: string
    ) => Promise<{ db: { name: string }; rels: DbDefRels; columns: DbDefCols }>;
  };
  api: { [k in ApiName]: Awaited<Api[k]["handler"]>["_"]["api"] };

  basepath: string;
  baseurl: string;
  serverurl: string;
  pathname: string;
  params: any;

  notFoundPage: Page;

  Fragment: typeof React.Fragment;
  React: typeof React;

  cx: (...classNames: any[]) => string;
  css: (
    tag: CSSAttribute | TemplateStringsArray | string,
    ...props: Array<string | number | boolean | undefined | null>
  ) => string;
}

declare global {
  const isSSR: boolean;
  const css: WebGlobal["css"];
  const cx: WebGlobal["cx"];

  const db: WebGlobal["db"];
  const api: WebGlobal["api"];

  const navigate: WebGlobal["navigate"];

  const __SRV_URL__: WebGlobal["__SRV_URL__"];

  const basepath: string;
  const baseurl: string;
  const serverurl: string;
  const pathname: string;
  const params: any;
}

export const g = (typeof global === "undefined"
  ? window
  : global) as unknown as WebGlobal;
