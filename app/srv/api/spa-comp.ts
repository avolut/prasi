import { apiContext } from "service-srv";
export const _ = {
  url: "/spa-comp/:comp_id",
  async api(comp_id: string) {
    return await db.component.findFirst({
      where: {
        id: comp_id,
      },
      select: { id: true, name: true, content_tree: true },
    });
  },
};
