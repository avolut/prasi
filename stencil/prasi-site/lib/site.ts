import { RadixRouter } from "radix3";

export type Page = {
  id: string;
  name: string;
  url: string;
  content_tree?: any;
  js_compiled: string | null;
};
export type Site = {
  id: string;
  domain: string;
  router: RadixRouter<Page>;
  loader: {
    router?: NodeJS.Timeout;
  };
};

const g = globalThis as any;
if (!g.prasiSites) {
  g.prasiSites = {};
}
export const sites = g.prasiSites as Record<string, Site>;
