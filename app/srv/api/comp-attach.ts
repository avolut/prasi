import { syncronize } from "y-pojo";
import { TypedMap } from "yjs-types";
import { IContent } from "../../web/src/utils/types/general";
import { IItem } from "../../web/src/utils/types/item";
import { eg } from "../edit/edit-global";

export const _ = {
  url: "/comp-attach",
  async api(arg: {
    site_id: string;
    page_id: string;
    item_id: string; 
    comp_id: string;
  }) {
    const { page_id, site_id, comp_id, item_id } = arg;
    const page = eg.edit.page[page_id];
    let element = undefined as TypedMap<IContent> | undefined;
    if (page) {
      const root = page.doc.getMap("map").get("content_tree");
      if (root) {
        const walk = (el: TypedMap<IItem>): TypedMap<IItem> | undefined => {
          if (el.get("id") === item_id) {
            return el;
          }
          const childs = el.get("childs");
          let final = null;
          childs?.forEach((e: any) => {
            const result = walk(e);
            if (result) final = result;
          });
          if (final) return final;
        };

        element = walk(root as any);
      }
    }

    if (element) {
      if (element && page.id) {
        const json = element.toJSON() as IItem;
        syncronize(
          element as any,
          {
            ...json,
            childs: [],
          } as IItem
        );

        await db.page.update({
          where: {
            id: page.id,
          },
          data: {
            content_tree: page.doc.getMap("map").get("content_tree")?.toJSON(),
          },
        });
      }
    }
  },
};
