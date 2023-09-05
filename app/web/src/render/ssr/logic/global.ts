import { ReactElement } from "react";
import { IItem } from "../../../utils/types/item";
import { w } from "./window";
import { PRASI_COMPONENT } from "../../../utils/types/render";

export const SSRGlobal = {
  mode: w.ssrPrasi.mode,
  status: "init" as "init" | "loading" | "ready" | "not-found" | "error",
  site: w.ssrPrasi.site,
  page: w.ssrPrasi.page,
  pageComp: {} as Record<string, IItem>,
  comp: {
    raw: {} as Record<string, PRASI_COMPONENT>,
    pending: {} as Record<string, any>,
  },
  treeMeta: {} as Record<
    string,
    {
      passprop?: any;
      local?: any;
      passchild?: any;
    }
  >,
  ui: {
    loading: null as null | ReactElement,
    preload: null as null | ReactElement,
    notfound: null as null | ReactElement,
    error: null as null | ReactElement,
  },
};

export type PG = typeof SSRGlobal & { render: () => void };
