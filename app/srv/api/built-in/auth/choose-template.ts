import { apiContext } from "service-srv";

export const _ = {
  url: "/choose-template",
  async api(user: any) {
    const { res, req } = apiContext(this);

    const u = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (u) {
      const defaultPages = await db.page.findMany({
        select: {
          name: true,
          url: true,
          content_tree: true,
        },
        where: {
          id_site: user.id_site,
        },
      });

      if (defaultPages && defaultPages.length > 0) {
        defaultPages.map(async (page, i) => {
          await db.page.create({
            data: {
              id_site: user.site[0].id,
              name: page.name,
              url: page.url,
              content_tree: page.content_tree as any,
            },
          });
        });
      } else {
        await db.page.create({
          data: {
            id_site: user.site[0].id,
            name: "Home",
            url: "/",
            content_tree: { id: "root", type: "root", childs: [] },
          },
        });
      }

      return { status: "ok" };
    }

    return {
      status: "failed",
      reason: "Please try again!!!",
    };
  },
};
