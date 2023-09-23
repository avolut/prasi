import { FC } from "react";
import { createRouter } from "web-init";
import { CompDoc } from "../../../base/global/content-editor";
import { IContent, MContent, MPage } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { PRASI_COMPONENT } from "../../../utils/types/render";
import { IRoot } from "../../../utils/types/root";

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type ItemMeta = {
  item: IContent;
  mitem?: MContent;
  scope?: any;
  scopeAttached?: any;
  comp?: {
    id: string;
    propval?: any;
    mcomp?: MItem;
    child_ids: Record<string, string>;
  };
  className?: string;
  parent_id: string;
  parent_comp?: WithRequired<ItemMeta, "comp"> & { item: IItem };
  memoize?: {
    Local: FC<any>;
    PassProp: FC<any>;
  };
  render?: () => void;
};

type LPage = {
  id: string;
  name: string;
  url: string;
  content_tree: IRoot;
  js: string;
};

export const LiveGlobal = {
  mode: "" as "desktop" | "mobile",
  status: "init" as
    | "init"
    | "loading"
    | "reload"
    | "ready"
    | "not-found"
    | "error"
    | "tree-rebuild",
  site: {
    id: "",
    api_url: "",
    api_prasi: {
      port: "",
      db: "",
    },
    responsive: "all" as "all" | "mobile-only" | "desktop-only",
    domain: "",
    name: "",
    js: "",
    js_compiled: "",
  },
  mpage: null as null | MPage,
  mpageLoaded: null as null | ((mpage: MPage) => void),
  pagePreload: {} as Record<string, true>,
  pages: {} as Record<string, LPage>,
  route: createRouter<{
    id: string;
    url: string;
  }>(),
  treeMeta: {} as Record<string, ItemMeta>,
  comps: {
    pending: {} as Record<string, Promise<PRASI_COMPONENT>>,
    resolve: {} as Record<string, (comp: PRASI_COMPONENT) => void>,
    doc: {} as Record<string, CompDoc>,
  },
  script: {
    db: null as any,
    api: null as any,
  },
  compInstance: {} as Record<string, Record<string, string>>,
  ws: null as null | WebSocket,
  wsRetry: {
    fast: false,
    localIP: false,
    disabled: false,
    reconnecting: false,
  },
};

export type PG = typeof LiveGlobal & { render: () => void };
