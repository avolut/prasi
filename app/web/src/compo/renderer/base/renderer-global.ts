import { ReactElement } from "react";
import { RadixRouter } from "web-init";
import { IItem } from "../../types/item";
import { SingleScope } from "../../types/script";
import { PRASI_COMPONENT, PRASI_PAGE } from "./renderer-types";

export const RendererGlobal = {
  loading: true,
  ui: {
    loading: null as null | ReactElement,
    notfound: null as null | ReactElement,
  },
  site: { id: "", api_url: "", updated_at: "", js_compiled: "" },
  mode: "" as "desktop" | "mobile",
  instances: {} as Record<string, IItem>,
  component: {
    def: {} as Record<string, { id: string; content_tree: IItem }>,
    loading: {} as Record<string, true>,
    load: async (ids: string[]) => {
      return [] as PRASI_COMPONENT[];
    },
    scanMode: "server-side" as "server-side" | "client-side",
  },
  page: {
    active: null as null | PRASI_PAGE,
    list: {} as Record<string, PRASI_PAGE>,
    router: null as null | RadixRouter<PRASI_PAGE>,
    preloads: {} as Record<string, Promise<Required<PRASI_PAGE>>>,
    load: async (page_id: string, preload?: boolean) => {
      return null as null | Required<PRASI_PAGE>;
    },
  },
};
