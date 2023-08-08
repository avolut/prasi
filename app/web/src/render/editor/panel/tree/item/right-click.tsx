import { NodeModel } from "@minoru/react-dnd-treeview";
import { FC } from "react";
import { useGlobal } from "web-utils";
import { IItem, MItem } from "../../../../../utils/types/item";
import { FNComponent } from "../../../../../utils/types/meta-fn";
import { Menu, MenuItem } from "../../../../../utils/ui/context-menu";
import { EditorGlobal } from "../../../logic/global";
import { jscript } from "../../script/script-element";
import { NodeContent } from "../utils/flatten";
import { detachComp } from "./action/detach";
import { loadComponent } from "../../../logic/comp";
import { syncronize } from "y-pojo";
import { IContent, MContent } from "../../../../../utils/types/general";
import { fillID } from "../../../tools/fill-id";
import { newMap } from "../../../tools/yjs-tools";

export const ETreeRightClick: FC<{
  node: NodeModel<NodeContent>;
  event: React.MouseEvent<HTMLDivElement, MouseEvent>;
  onClose: () => void;
}> = ({ node, event, onClose }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const item = node.data?.content;
  const type = item?.type;
  const comp = (item as IItem).component as FNComponent | undefined;
  const rootComp = p.comp;
  const isActiveComponent = rootComp && rootComp.id === item?.id && rootComp.id;

  if (
    !item ||
    (comp?.id && rootComp && comp.id === rootComp.id) ||
    item.isPropContent
  ) {
    return (
      <Menu mouseEvent={event} onClose={onClose}>
        <div className="text-sm text-slate-500 px-3">Unavailable</div>
      </Menu>
    );
  }

  const mitem = p.treeMeta[item.id].item;

  return (
    <Menu mouseEvent={event} onClose={onClose}>
      {comp?.id && !isActiveComponent && (
        <MenuItem
          label="Detach"
          onClick={async () => {
            if (!jscript.build) {
              await jscript.init();
            }
            if (jscript.build && p.treeMeta[item.id]) {
              detachComp(
                p,
                item.id,
                p.treeMeta[item.id].item as MItem,
                jscript.build
              );
            }
          }}
        />
      )}

      {!comp?.id && type === "item" && (
        <MenuItem
          label="Replace with Component"
          onClick={() => {
            const ccid = rootComp?.id;

            const pick = () => {
              p.manager.comp = true;
              p.manager.compCallback = (comp) => {
                if (ccid && comp?.id === ccid) {
                  alert(
                    "WARNING: Failed to add self, preventing recursive component!"
                  );
                  setTimeout(() => {
                    pick();
                  }, 100);
                  return;
                }
                if (p.mpage) {
                  p.mpage.transact(async () => {
                    if (comp) {
                      let compitem = p.comps.doc[comp.id];
                      if (!compitem) {
                        await loadComponent(p, comp.id);
                        compitem = p.comps.doc[comp.id];
                      }

                      syncronize(item as any, {
                        id: comp.id,
                        name: comp.name,
                        childs: [],
                        component: {
                          id: comp.id,
                          props: {},
                        },
                        type: type,
                      });
                    }
                  });
                }
              };
              p.render();
            };
            pick();
          }}
        />
      )}

      {!comp?.id && (
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
              if (item.id) {
                if (!isActiveComponent) {
                  api
                    .comp_create({
                      item_id: item.id,
                      site_id: p.site.id || "",
                      page_id: rootComp ? undefined : p.page?.id,
                      comp_id: rootComp ? rootComp.id : undefined,
                    })
                    .then((e) => {});
                } else {
                  alert(`This item is already a component!`);
                }
              }
            } else {
              alert(
                `Component type must be an ITEM, not ${item.type?.toUpperCase()}.`
              );
            }
          }}
        />
      )}

      {!item.hidden && (
        <MenuItem
          label="Hide"
          onClick={() => {
            mitem.set("hidden", "only-editor");
            p.render();
          }}
        />
      )}
      {item.hidden && (
        <MenuItem
          label="Show"
          onClick={() => {
            mitem.set("hidden", false);
            p.render();
          }}
        />
      )}

      <MenuItem
        label="Duplicate"
        onClick={() => {
          mitem.parent.forEach((e: MContent, idx) => {
            if (e === mitem) {
              const json = e.toJSON() as IContent;
              const map = newMap(fillID(json)) as MContent;
              mitem.parent.insert(idx, [map]);
            }
          });
          p.render();
        }}
      />
    </Menu>
  );
};
