import { NodeModel } from "@minoru/react-dnd-treeview";
import { createId } from "@paralleldrive/cuid2";
import get from "lodash.get";
import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { IContent, MContent } from "../../../../../utils/types/general";
import { IItem, MItem } from "../../../../../utils/types/item";
import { FNComponent } from "../../../../../utils/types/meta-fn";
import { IText } from "../../../../../utils/types/text";
import { Menu, MenuItem } from "../../../../../utils/ui/context-menu";
import { EditorGlobal } from "../../../logic/global";
import { fillID } from "../../../tools/fill-id";
import { flatTree } from "../../../tools/flat-tree";
import { newMap } from "../../../tools/yjs-tools";
import { jscript } from "../../script/script-element";
import { NodeContent, flattenTree } from "../utils/flatten";
import { detachComp } from "./action/detach";
import { filterFlatTree } from "../utils/tree-utils";
import { loadComponent } from "../../../logic/comp";

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

  const mitem = p.treeMeta[item.id].mitem;
  const mcomp = mitem.get("component");

  try {
    navigator.clipboard.readText().then((e) => {
      local.clipboardAllowed = e.includes("prasi") ? true : false;
      local.render();
    });
  } catch (error) {}
  return (
    <Menu mouseEvent={event} onClose={onClose}>
      {type === "item" && (
        <MenuItem
          label="Attach Component"
          onClick={() => {
            const ccid = rootComp?.id;

            const pick = () => {
              p.manager.comp = true;
              p.manager.compActionLabel = "Attach";
              p.manager.compCallback = async (comp) => {
                if (ccid && comp?.id === ccid) {
                  alert(
                    "WARNING: Failed to add self, preventing recursive component!"
                  );
                  setTimeout(() => {
                    pick();
                  }, 100);
                  return;
                }
                if (mitem.doc) {
                  let compitem = p.comps.doc[comp.id];

                  if (!compitem) {
                    await loadComponent(p, comp.id);
                    compitem = p.comps.doc[comp.id];
                  }
                  mitem.doc.transact(() => {
                    const citem = compitem
                      .getMap("map")
                      .get("content_tree")
                      ?.toJSON() as IItem;

                    if (citem) {
                      syncronize(mitem as any, {
                        id: citem.id,
                        name: citem.name,
                        childs: [],
                        component: {
                          id: citem.component?.id,
                          props: {},
                        },
                        type: "item",
                      });
                    }
                  });
                  p.render();
                }
              };
              p.render();
            };
            pick();
          }}
        />
      )}
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
                p.treeMeta[item.id].mitem as MItem,
                jscript.build
              );
            }
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
                    .then(async (e) => {
                      if (e) {
                        await loadComponent(p, e.id);
                        p.render();
                      }
                    });
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
            let listItem = p.item.multiple;
            if (listItem.length) {
              // hidden multiple
              const listContent: any = listItem.map((e) => {
                let item = p.treeMeta[e];
                if (item) {
                  return item.mitem.toJSON();
                }
              });
              let res = flatTree(listContent);
              res.map((e: IContent) => {
                const item = p.treeMeta[e.id];
                if (item) {
                  item.mitem.set("hidden", "only-editor");
                  p.render();
                }
              });
            } else {
              mitem.set("hidden", "only-editor");
              p.render();
            }
          }}
        />
      )}
      {item.hidden && (
        <MenuItem
          label="Show"
          onClick={() => {
            let listItem = p.item.multiple;
            if (listItem.length) {
              // hidden multiple
              const listContent: any = listItem.map((e) => {
                let item = p.treeMeta[e];
                if (item) {
                  return item.mitem.toJSON();
                }
              });
              let res = flatTree(listContent);
              res.map((e: IContent) => {
                const item = p.treeMeta[e.id];
                if (item) {
                  item.mitem.set("hidden", false);
                }
              });
            } else {
              mitem.set("hidden", false);
              p.render();
            }
          }}
        />
      )}

      <MenuItem
        label="Duplicate"
        onClick={() => {
          let listItem = p.item.multiple;
          if (listItem.length) {
            const listContent: any = listItem.map((e) => {
              let item = p.treeMeta[e];
              if (item) {
                return item.mitem.toJSON();
              }
            });
            let res = flatTree(listContent);
            res.forEach((e: any) => {
              let item = p.treeMeta[e.id];
              if (item) {
                const mitem = item.mitem;
                mitem.parent.forEach((e: MContent, idx) => {
                  if (e === mitem) {
                    const json = e.toJSON() as IContent;
                    const map = newMap(fillID(json)) as MContent;
                    mitem.parent.insert(idx, [map]);
                  }
                });
              }
            });
          } else {
            mitem.parent.forEach((e: MContent, idx) => {
              if (e === mitem) {
                const json = e.toJSON() as IContent;
                const map = newMap(fillID(json)) as MContent;
                mitem.parent.insert(idx, [map]);
              }
            });
          }
          p.render();
        }}
      />

      <MenuItem
        label="Copy"
        onClick={() => {
          let mode = p.item.multiple;
          let clipboardText = "";
          if (p.item.multiple.length) {
            const data = p.item.multiple.map((id) => {
              const e = p.treeMeta[id];
              if (e) {
                let jso = e.mitem.toJSON();
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
          } else {
            clipboardText = JSON.stringify(item);
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
            if (mitem)
              if (mitem.get("childs")) {
                let paste = "";
                try {
                  navigator.clipboard.readText().then((e) => {
                    paste = e;
                    let desc = paste.replaceAll("_prasi", "");
                    let obj = {} as IContent;
                    let jso = JSON.parse(desc) as IContent;
                    const childs = get(jso, "data") as any;
                    //TODO: ra mudeng, tako faisol...
                    const child: any = mitem.get("childs");
                    if (childs) {
                      p.item.multiple = [];
                      let select = [] as Array<string>;
                      childs.map((e: any) => {
                        const nmap = fillID(e);
                        const map = newMap(nmap) as MContent;
                        let wlk = walk(map) as Array<string>;
                        child.push([nmap.id]);
                        select = select.concat(wlk);
                      });
                      p.item.active = "";
                      p.item.multiple = select;
                    } else {
                      if (jso.type === "section") {
                        const newItem = {
                          id: createId(),
                          name: jso.name,
                          type: "item",
                          dim: { w: "fit", h: "fit" },
                          childs: jso.childs,
                          component: get(jso, "component"),
                          adv: jso.adv,
                        } as IItem;
                        obj = newItem;
                      } else {
                        obj = jso;
                      }
                      const map = newMap(fillID(obj)) as MContent;
                      let walkId = walk(map);
                      p.item.active = "";
                      p.item.multiple = walkId;
                      child.push([map]);
                    }
                    p.render();
                  });
                } catch (error) {}
              }
          }
        }}
      />
      {(type === "text" || type === "item") && (
        <MenuItem
          label={`Wrap`}
          onClick={() => {
            mitem.doc?.transact(() => {
              let listItem = p.item.multiple;
              if (listItem.length) {
                const listContent: any = listItem.map((e) => {
                  let item = p.treeMeta[e];
                  if (item) {
                    if (item.mitem.get("type") === "section") {
                      const json = item.mitem.toJSON();
                      const newItem = {
                        id: json.id,
                        name: json.name,
                        type: "item",
                        dim: { w: "fit", h: "fit" },
                        adv: json.adv,
                        childs: json.childs || [],
                        component: json.component,
                      } as IItem;
                      return newItem;
                    }
                    return item.mitem.toJSON();
                  }
                });

                let targetIdx = -1;
                listItem.map((e) => {
                  let mitem = p.treeMeta[e];
                  if (mitem) {
                    const jso = mitem.mitem;
                    jso.parent.forEach((e, idx) => {
                      if (e === jso) {
                        targetIdx = idx;
                        jso.parent.delete(idx);
                      }
                    });
                  }
                });

                let to = p.treeMeta[node.parent];
                if (to) {
                  const titem = to.mitem;
                  const childs = titem.get("childs");
                  let res = flatTree(listContent);
                  const json: IContent = {
                    id: createId(),
                    name: `Wrapped`,
                    type: "item",
                    childs: res,
                  };
                  const map = new Y.Map() as MContent;
                  if (map) {
                    syncronize(map as any, fillID(json));
                    childs?.insert(targetIdx, [map]);
                  }
                }
              } else {
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
              }
            });
          }}
        />
      )}
      {type === "item" && !mcomp?.get("id") && (
        <MenuItem
          label={`Unwrap`}
          onClick={() => {
            mitem.doc?.transact(() => {
              let listItem = p.item.multiple;
              if (listItem.length) {
                const listContent: any = listItem.map((e) => {
                  let item = p.treeMeta[e];
                  if (item) {
                    return item.mitem.toJSON();
                  }
                });
                let res = flatTree(listContent);
                res.forEach((e: any) => {
                  let item = p.treeMeta[e.id];
                  if (item) {
                    const mitem = item.mitem;
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
                  }
                });
              } else {
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
              }
            });
          }}
        />
      )}

      <MenuItem
        label={"Delete"}
        onClick={() => {
          mitem.doc?.transact(() => {
            if (p.item.multiple.length) {
              let tree: NodeModel<NodeContent>[] = [];
              const comp: any = p.comps.doc[p.comp?.id || ""];
              if (comp) {
                tree = flattenTree(p, comp.getMap("map").get("content_tree"));
              } else if (p.mpage) {
                tree = flattenTree(
                  p,
                  p.mpage.getMap("map").get("content_tree")
                );
              }
              filterFlatTree(p.item.multiple, tree, p);
            } else {
              mitem.parent.forEach((e, idx) => {
                if (e === item) {
                  mitem.parent.delete(idx);
                }
              });
            }
          });
        }}
      />
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
