import { component } from "dbgen";
import { apiContext } from "service-srv";
import { eg } from "../edit/edit-global";
export const _ = {
  url: "/comp-update",
  async api(
    comp: Partial<component> & { id: string },
    opt?: { delete?: true }
  ) {
    const { req, res } = apiContext(this);

    if (opt?.delete) {
      await db.component.delete({
        where: {
          id: comp.id,
        },
      });
      delete eg.edit.comp[comp.id];
    } else {
      if (comp.name) {
        const edcomp = eg.edit.comp[comp.id];
        if (edcomp) {
          const _ = edcomp.doc.getMap("comp");
          if (_) {
            edcomp.doc.transact(() => {
              if (comp.name) {
                _.set("name", comp.name);
                const ctree = _.get("content_tree");
                if (ctree) {
                  ctree.set("name", comp.name);
                }
              }
            });
          }
        }
      }

      db.component.update({
        where: {
          id: comp.id,
        },
        data: comp as any,
      });
    }

    return "ok";
  },
};
