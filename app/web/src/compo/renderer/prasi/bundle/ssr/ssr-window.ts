import { npm_page, npm_site, page, site } from "dbgen";
import { IItem } from "../../../../types/item";

export const w = window as unknown as {
  __SRV_URL__: string;
  siteApiUrl: string;
  isEditor: false;
  ssrResult: Promise<string>;
  extractCss: () => string;
  stream: any;
  prasi: {
    site: site;
    page: page;
    comps: Record<string, { id: string; content_tree: IItem }>;
  };
  npm: {
    site?: string;
    page?: string;
  };
  exports: any
};
