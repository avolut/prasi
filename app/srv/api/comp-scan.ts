import { apiContext } from "service-srv";
import { IContent } from "../../web/src/compo/types/general";
export const _ = {
  url: "/comp-scan/:page_id",
  async api(page_id: string) {
    const res = await db.page.findFirst({
      where: {
        id: page_id,
      },
      select: { content_tree: true },
    });
    const comps = {};

    if (res) {
      await scanComponent(res.content_tree as any, comps);
    }
    return Object.values(comps);
  },
};

export const scanComponent = async (
  item: IContent,
  comps: Record<string, any>
) => {
  if (item.type === "item" && item.component?.id) {
    if (!comps[item.component.id]) {
      const res = await db.component.findFirst({
        where: { id: item.component.id },
      });

      if (res) {
        comps[item.component.id] = res;
        await scanComponent(res.content_tree as any, comps);
      }
    }
  }

  if (item.type !== "text") {
    for (const c of item.childs) {
      await scanComponent(c, comps);
    }
  }
};