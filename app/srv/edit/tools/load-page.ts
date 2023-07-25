import { Page } from "../../../web/src/compo/types/general";

export const loadPage = async (page_id: string) => {
  let page = (await db.page.findFirst({
    where: { id: page_id },
    select: {
      id: true,
      js: true,
      name: true,
      url: true,
      js_compiled: true,
      content_tree: true,
    },
  })) as unknown as null | Page;

  return page;
};
