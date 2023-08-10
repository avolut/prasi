import { page, site } from "dbgen";
import { IItem } from "../../utils/types/item";
import { ReactElement } from "react";

export const w = window as unknown as {
  __SRV_URL__: string;
  siteApiUrl: string;
  isEditor: false;
  ssrRender: ReactElement;
  ssrResult: Promise<string>;
  extractCss: () => string;
  stream: any;
  prasi: { domain: string; pathname: string };
  npm: {
    site?: string;
    page?: string;
  };
  exports: any;
};
