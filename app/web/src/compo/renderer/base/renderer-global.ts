import { ReactElement } from "react";
import { RadixRouter } from "web-init";
import { SingleScope } from "../../types/script";
import { PRASI_COMPONENT, PRASI_PAGE } from "./renderer-types";
import { IItem } from "../../types/item";
import { produce } from "immer";
export const RendererGlobal = {
  loading: true,
  ui: {
    loading: null as null | ReactElement,
    notfound: null as null | ReactElement,
  },
  site: { id: "", api_url: "", js_compiled: "" },
  mode: "" as "desktop" | "mobile",
  scope: {
    tree: {},
    effect: {},
    value: {},
    evargs: {},
    types: {},
  } as SingleScope,
  component: {
    def: {} as Record<string, { id: string; content_tree: IItem }>,
    load: async (ids: string[]) => {
      return [] as PRASI_COMPONENT[];
    },
  },
  page: {
    active: null as null | PRASI_PAGE,
    list: {} as Record<string, PRASI_PAGE>,
    router: null as null | RadixRouter<PRASI_PAGE>,
    load: async (page_id: string) => {
      return null as null | Required<PRASI_PAGE>;
    },
  },
};
