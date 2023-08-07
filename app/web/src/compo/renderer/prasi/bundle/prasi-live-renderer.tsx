import type { SiteConfig } from "../../../editor/ws/wsdoc";
import importModule from "../../../page/tools/dynamic-import";
import type { PRASI_COMPONENT, PRASI_PAGE } from "../../base/renderer-types";
import { PrasiRenderer } from "../prasi-renderer";

export type PrasiLiveArg = {
  domain?: string;
  site_id?: string;
  pathname: string;
};
export const praseiLiveRenderer = (arg: {
  Loading: any;
  NotFound: any;
  live: PrasiLiveArg;
  props?: any;
}) => {
  const { live, Loading, NotFound, props } = arg;

  if (!(live.site_id || live.domain)) {
    return null;
  }

  return new PrasiRenderer({
    props,
    component: {
      loading: Loading,
      notfound: NotFound,
    },
    load: {
      async site() {
        const site = await db.site.findFirst({
          where: live.site_id ? { id: live.site_id } : { domain: live.domain },
          select: {
            id: true,
            config: true,
            updated_at: true,
            js_compiled: true,
          },
        });
        if (site) {
          const config = site.config as SiteConfig;

          let api_url = config.api_url as string;
          if (config.prasi && config.prasi.port) {
            api_url = `https://${config?.prasi?.port}.prasi.world`;
          }

          return {
            id: site.id,
            api_url,
            updated_at: (site.updated_at instanceof Date
              ? site.updated_at.toISOString()
              : site.updated_at) as string,
            js_compiled: site.js_compiled || "",
          };
        }
        return { id: "", api_url: "", updated_at: "", js_compiled: "" };
      },
      async page(rg, page_id) {
        const page = await db.page.findFirst({
          where: { id: page_id },
          select: {
            id: true,
            url: true,
            name: true,
            updated_at: true,
            js_compiled: true,
            content_tree: true,
          },
        });

        if (page) {
          return page as Required<PRASI_PAGE>;
        }
        return null;
      },
      async pages(rg) {
        const all = await db.page.findMany({
          where: {
            id_site: rg.site.id,
            is_deleted: false,
          },
          select: {
            id: true,
            updated_at: true,
            url: true,
            name: true,
          },
        });

        const pages: any = {};
        for (const p of all) {
          pages[p.id] = p;
        }

        return pages;
      },
      async components(rg, ids) {
        const all = await db.component.findMany({
          where: { id: { in: ids } },
          select: {
            id: true,
            content_tree: true,
            name: true,
          },
        });

        return (all || []).map((e) => {
          return {
            name: e.name,
            id: e.id,
            content_tree: e.content_tree,
          } as PRASI_COMPONENT;
        });
      },
    },
  });
};