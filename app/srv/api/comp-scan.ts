import { component } from "dbgen";
import { IContent } from "../../web/src/utils/types/general";
import { IItem } from "../../web/src/utils/types/item";
export const _ = {
  url: "/comp-scan/:page_id",
  async api(page_id: string) {
    const comps = {} as Record<
      string,
      { id: string; name: string; content_tree: IItem }
    >;

    if (page_id) {
      const res = await db.page.findFirst({
        where: {
          id: page_id,
        },
        select: { content_tree: true, id: true, name: true },
      });

      if (res) {
        await scanComponent(res.content_tree as any, comps);
      }
    }
    return Object.values(comps);
  },
};

export const scanComponent = async (
  item: IContent,
  comps: Record<string, any>
) => {
  if (item.type === "item" && item.component?.id) {
    if (item.component.props) {
      for (const v of Object.values(item.component.props)) {
        if (v.content) {
          await scanComponent(v.content, comps);
        }
      }
    }

    if (!comps[item.component.id]) {
      const res = await db.component.findFirst({
        where: { id: item.component.id },
        select: {
          id: true,
          name: true,
          content_tree: true,
        },
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
