import { ReactElement } from "react";
import { RadixRouter } from "web-init";
import { PRASI_PAGE } from "./renderer-types";

export const RendererGlobal = {
  loading: true,
  ui: {
    loading: null as null | ReactElement,
    notfound: null as null | ReactElement,
  },
  site: { id: "" },
  mode: "desktop" as "desktop" | "mobile",
  page: {
    active: null as null | PRASI_PAGE,
    list: {} as Record<string, PRASI_PAGE>,
    router: null as null | RadixRouter<PRASI_PAGE>,
    load: async (page_id: string) => {
      return null as null | Required<PRASI_PAGE>;
    },
  },
};
