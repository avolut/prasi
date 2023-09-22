import { syncronize } from "y-pojo";
import { TypedMap } from "yjs-types";
import { IContent } from "../../web/src/utils/types/general";
import { IItem, MItem } from "../../web/src/utils/types/item";
import { eg } from "../edit/edit-global";

export const _ = {
  url: "/comp-create",
  async api(arg: {
    site_id: string;
    page_id?: string;
    item_id: string;
    comp_id?: string;
    group_id?: string;
  }) {
    const { page_id, site_id, item_id, comp_id, group_id } = arg;
    let element = undefined as MItem | undefined;
    const walk = (el: MItem): MItem | undefined => {
      if (el.get("id") === item_id) {
        return el;
      }
      let final = null;

      const props = el.get("component")?.get("props");
      if (props) {
        props.forEach((e) => {
          const content = e.get("content");
          if (content) {
            const result = walk(content);
            if (result) final = result;
          }
        });
      }

      const childs = el.get("childs");
      childs?.forEach((e: any) => {
        const result = walk(e);
        if (result) final = result;
      });
      if (final) return final;
    };

    const page = eg.edit.page[page_id || ""];
    if (page_id) {
      if (page) {
        const root = page.doc.getMap("map").get("content_tree");
        if (root) {
          element = walk(root as any);
        }
      }
    }

    const comp = eg.edit.comp[comp_id || ""];
    if (comp_id) {
      if (comp) {
        const root = comp.doc.getMap("map").get("content_tree");
        if (root) {
          element = walk(root as any);
        }
      }
    }

    let gid = group_id;
    if (!gid) {
      let group = await db.component_group.findFirst({
        where: {
          component_site: {
            some: {
              id_site: site_id,
            },
          },
          name: {
            not: {
              equals: "__TRASH__",
            },
          },
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!group) {
        group = await db.component_group.create({
          data: {
            name: "All",
            component_site: {
              create: {
                id_site: site_id,
              },
            },
          },
          select: {
            id: true,
            name: true,
          },
        });
      }
      gid = group.id;
    }
    if (element) {
      const newcomp = await db.component.create({
        data: {
          name: element.get("name") || "",
          content_tree: element.toJSON(),
          component_group: {
            connect: {
              id: gid,
            },
          },
        },
        select: {
          content_tree: true,
          id: true,
        },
      });
      if (newcomp) {
        const content_tree = {
          ...(newcomp.content_tree as any),
          component: {
            id: newcomp.id,
            group: {
              id: gid,
            },
          },
        };
        await db.component.update({
          data: {
            content_tree: content_tree,
          },
          where: {
            id: newcomp.id,
          },
        });

        const json = element.toJSON() as IItem;
        syncronize(
          element as any,
          {
            ...json,
            childs: [],
            component: {
              id: newcomp.id,
              name: "",
              props: {},
            },
          } as IItem
        );

        if (comp_id) {
          await db.component.update({
            where: {
              id: comp_id,
            },
            data: {
              content_tree: comp.doc
                .getMap("map")
                .get("content_tree")
                ?.toJSON(),
            },
          });
        } else if (page && page.id) {
          await db.page.update({
            where: {
              id: page.id,
            },
            data: {
              content_tree: page.doc
                .getMap("map")
                .get("content_tree")
                ?.toJSON(),
            },
          });
        }

        return {
          id: newcomp.id,
          group_id: gid,
        };
      }
    }
  },
};
