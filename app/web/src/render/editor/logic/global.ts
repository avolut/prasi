import { ReactElement } from "react";
import * as Y from "yjs";
import { CompDoc } from "../../../base/global/content-editor";
import { MContent, MPage } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { FNCompDef } from "../../../utils/types/meta-fn";
import { IRoot } from "../../../utils/types/root";

export const EditorGlobal = {
  /** ui */
  mode: "" as "desktop" | "mobile",
  status: "init" as "init" | "loading" | "ready" | "not-found" | "error",
  manager: {
    page: false,
    site: false,
    comp: true,
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
    multiple: [] as string[],
    copy: {
      mode: "single" as "single" | "multiple",
    },
  },
  softRender: {
    tree: () => {},
    page: () => {},
    side: () => {},
    all() {
      this.tree();
      this.page();
      this.side();
    },
  },

  /**  read-only */
  session: { id: "", data: { user: { id: "", username: "" } } },
  site: {
    id: "",
    api_url: "",
    domain: "",
    name: "",
    js: "",
    js_compiled: "",
  },
  page: null as null | {
    id: string;
    name: string;
    url: string;
    content_tree: IRoot;
    js: string;
  },
  comp: null as null | {
    id: string;
    content_tree: IItem;
  },
  compEdits: [] as IItem[],

  /** write-only */
  itemProps: {} as Record<string, any>,
  treeMeta: {} as Record<
    string,
    {
      item: MContent;
      comp?: IItem;
      passprop?: any;
      local?: any;
      passchild?: any;
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
  wsRetry: { fast: false, localIP: false, disabled: false },
  ui: {
    loading: null as null | ReactElement,
    preload: null as null | ReactElement,
    notfound: null as null | ReactElement,
    error: null as null | ReactElement,
  },
};

export type PG = typeof EditorGlobal & { render: () => void };
