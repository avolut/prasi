import { apiContext } from "service-srv";
export const _ = {
  url: "/spa-page/:page_id",
  async api(page_id: string) {
    const { req, res } = apiContext(this);
    return await db.page.findFirst({
      where: { id: page_id },
      select: {
        id: true,
        url: true,
        content_tree: true,
        js_compiled: true,
      },
    });
  },
};
