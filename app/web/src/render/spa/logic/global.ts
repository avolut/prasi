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
  npm: string;
};
export type PG = typeof SPAGlobal & { render: () => void };
export const SPAGlobal = {
  mode: "mobile" as "mobile" | "desktop",
  baseUrl: "",
  site: { id: "", js: "", npm: "" },
  current: {
    pathname: "",
    page: null as null | SPAPage,
    params: {} as any,
    treeMeta: {} as Record<
      string,
      {
        item: IItem;
        comp?: IItem;
        passprop?: any;
        local?: any;
        passchild?: any;
      }
    >,
  },
  pages: {} as Record<string, SPAPage>,
  comps: {} as Record<string, { id: string; content_tree: IItem }>,
  route: createRouter<{
    id: string;
    url: string;
  }>(),
};
