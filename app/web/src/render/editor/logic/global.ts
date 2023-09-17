import { ReactElement } from "react";
import { TypedMap } from "yjs-types";
import { CompDoc } from "../../../base/global/content-editor";
import { IContent, MContent, MPage } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { FMCompDef } from "../../../utils/types/meta-fn";
import { IRoot } from "../../../utils/types/root";

export type NodeMeta = { meta: ItemMeta; idx: number };
export type ItemMeta = {
  mitem: MContent;
  item: IContent;
  scope: any;
  comp?: {
    id: string;
    mitem: MItem;
    mcomp: MItem;
    mprops?: TypedMap<Record<string, FMCompDef>>;
  };
  script: {
    passprop?: any;
    local?: any;
    passchild?: any;
    js?: string;
  };
};

export const EditorGlobal = {
  /** ui */
  mode: "" as "desktop" | "mobile",
  status: "init" as
    | "init"
    | "loading"
    | "reload"
    | "ready"
    | "not-found"
    | "error"
    | "tree-rebuild",
  focused: "",
  manager: {
    page: false,
    site: false,
    comp: false,
    compActionLabel: "Pick",
    compCallback: (comp: any) => {},
  },
  script: {
    siteActive: false,
    siteTypes: {},
    active: false,
    type: "js" as "js" | "css" | "html",
  },
  item: {
    active: localStorage.getItem("prasi-item-active-id") || "",
    hover: "",
    sideHover: false,
    selectMode: "single" as "single" | "multi",
    selection: [] as string[],
    copy: {
      mode: "single" as "single" | "multiple",
    },
  },
  preventTreeScroll: false,
  softRender: {
    tree: () => {},
    page: () => {},
    side: () => {},
    addEl: () => {},
    topR: () => {},
    all() {
      this.tree();
      this.page();
      this.side();
      this.addEl();
      this.topR();
    },
  },

  /**  read-only */
  session: { id: "", data: { user: { id: "", username: "" } } },
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
  site_dts: "",
  page: null as null | {
    id: string;
    name: string;
    url: string;
    content_tree: IRoot;
    js: string;
    effects?: Record<string, boolean>;
  },

  /** content tree */
  treeFlat: [] as {
    id: string;
    parent: string;
    text: string;
    data: { meta: ItemMeta; idx: number };
  }[],
  treeMeta: {} as Record<string, ItemMeta>,

  /** components */
  comp: null as null | {
    id: string;
    item: IItem;
    content_tree: IItem;
  },
  comps: {
    pending: {} as Record<string, any>,
    doc: {} as Record<string, CompDoc>,
  },
  compProp: {
    backTo: "",
    backToComp: null as any,
    edit: false,
    inherit: true,
  },
  compDirectEdit: false,
  compEdits: [] as IItem[],
  compLoading: {} as Record<string, true>,
  compInstance: {} as Record<string, Set<ItemMeta>>,

  /** write-only */
  mpage: null as null | MPage,
  mpageLoaded: null as null | ((mpage: MPage) => void),

  /** connection */
  ws: null as null | WebSocket,
  wsPing: -1,
  wsPingTs: 0,
  wsPingInterval: null as any,
  wsRetry: {
    fast: false,
    localIP: false,
    disabled: false,
    reconnecting: false,
  },
  ui: {
    loading: null as null | ReactElement,
    preload: null as null | ReactElement,
    notfound: null as null | ReactElement,
    error: null as null | ReactElement,
  },
};

export type PG = typeof EditorGlobal & { render: () => void };
