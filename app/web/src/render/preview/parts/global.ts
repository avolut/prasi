import { ReactElement } from "react";
import { createRouter } from "web-init";
import { CompDoc } from "../../../base/global/content-editor";
import { MPage } from "../../../compo/types/general";
import { IItem } from "../../../compo/types/item";
import { IRoot } from "../../../compo/types/root";

export const PreviewGlobal = {
  mode: "" as "desktop" | "mobile",
  status: "init" as "init" | "loading" | "ready" | "not-found" | "error",
  site: {
    id: "",
    api_url: "",
  },
  mpage: null as null | MPage,
  mpageLoaded: null as null | ((mpage: MPage) => void),
  page: null as null | {
    id: string;
    content_tree: IRoot;
    js: string;
    npm: string;
  },
  pages: {} as Record<
    string,
    {
      id: string;
      content_tree: IRoot;
      js: string;
      npm: string;
    }
  >,
  pageComp: {} as Record<string, IItem>,
  pagePreload: {} as Record<string, true>,
  comp: {
    pending: {} as Record<string, any>,
    doc: {} as Record<string, CompDoc>,
  },
  route: createRouter<{
    id: string;
    url: string;
  }>(),
  ws: null as null | WebSocket,
  wsRetry: { fast: false, localIP: false, disabled: false },
  ui: {
    loading: null as null | ReactElement,
    preload: null as null | ReactElement,
    notfound: null as null | ReactElement,
    error: null as null | ReactElement,
  },
};

export type PG = typeof PreviewGlobal & { render: () => void };
