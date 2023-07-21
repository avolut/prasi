import { createRouter } from "service/pkgs/service-web/pkgs/web-init";
import { eg } from "./edit-global";

export const loadRouter = async (site_id: string) => {
  if (!eg.cache) eg.cache = {};
  if (!eg.cache[site_id]) eg.cache[site_id] = {};

  if (!eg.router) {
    eg.router = {};
  }

  if (!eg.router[site_id]) {
    const pages = await db.page.findMany({
      where: { id_site: site_id, is_deleted: false },
      select: { id: true, url: true },
    });
    const router = createRouter<any>();
    for (const page of pages) {
      eg.cache[site_id][page.id] = { ...page } as any;
      router.insert(page.url, page);
    }
    eg.router[site_id] = router;
  }
  return eg.router[site_id];
};
