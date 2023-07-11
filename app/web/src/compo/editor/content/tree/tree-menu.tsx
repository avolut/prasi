import { createId } from "@paralleldrive/cuid2";
import { FC } from "react";
import { useGlobal } from "web-utils";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { CEGlobal } from "../../../../base/global/content-editor";
import { component } from "../../../page/component";
import { fillID } from "../../../page/tools/fill-id";
import { IContent, MContent } from "../../../types/general";
import { IItem } from "../../../types/item";
import { IText } from "../../../types/text";
import { Menu, MenuItem } from "../../../ui/context-menu";
import { loadSingleComponent } from "../../comp/load-comp";
import { newMap } from "../../tools/yjs-tools";
import { wsdoc } from "../../ws/wsdoc";

export const CETreeMenu: FC<{
  id: string;
  item: MContent;
  contextMenu: React.MouseEvent<HTMLDivElement, MouseEvent>;
  onClose: () => void;
}> = ({ contextMenu, onClose, item, id }) => {
  const c = useGlobal(CEGlobal, id);
  const type = item.get("type");
  const item_id = item.get("id");
  const comp = item.get("component");
  const comp_id = comp?.get("id");

  let isActiveComponent = false;
  if (id.startsWith("COMP")) {
    if (comp_id && id === `COMP_${comp_id}`) {
      isActiveComponent = true;
    }
  }

  if (item.get("isPropContent")) {
    return <Menu mouseEvent={contextMenu} onClose={onClose}></Menu>;
  }

  return (
    <Menu mouseEvent={contextMenu} onClose={onClose}>
      {comp_id && (
        <MenuItem
          label="Detach Component"
          onClick={() => {
            c.doc.transact(() => {
              if (comp) {
                const compitem = component.docs[comp_id]
                  ?.getMap("map")
                  .get("content_tree")
                  ?.toJSON() as IItem;
                c.doc.transact(() => {
                  if (compitem) {
                    syncronize(item as any, {
                      ...compitem,
                      id: item.get("id"),
                      component: undefined,
                      childs: compitem.childs.map((e) => fillID(e)),
                    });
                  }
                });
              }
            });
          }}
        />
      )}
      {!comp_id && type === "item" && (
        <MenuItem
          label="Replace with Component"
          onClick={() => {
            c.editor.manager.showComp = true;
            c.editor.manager.compCallback = (comp) => {
              const map = new Y.Map();
              c.doc.transact(async () => {
                if (comp) {
                  let compitem = component.docs[comp.id];

                  if (!compitem) {
                    component.docs[comp.id] = await loadSingleComponent(
                      comp.id
                    );
                    compitem = component.docs[comp.id];
                  }

                  syncronize(item as any, {
                    id: item.get("id"),
                    name: comp.name,
                    component: {
                      id: comp.id,
                      props: {},
                    },
                    type: item.get("type"),
                  });
                }
              });
            };
            c.render();
          }}
        />
      )}
      {!comp_id && (
        <MenuItem
          label={
            type === "item" && !isActiveComponent ? (
              "Create Component"
            ) : (
              <div className="text-gray-400">Create Component</div>
            )
          }
          onClick={() => {
            if (type === "item") {
              if (item_id) {
                if (!isActiveComponent) {
                  api
                    .comp_create({
                      item_id: item_id,
                      site_id: wsdoc.site?.id || "",
                      page_id: id.startsWith("COMP_")
                        ? undefined
                        : wsdoc.page_id,
                      comp_id: id.startsWith("COMP_")
                        ? id.substring(5)
                        : undefined,
                    })
                    .then(() => {
                      c.render();
                    });
                } else {
                  alert(`This item is already a component!`);
                }
              }
            } else {
              alert(
                `Component type must be an ITEM, not ${item
                  .get("type")
                  ?.toUpperCase()}.`
              );
            }
          }}
        />
      )}
      <MenuItem
        label="Duplicate"
        onClick={() => {
          item.parent.forEach((e: MContent, idx) => {
            if (e === item) {
              const json = e.toJSON() as IContent;
              const map = newMap(fillID(json)) as MContent;
              item.parent.insert(idx, [map]);
            }
          });
          c.render();
        }}
      />
      {(type === "text" || type === "item") && (
        <MenuItem
          label={`Wrap`}
          onClick={() => {
            item.parent.forEach((e: MContent, idx) => {
              if (e === item) {
                const json: IContent = {
                  id: createId(),
                  name: `Wrapped`,
                  type: "item",
                  childs: [e.toJSON() as IItem | IText],
                };
                const map = new Y.Map() as MContent;
                if (map) {
                  syncronize(map as any, fillID(json));
                  item.parent.delete(idx);
                  item.parent.insert(idx, [map]);
                }
              }
            });
          }}
        />
      )}
      {type === "item" && !comp?.get("id") && (
        <MenuItem
          label={`Unwrap`}
          onClick={() => {
            item.parent.forEach((e: MContent, idx) => {
              if (e === item) {
                const json = e.toJSON() as IContent;
                if (json.type === "item") {
                  item.parent.delete(idx);
                  item.parent.insert(
                    idx,
                    json.childs.map((e) => {
                      const map = new Y.Map() as MContent;
                      syncronize(map as any, fillID(e));
                      return map;
                    })
                  );
                }
              }
            });
          }}
        />
      )}
    </Menu>
  );
};
