import { ReactElement } from "react";

export const w = window as unknown as {
  __SRV_URL__: string;
  siteApiUrl: string;
  isEditor: false;
  isSSR: true;
  ssrRender: ReactElement;
  ssrResult: Promise<string>;
  ssrConfig: {
    timeout: number;
    waitDone: false;
  };
  extractCss: () => string;
  stream: any;
  prasi: { domain: string; pathname: string };
  npm: {
    site?: string;
    page?: string;
  };
  exports: any;
};
