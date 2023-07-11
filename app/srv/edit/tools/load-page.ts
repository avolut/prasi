import { Page } from "../../../web/src/compo/types/general";
import { IRoot } from "../../../web/src/compo/types/root";
import { validateTreePage } from "./validate-tree-page";

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
  if (page) validateTreePage(page.content_tree as IRoot);

  return page;
};
