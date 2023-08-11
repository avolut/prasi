import { page, site } from "dbgen";
import { ReactElement } from "react";

export const w = window as unknown as {
  __SRV_URL__: string;
  siteApiUrl: string;
  isEditor: false;
  isSSR: true;
  ssrRender: ReactElement;
  ssrResult: Promise<string>;
  ssrPrasi: {
    site: site;
    page: page;
    mode: "mobile" | "desktop";
  };
  ssrConfig: {
    timeout: number;
    waitDone: false;
  };
  extractCss: () => string;
  stream: any;
  npm: {
    site?: string;
    page?: string;
  };
  exports: any;
};
