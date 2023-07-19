import { validate } from "uuid";
import { page } from "web-init";
import {
  PRASI_COMPONENT,
  PRASI_PAGE,
} from "../../compo/renderer/base/renderer-types";
import { Prasi } from "../../compo/renderer/prasi/prasi-renderer";
import { SiteConfig } from "../../compo/editor/ws/wsdoc";

export default page({
  url: "/site/:name/**",
  component: () => {
    const site = new Prasi({
      load: {
        async site() {
          const site = await db.site.findFirst({
            where: validate(params.name)
              ? { id: params.name }
              : { domain: params.name },
            select: {
              id: true,
              config: true,
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
            };
          }
          return { id: "", api_url: "" };
        },
        async page(rg, page_id) {
          const page = await db.page.findFirst({
            where: { id: page_id },
            select: {
              id: true,
              url: true,
              name: true,
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

          return (all || []) as PRASI_COMPONENT[];
        },
      },
    });

    return site.renderPage(params._ === "_" ? "/" : `/${params._}`);
  },
});
