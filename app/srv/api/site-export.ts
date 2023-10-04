import { apiContext } from "service-srv";
import createCompress from "compress-brotli";

const { compress } = createCompress();
export const _ = {
  url: "/site-export/:site_id",
  async api(site_id: string) {
    const { req, res } = apiContext(this);
    const site = await db.site.findFirst({ where: { id: site_id } });
    const pages = await db.page.findMany({
      where: {
        id_site: site_id,
        is_deleted: false,
      },
    });
    const comps = await db.component.findMany({
      where: {
        component_group: {
          component_site: {
            some: {
              id_site: site_id,
            },
          },
        },
      },
    });
    const npm = {
      site: "",
      pages: {} as Record<string, string>,
    };
    const compressed = await compress(
      JSON.stringify({ site, pages, npm, comps })
    );
    return compressed.toString();
  },
};
