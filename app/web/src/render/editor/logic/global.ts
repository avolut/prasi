import { ReactElement } from "react";
import { CompDoc } from "../../../base/global/content-editor";
import { IContent, MContent, MPage } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { IRoot } from "../../../utils/types/root";

export const EditorGlobal = {
  /** ui */
  mode: "" as "desktop" | "mobile",
  status: "init" as
    | "init"
    | "loading"
    | "reload"
    | "ready"
    | "not-found"
    | "error",
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
  comp: null as null | {
    id: string;
    item: IItem;
    content_tree: IItem;
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

  /** write-only */
  treeMeta: {} as Record<
    string,
    {
      mitem: MContent;
      item: IContent;
      comp?: IItem;
      passprop?: any;
      local?: any;
      passchild?: any;
      js?: string;
    }
  >,
  mpage: null as null | MPage,
  mpageLoaded: null as null | ((mpage: MPage) => void),
  comps: {
    pending: {} as Record<string, any>,
    doc: {} as Record<string, CompDoc>,
  },

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
