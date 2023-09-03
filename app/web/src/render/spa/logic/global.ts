import { createRouter } from "web-init";
import { IItem } from "../../../utils/types/item";
import { IRoot } from "../../../utils/types/root";

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
  site: { id: "", js: "", npm: "" },
  treeMeta: {} as Record<
    string,
    {
      passprop?: any;
      local?: any;
      passchild?: any;
    }
  >,
  pages: {} as Record<string, SPAPage>,
  page: null as null | SPAPage,
  pagePreload: {} as Record<string, true>,
  comps: {} as Record<string, { id: string; content_tree: IItem }>,
  route: createRouter<{
    id: string;
    url: string;
  }>(),
};
