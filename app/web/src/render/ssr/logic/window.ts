import { page, site } from "dbgen";
import { ReactElement } from "react";
import { IRoot } from "../../../utils/types/root";

export const w = window as unknown as {
  __SRV_URL__: string;
  siteApiUrl: string;
  isEditor: false;
  isSSR: true;
  ssrRender: ReactElement;
  apiClient: any;
  ssrResult: Promise<string>;
  ssrPrasi: {
    site: site & { api_url: string };
    page: page & { content_tree: IRoot };
    mode: "mobile" | "desktop";
  };
  ssrGlobalFont: string[];
  ssrContext: {
    global: any;
    render: () => void;
    ssrLocalEffect: Record<string, { done: boolean; fn: () => Promise<void> }>;
    ssrShouldRender: boolean;
  };
  ssrConfig: {
    timeout: number;
    waitDone: boolean;
    renderTwice: boolean;
  };
  extractCss: () => string;
  stream: any;
  npm: {
    site?: string;
    page?: string;
  };
  exports: any;
};
