import { page, site } from "dbgen";
import { ReactElement } from "react";
import { IRoot } from "../../../utils/types/root";

export const w = window as unknown as {
  __SRV_URL__: string;
  siteApiUrl: string;
  isEditor: false;
  isSSR: true;
  ssrRender: ReactElement;
  ssrResult: Promise<string>;
  ssrPrasi: {
    site: site & { api_url: string };
    page: page & { content_tree: IRoot };
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
