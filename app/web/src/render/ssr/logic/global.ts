import { ReactElement } from "react";
import { createRouter } from "web-init";
import { CompDoc } from "../../../base/global/content-editor";
import { MPage } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { w } from "./window";

export const SSRGlobal = {
  mode: w.ssrPrasi.mode,
  status: "init" as "init" | "loading" | "ready" | "not-found" | "error",
  site: w.ssrPrasi.site,
  page: w.ssrPrasi.page,
  pageComp: {} as Record<string, IItem>,
  treeMeta: {} as Record<
    string,
    {
      passprop?: any;
      local?: any;
      passchild?: any;
    }
  >,
  comp: {
    pending: {} as Record<string, any>,
    doc: {} as Record<string, CompDoc>,
  },
  ui: {
    loading: null as null | ReactElement,
    preload: null as null | ReactElement,
    notfound: null as null | ReactElement,
    error: null as null | ReactElement,
  },
};

export type PG = typeof SSRGlobal & { render: () => void };
