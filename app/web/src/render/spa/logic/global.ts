import { createRouter } from "web-init";
import { IItem } from "../../../utils/types/item";
import { IRoot } from "../../../utils/types/root";
import { ReactElement } from "react";
import { PRASI_COMPONENT } from "../../../utils/types/render";

export type PrasiOpt = {
  showLoading?: boolean;
  exports?: any;
  baseUrl?: string;
};
export type SPAPage = {
  id: string;
  url: string;
  content_tree: IRoot;
  js: string;
};
export type PG = typeof SPAGlobal & { render: () => void };
export const SPAGlobal = {
  status: "init" as "init" | "ready" | "loading" | "not-found",
  mode: "mobile" as "mobile" | "desktop",
  baseUrl: new URL(location.href),
  site: {
    id: "",
    js: "",
    npm: "",
    api_url: "",
    responsive: "" as "" | "all" | "mobile-only" | "desktop-only",
  },
  treeMeta: {} as Record<
    string,
    {
      passprop?: any;
      local?: any;
      passchild?: any;
    }
  >,
  comp: {
    raw: {} as Record<string, PRASI_COMPONENT>,
    pending: {} as Record<string, any>,
  },
  pages: {} as Record<string, SPAPage>,
  page: null as null | SPAPage,
  pagePreload: {} as Record<string, true>,
  pageComp: {} as Record<string, IItem>,
  ui: {
    loading: null as null | ReactElement,
    preload: null as null | ReactElement,
    notfound: null as null | ReactElement,
    error: null as null | ReactElement,
  },
  route: createRouter<{
    id: string;
    url: string;
  }>(),
};
