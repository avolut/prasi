import { PRASI_COMPONENT } from "../../../utils/types/render";
import { WS_MSG_GET_COMP } from "../../../utils/types/ws";
import { LPage, LSite, Loader } from "./global";
import { wsend } from "./ws";

export const defaultLoader: Loader = {
  async site(p, where) {
    return (await db.site.findFirst({
      where,
      select: {
        id: true,
        config: true,
        domain: true,
        name: true,
        js: true,
        responsive: true,
        js_compiled: true,
      },
    })) as unknown as LSite;
  },
  async comp(p, comp_id) {
    p.comps.pending[comp_id] = new Promise<PRASI_COMPONENT>(async (resolve) => {
      p.comps.resolve[comp_id] = async (comp: PRASI_COMPONENT) => {
        resolve(comp);
      };
      await wsend(
        p,
        JSON.stringify({
          type: "get_comp",
          comp_id: comp_id,
        } as WS_MSG_GET_COMP)
      );
    });
    return p.comps.pending[comp_id];
  },
  npm(p, type, id) {
    if (type === "site") {
      return `${serverurl}/npm/site/${id}/site.js?${Date.now()}`;
    } else if (type === "page") {
      return `${serverurl}/npm/page/${id}/page.js`;
    }

    return null as any;
  },
  async page(p, id) {
    const res = await db.page.findFirst({
      where: { id: id },
      select: {
        id: true,
        url: true,
        name: true,
        content_tree: true,
        js_compiled: true,
      },
    });

    let page: LPage;

    if (res) {
      page = {
        id: res.id,
        content_tree: res.content_tree as any,
        js: res.js_compiled as any,
        name: res.name,
        url: res.url,
      };

      return page;
    }

    return null as unknown as LPage;
  },
  async pages(p, site_id: string) {
    return (await db.page.findMany({
      where: {
        id_site: site_id,
        is_deleted: false,
      },
      select: { id: true, url: true },
    })) as unknown as LPage[];
  },
};
