import { eg } from "../edit-global";

// page cache timeout, in seconds
const PAGE_CACHE_TIMEOUT = 1;

export const loadCachedPage = async (site_id: string, page_id: string) => {
  let site_cache = eg.cache[site_id];
  if (!site_cache) {
    eg.cache[site_id] = {};
    site_cache = eg.cache[site_id];
  }

  if (!page_id) return {};

  let cache = site_cache[page_id];
  if (
    !cache ||
    (cache && !cache.lastRefresh) ||
    (cache && Date.now() - cache.lastRefresh >= 1000 * PAGE_CACHE_TIMEOUT)
  ) {
    if (eg.edit.page[page_id]) {
      const edit = eg.edit.page[page_id].doc.getMap("map").toJSON();
      edit.lastRefresh = Date.now();
      site_cache[page_id] = edit as any;
    } else {
      const page = await db.page.findFirst({
        where: { id: page_id },
        select: {
          js: true,
          id: true,
          url: true,
          updated_at: true,
          js_compiled: true,
          content_tree: true,
        },
      });
      if (page) {
        site_cache[page_id] = {
          ...page,
          lastRefresh: Date.now(),
        } as any;
      }
    }
    cache = site_cache[page_id];
  }
  return cache;
};
