import { FC, ReactElement, ReactNode } from "react";
import { createRouter } from "web-init";
import { CompDoc } from "../../../base/global/content-editor";
import { IContent, MContent, MPage } from "../../../utils/types/general";
import { IItem, MItem } from "../../../utils/types/item";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { PRASI_COMPONENT } from "../../../utils/types/render";
import { IRoot } from "../../../utils/types/root";
import { LSite } from "../../live/logic/global";
import { ISection } from "../../../utils/types/section";
import { IText } from "../../../utils/types/text";

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type NodeMeta = { meta: ItemMeta; idx: number };
export type ItemMeta = {
  mitem?: MContent;
  item: IContent;
  parent_id: string;
  parent_comp?: WithRequired<ItemMeta, "comp"> & { item: IItem };
  parent_prop?: ItemMeta;
  scope?: any;
  scopeAttached?: { meta: ItemMeta; value: any }[];
  className: string;
  elprop: any;
  depth: number;
  memoize?: {
    Local: FC<any>;
    PassProp: FC<any>;
  };
  comp?: {
    id: string;
    mcomp?: MItem;
    propval?: any;
    propvis?: Record<string, boolean>;
    child_ids: Record<string, string>;
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
  pendingRebuild: false,
  localReloading: {} as Record<string, true>,
  manager: {
    page: false,
    site: false,
    comp: false,
    compActionLabel: "Pick",
    compCallback: (comp: any) => {},
    compPreviewRendered: new Set<string>(),
  },
  script: {
    siteActive: false,
    siteTypes: {},
    prop: null as null | {
      name: string;
      mode:
        | "instance"
        | "master-value"
        | "master-option"
        | "master-visible"
        | "master-gen";
    },
    toolbar: null as ReactNode,
    active: false,
    type: "js" as "js" | "css" | "html",
    db: null as any,
    api: null as any,
    onClose: undefined as undefined | (() => void),
    doEdit: null as null | ((newval: string, all?: boolean) => Promise<void>),
  },
  item: {
    active: "",
    activeOriginalId: "",
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
  lsite: null as any,
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
  } as LSite,

  layout: {
    section: null as null | ISection,
    content: null as null | IItem | IText,
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
  treeFlatTemp: [] as {
    id: string;
    parent: string;
    text: string;
    data: { meta: ItemMeta; idx: number };
  }[],
  treeMeta: {} as Record<string, ItemMeta>,

  /** components */
  comp: null as null | {
    id: string;
    instance_id?: string;
    last: {
      comp_id?: string;
      active_id: string;
      active_oid?: string;
      instance_id?: string;
      props?: Record<string, FNCompDef>;
    }[];
    props: Record<string, FNCompDef>;
  },
  comps: {
    pending: {} as Record<string, Promise<PRASI_COMPONENT>>,
    resolve: {} as Record<string, (comp: PRASI_COMPONENT) => void>,
    doc: {} as Record<string, CompDoc>,
  },
  compProp: {
    backToInstance: false,
    edit: false,
    inherit: true,
  },
  compDirectEdit: false,
  compLoading: {} as Record<string, true>,
  compInstance: {} as Record<string, Record<string, string>>,

  /** routing */
  pagePreload: {} as Record<string, true>,
  route: createRouter<{
    id: string;
    url: string;
  }>(),

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
