import { NodeModel } from "@minoru/react-dnd-treeview";
import get from "lodash.get";
import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { syncronize } from "y-pojo";
import { IContent, MContent } from "../../../../../utils/types/general";
import { IItem, MItem } from "../../../../../utils/types/item";
import { FNComponent } from "../../../../../utils/types/meta-fn";
import { Menu, MenuItem } from "../../../../../utils/ui/context-menu";
import { loadComponent } from "../../../logic/comp";
import { EditorGlobal } from "../../../logic/global";
import { fillID } from "../../../tools/fill-id";
import { flatTree } from "../../../tools/flat-tree";
import { newMap } from "../../../tools/yjs-tools";
import { jscript } from "../../script/script-element";
import { NodeContent } from "../utils/flatten";
import { detachComp } from "./action/detach";
import { createId } from "@paralleldrive/cuid2";
import { IText } from "../../../../../utils/types/text";
import * as Y from "yjs";

export const ETreeRightClick: FC<{
  node: NodeModel<NodeContent>;
  event: React.MouseEvent<HTMLDivElement, MouseEvent>;
  onClose: () => void;
}> = ({ node, event, onClose }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({ clipboardAllowed: false });
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
  const mcomp = mitem.get("component");

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

      <MenuItem
        label="Copy"
        onClick={() => {
          let mode = p.item.copy.mode;
          let clipboardText = "";
          switch (mode) {
            case "multiple":
              const data = p.item.multiple.map((id) => {
                const e = p.treeMeta[id];
                if (e) {
                  let jso = e.item.toJSON();
                  if (jso.type === "section") {
                    const newItem = {
                      id: jso.id,
                      name: jso.name,
                      type: "item",
                      dim: { w: "fit", h: "fit" },
                      childs: jso.childs,
                      component: get(jso, "component"),
                      adv: jso.adv,
                    } as IItem;
                    return newItem;
                  }
                  return jso;
                }
              });
              let rootContent = JSON.parse(JSON.stringify({ data }));
              let flat = rootContent.data as Array<IContent>;
              let res = flatTree(flat);
              clipboardText = JSON.stringify({ data: res });
              break;
            default:
              clipboardText = JSON.stringify(item);
              break;
          }
          let str = clipboardText + "_prasi";
          navigator.clipboard.writeText(str);
        }}
      />

      <MenuItem
        label={
          local.clipboardAllowed && (type === "item" || type === "section") ? (
            "Paste"
          ) : (
            <div className="text-gray-400">Paste</div>
          )
        }
        onClick={() => {
          if (type === "item" || type === "section") {
            if (mitem.get("childs")) {
              let paste = "";

              try {
                navigator.clipboard.readText().then((e) => {
                  paste = e;
                  local.clipboardAllowed = true;
                  local.render();
                });

                let desc = paste.replaceAll("_prasi", "");
                let obj = {} as IContent;
                let jso = JSON.parse(desc) as IContent;
                const childs = get(jso, "data") as any;

                //TODO: ra mudeng, tako faisol...
                if (childs) {
                  // let maps: any = [];
                  // p.item.multiple = [];
                  // let select = [] as Array<MContent>;
                  // childs.map((e: any) => {
                  //   const map = newMap(fillID(e)) as MContent;
                  //   let walk = walkContent(map) as Array<MContent>;
                  //   select = select.concat(walk);
                  // });
                } else {
                  //   if (jso.type === "section") {
                  //     const newItem = {
                  //       id: createId(),
                  //       name: jso.name,
                  //       type: "item",
                  //       dim: { w: "fit", h: "fit" },
                  //       childs: jso.childs,
                  //       component: get(jso, "component"),
                  //       adv: jso.adv,
                  //     } as IItem;
                  //     obj = newItem;
                  //   } else {
                  //     obj = jso;
                  //   }
                  //   const map = newMap(fillID(obj)) as MContent;
                  //   selectMultiple({ item: map, global: c });
                  //   child.push([map]);
                  //   c.render();
                }
              } catch (error) {}
            }
          }
        }}
      />

      {(type === "text" || type === "item") && (
        <MenuItem
          label={`Wrap`}
          onClick={() => {
            mitem.parent.forEach((e: MContent, idx) => {
              if (e === mitem) {
                const json: IContent = {
                  id: createId(),
                  name: `Wrapped`,
                  type: "item",
                  childs: [e.toJSON() as IItem | IText],
                };
                const map = new Y.Map() as MContent;
                if (map) {
                  syncronize(map as any, fillID(json));
                  mitem.parent.delete(idx);
                  mitem.parent.insert(idx, [map]);
                }
              }
            });
          }}
        />
      )}
      {type === "item" && !mcomp?.get("id") && (
        <MenuItem
          label={`Unwrap`}
          onClick={() => {
            mitem.parent.forEach((e: MContent, idx) => {
              if (e === mitem) {
                const json = e.toJSON() as IContent;
                if (json.type === "item") {
                  mitem.parent.delete(idx);
                  mitem.parent.insert(
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

const walkContent = (item: MContent, result?: Array<MContent>) => {
  const _result = result || [];
  _result.push(item);
  item.get("childs")?.forEach((e) => {
    walkContent(e, _result);
  });
  return _result;
};
const walk = (item: MContent, result?: string[]) => {
  const _result = result || [];
  _result.push(item.get("id") || "");
  item.get("childs")?.forEach((e) => {
    walk(e, _result);
  });
  return _result;
};
