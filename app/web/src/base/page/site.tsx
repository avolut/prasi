import { validate } from "uuid";
import { page } from "web-init";
import { useLocal } from "web-utils";
import {
  PageLocal,
  compPreview,
  pagePreview,
} from "../../compo/editor/ws/preview";
import { SiteConfig } from "../../compo/editor/ws/wsdoc";
import { PRASI_PAGE } from "../../compo/renderer/base/renderer-types";
import { PrasiRenderer } from "../../compo/renderer/prasi/prasi-renderer";
import { MPage } from "../../compo/types/general";
import { navOverride } from "../../compo/editor/nav";

export default page({
  url: "/site/:name/**",
  component: () => {
    const local = useLocal(PageLocal);
    navOverride();

    local.site = new PrasiRenderer({
      load: {
        async site() {
          const site = await db.site.findFirst({
            where: validate(params.name)
              ? { id: params.name }
              : { domain: params.name },
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
        async page(rg, page_id, preload) {
          if (preload) {
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
          }
          const doc = await new Promise<MPage>(async (resolve) => {
            await pagePreview(local, page_id, resolve);
          });

          return doc.getMap("map").toJSON() as Required<PRASI_PAGE>;
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
              updated_at: true,
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
          return (
            await Promise.all(
              ids.map((id) => {
                return compPreview(local, id);
              })
            )
          ).map((e) => {
            return {
              name: e.name,
              id: e.id,
              content_tree: e.content_tree,
            };
          });
        },
      },
    });

    return local.site.renderPage(params._ === "_" ? "/" : `/${params._}`);
  },
});
