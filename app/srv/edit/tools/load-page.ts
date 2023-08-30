import { validate } from "uuid";
import { Page } from "../../../web/src/utils/types/general";

export const loadPage = async (page_id: string) => {
  if (page_id && validate(page_id)) {
    let page = (await db.page.findFirst({
      where: { id: page_id },
      select: {
        id: true,
        js: true,
        name: true,
        id_site: true,
        url: true,
        js_compiled: true,
        updated_at: true,
        content_tree: true,
      },
    })) as unknown as null | Page;
    return page;
  }
  return null;
};
