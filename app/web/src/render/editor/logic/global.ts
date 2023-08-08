import { ReactElement } from "react";
import { CompDoc } from "../../../base/global/content-editor";
import { MPage } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { MetaItem } from "../../../utils/types/meta";
import { IRoot } from "../../../utils/types/root";
import { FNCompDef } from "../../../utils/types/meta-fn";

export const EditorGlobal = {
  /** ui */
  mode: "" as "desktop" | "mobile",
  status: "init" as "init" | "loading" | "ready" | "not-found" | "error",
  manager: { page: false, site: false },

  /**  read-only */
  session: { id: "", data: { user: { id: "", username: "" } } },
  site: {
    id: "",
    api_url: "",
    domain: "",
    name: "",
    js: "",
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
    props: Record<string, FNCompDef>;
  },
  pageCMemo: {} as Record<string, Exclude<MetaItem["cmemo"], undefined>>,
  pageComp: {} as Record<string, IItem>,

  /** write-only */
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
