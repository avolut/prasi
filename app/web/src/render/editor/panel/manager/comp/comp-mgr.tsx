import { FC, Fragment, ReactElement, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../../../utils/types/item";
import { Dropdown } from "../../../../../utils/ui/dropdown";
import { Loading } from "../../../../../utils/ui/loading";
import { loadComponent } from "../../../logic/comp";
import { EditorGlobal } from "../../../logic/global";
import { CItem } from "./comp-preview";

const w = window as unknown as {
  compManagerSearch: string;
  compGroup: Record<
    string,
    {
      info: { name: string; id: string };
      shared: boolean;
      isOwner: boolean;
      comps: any[];
    }
  >;
};
export const CompManager: FC = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  if (!w.compGroup) w.compGroup = {};

  const local = useLocal({
    loading: true,
    group: w.compGroup,
    init: false,
    edit_id: "",
    selected_id: "",
    renaming: {
      id: "",
      text: "",
    },
    site_use: [] as string[],
    searchRef: null as any,
    trash_id: "",
    collapsed: new Set(),
    sharedPopup: false,
    checked: new Set<string>(),
    site_use_loading: false,
  });

  useEffect(() => {
    const f = (e: any) => {
      if (
        e.key === "Escape" &&
        document.activeElement?.tagName.toLowerCase() === "input"
      ) {
        w.compManagerSearch = "";
        local.render();
      }
      if (
        local.searchRef &&
        document.activeElement?.tagName.toLowerCase() !== "input"
      ) {
        local.searchRef.value = "";
        local.searchRef.focus();
      }
    };
    window.addEventListener("keydown", f);
    return () => {
      window.removeEventListener("keydown", f);
    };
  }, []);

  const toggleCollapse = (id: string) => {
    if (!local.collapsed.has(id)) {
      local.collapsed.add(id);
    } else {
      local.collapsed.delete(id);
    }
    local.render();
  };

  const reloadComps = async () => {
    if (Object.keys(w.compGroup).length > 0) {
      local.loading = false;
      local.group = w.compGroup;

      for (const g of Object.values(local.group)) {
        if (g.info.name === "__TRASH__") {
          local.trash_id = g.info.id;
          local.collapsed.add(g.info.id);
        }
      }
      local.render();
      return;
    }

    if (p.site.id) {
      local.loading = true;
      local.site_use = (
        await db.site_use_comp.findMany({
          where: {
            id_site: p.site.id,
          },
          select: {
            use_id_site: true,
          },
        })
      ).map((e) => e.use_id_site);
      const group = await db.component_group.findMany({
        where: {
          component_site: {
            some: {
              OR: [
                {
                  id_site: p.site.id,
                },
                ...local.site_use.map((e) => ({
                  id_site: e,
                  component_group: { name: { not: "__TRASH__" } },
                })),
              ],
            },
          },
        },
        select: {
          name: true,
          id: true,
          shared: true,
          component_site: {
            select: {
              is_owner: true,
            },
            where: {
              id_site: p.site.id,
            },
          },
        },
      });

      if (group) {
        local.group = {};
        for (const g of group) {
          if (g.name === "__TRASH__") {
            local.trash_id = g.id;
            local.collapsed.add(g.id);
          }

          local.group[g.id] = {
            info: g,
            shared: g.shared,
            isOwner: !!g.component_site[0]?.is_owner,
            comps: [],
          };
        }
      }
      const group_ids = Object.keys(local.group);

      if (group_ids.length > 0) {
        const comps = await db.component.findMany({
          where: {
            id_component_group: {
              in: group_ids,
            },
          },
          select: {
            id: true,
            id_component_group: true,
            name: true,
          },
        });

        for (const comp of comps) {
          const gid = comp.id_component_group;
          if (gid && local.group[gid]) {
            local.group[gid].comps.push(comp);
          }
        }
      }

      local.loading = false;
      w.compGroup = local.group;
      local.render();
    }
  };

  if (!local.init) {
    local.init = true;
    reloadComps();
  }

  const boxClass =
    "flex flex-col items-start w-[192px] p-2 text-sm border cursor-pointer hover:bg-blue-100 ml-1 mb-1";

  let groups = Object.values(local.group).sort((a, b) => {
    const aname = a.info.name === "__TRASH__" ? "zzzTRASHzzz" : a.info.name;
    const bname = b.info.name === "__TRASH__" ? "zzzTRASHzzz" : b.info.name;
    return aname.localeCompare(bname);
  });

  if (w.compManagerSearch) {
    groups = [...groups].filter((g) => {
      let count = 0;
      g.comps.forEach((e) => {
        const name = e.name.toLowerCase();
        const id = e.id.toLowerCase();

        if (
          name.includes(w.compManagerSearch.toLowerCase()) ||
          id.includes(w.compManagerSearch.toLowerCase())
        ) {
          count++;
          return true;
        }
        return false;
      });
      return count > 0;
    });
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-10 cursor-pointer"
        onClick={() => {
          p.manager.comp = false;
          p.manager.compCallback = () => {};
          p.render();
        }}
      ></div>
      <div
        className="fixed inset-[50px] bg-white shadow-2xl flex"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {local.loading ? (
          <div className="flex w-full h-full items-center justify-center">
            <Loading note="comp-mgr" backdrop={false} />
          </div>
        ) : (
          <div
            className={cx(
              "relative flex-1 flex",
              css`
                contain: content;
                overflow: auto;

                .complist {
                  contain: content;
                  overflow: auto;
                }
              `
            )}
          >
            {/* <Modal
              open={local.sharedPopup}
              onOpenChange={(open) => {
                local.sharedPopup = open;
                local.render();
              }}
            >
              <CompUseShared
                onChange={async (group_id) => {
                  local.sharedPopup = false;
                  local.loading = true;
                  local.render();

                  await db.component_site.create({
                    data: {
                      id_component_group: group_id,
                      id_site: p.site?.id || "",
                      is_owner: false,
                    },
                  });
                  w.compGroup = {};
                  reloadComps();
                }}
              />
            </Modal> */}
            <div className="fixed top-0 right-[20px] bg-white z-10 m-[8px] flex">
              {local.checked.size > 0 && (
                <>
                  <div
                    className="border text-xs flex items-center px-2 cursor-pointer mr-1"
                    onClick={() => {
                      local.checked.clear();
                      p.render();
                    }}
                  >
                    Unselect
                  </div>
                  <div
                    className="bg-red-500 text-white text-xs flex items-center px-2 cursor-pointer mr-1"
                    onClick={async () => {
                      if (
                        confirm(
                          "Delete component cannot be undone. Are you sure? "
                        )
                      ) {
                        const totrash: string[] = [];
                        local.checked.forEach((e) => {
                          const [id, gid] = e.split("|");
                          const idx = local.group[gid].comps.findIndex(
                            (e) => e.id === id
                          );
                          const comp = local.group[gid].comps[idx];
                          if (idx >= 0) {
                            if (comp.id_component_group !== local.trash_id) {
                              totrash.push(comp.id);
                            }
                          }
                        });
                        if (totrash.length > 0) {
                          if (!local.trash_id) {
                            const res = await db.component_group.create({
                              data: {
                                name: "__TRASH__",
                                component_site: {
                                  create: {
                                    id_site: p.site?.id || "",
                                  },
                                },
                              },
                            });
                            local.trash_id = res.id;
                          }

                          if (local.trash_id) {
                            await db.component.updateMany({
                              where: {
                                id: { in: totrash },
                              },
                              data: {
                                id_component_group: local.trash_id,
                              },
                            });

                            w.compGroup = {};

                            local.checked.clear();
                            await reloadComps();
                          }
                        }
                      }
                    }}
                  >
                    Delete {local.checked.size} selected
                  </div>
                </>
              )}
              {/* <div
                className="hover:bg-blue-500 hover:text-white text-xs flex items-center px-2 cursor-pointer border text-blue-500 border-blue-200 mr-1"
                onClick={() => {
                  local.sharedPopup = true;
                  local.render();
                }}
              >
                Browse Shared
              </div> */}
              <input
                type="search"
                value={w.compManagerSearch || ""}
                ref={(e) => {
                  local.searchRef = e;
                }}
                onChange={(e) => {
                  w.compManagerSearch = e.currentTarget.value;
                  local.render();
                }}
                placeholder="Search"
                className="border  px-2 text-sm h-[26px] outline-none w-[150px] focus:border-blue-500 focus:w-[350px] transition-all"
              />
            </div>
            <div className="comp-list flex-1 overflow-auto flex h-full flex-col space-y-2 select-none">
              {!local.site_use.includes(
                "9e34f31f-4ebd-4630-b61d-597045171ebb"
              ) && (
                <div className="flex flex-col self-stretch mx-4 mt-3">
                  <div className=" flex">
                    <div
                      className="border border-blue-400 text-sm px-3 cursor-pointer hover:bg-blue-200"
                      onClick={async () => {
                        local.site_use_loading = true;
                        local.render();
                        await db.site_use_comp.create({
                          data: {
                            id_site: p.site.id,
                            use_id_site: "9e34f31f-4ebd-4630-b61d-597045171ebb",
                          },
                        });
                        w.compGroup = {};
                        await reloadComps();
                        local.site_use_loading = false;
                        local.render();
                      }}
                    >
                      {local.site_use_loading
                        ? "Loading..."
                        : "Attach Prasi UI"}
                    </div>
                  </div>
                </div>
              )}

              {local.site_use.includes(
                "9e34f31f-4ebd-4630-b61d-597045171ebb"
              ) && (
                <div className="flex flex-col self-stretch mx-4 mt-3">
                  <div className=" flex">
                    <div
                      className="border border-slate-400 text-sm px-3 cursor-pointer hover:bg-blue-200"
                      onClick={async () => {
                        if (p.site.id) {
                          local.site_use_loading = true;
                          local.render();
                          await db.site_use_comp.delete({
                            where: {
                              id_site_use_id_site: {
                                id_site: p.site.id,
                                use_id_site:
                                  "9e34f31f-4ebd-4630-b61d-597045171ebb",
                              },
                            },
                          });
                          w.compGroup = {};
                          await reloadComps();
                          local.site_use_loading = false;
                          local.render();
                        }
                      }}
                    >
                      {local.site_use_loading
                        ? "Loading..."
                        : "Detach Prasi UI"}
                    </div>
                  </div>
                </div>
              )}

              {groups.map((g) => {
                return (
                  <Fragment key={g.info.id}>
                    {g.info.name === "__TRASH__" && (
                      <div className="flex-1"></div>
                    )}
                    <div className="flex flex-col border-b pt-1 pb-1">
                      <div
                        className={cx(
                          "p-1 text-base flex items-center space-x-1",
                          css`
                            .act {
                              display: none;
                            }
                            &:hover {
                              .act {
                                display: flex;
                              }
                            }
                          `,
                          g.info.name === "__TRASH__" &&
                            css`
                              .act {
                                display: none !important;
                              }
                            `
                        )}
                      >
                        {local.renaming.id === g.info.id ? (
                          <input
                            value={local.renaming.text}
                            onChange={(ev) => {
                              local.renaming.text = ev.currentTarget.value;
                              local.render();
                            }}
                            className="border px-1 text-sm"
                            autoFocus
                            spellCheck={false}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") e.currentTarget.blur();
                            }}
                            onFocus={(e) => {
                              e.currentTarget.select();
                            }}
                            onBlur={(e) => {
                              g.info.name = e.currentTarget.value;
                              local.renaming.id = "";
                              local.render();

                              db.component_group.update({
                                where: {
                                  id: g.info.id,
                                },
                                data: { name: g.info.name },
                              });
                            }}
                          />
                        ) : (
                          <>
                            <div
                              className="cursor-pointer"
                              onClick={() => toggleCollapse(g.info.id)}
                            >
                              {local.collapsed.has(g.info.id) ? (
                                <ChevronRight />
                              ) : (
                                <ChevronDown />
                              )}
                            </div>
                            <div
                              className="cursor-pointer"
                              onClick={() => toggleCollapse(g.info.id)}
                            >
                              {g.info.name === "__TRASH__" ? (
                                <div className="text-slate-400 text-xs">
                                  Deleted Component
                                </div>
                              ) : (
                                g.info.name
                              )}
                            </div>

                            {/* {!g.isOwner && (
                              <div
                                className="cursor-pointer border text-xs px-1 hover:bg-red-100 hover:border-red-500 hover:text-red-600 flex items-center h-[20px]"
                                onClick={async () => {
                                  if (confirm("Are you sure ?")) {
                                    delete local.group[g.info.id];
                                    local.render();
                                    await db.component_site.delete({
                                      where: {
                                        id_component_group_id_site: {
                                          id_component_group: g.info.id,
                                          id_site: p.site?.id || "",
                                        },
                                      },
                                    });
                                  }
                                }}
                              >
                                Detach
                              </div>
                            )} */}

                            {g.shared && g.isOwner && (
                              <div
                                className="cursor-pointer border ml-1 border-transparent bg-blue-500 text-white text-xs px-1 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-600 flex items-center h-[20px]"
                                onClick={async () => {
                                  g.shared = false;

                                  db.component_group.update({
                                    where: {
                                      id: g.info.id,
                                    },
                                    data: {
                                      shared: g.shared,
                                    },
                                  });
                                  local.render();
                                }}
                              >
                                Public
                              </div>
                            )}
                            {!g.shared && g.isOwner && (
                              <div
                                className="act cursor-pointer ml-1 border text-xs px-1 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-600 flex items-center h-[20px]"
                                onClick={async () => {
                                  g.shared = true;

                                  db.component_group.update({
                                    where: {
                                      id: g.info.id,
                                    },
                                    data: {
                                      shared: g.shared,
                                    },
                                  });
                                  local.render();
                                }}
                              >
                                Share
                              </div>
                            )}
                            {g.isOwner && (
                              <div
                                className="act cursor-pointer border flex items-center hover:bg-blue-100 hover:border-blue-500 hover:text-blue-600 px-1 h-[20px]"
                                onClick={() => {
                                  local.renaming.id = g.info.id;
                                  local.renaming.text = g.info.name;
                                  local.render();
                                }}
                              >
                                <Rename />
                              </div>
                            )}

                            <div
                              className="act cursor-pointer border text-xs px-1 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-600 flex items-center h-[20px]"
                              onClick={async () => {
                                const name = prompt(`New Group Name:`);

                                if (name) {
                                  const res = await db.component_group.create({
                                    data: {
                                      component_site: {
                                        create: {
                                          id_site: p.site?.id || "",
                                        },
                                      },
                                      name,
                                    },
                                  });

                                  if (res) {
                                    local.group[res.id] = {
                                      comps: [],
                                      shared: false,
                                      isOwner: true,
                                      info: res,
                                    };
                                    local.render();
                                  }
                                }
                              }}
                            >
                              New
                            </div>

                            {g.comps.length === 0 && (
                              <div
                                className="act cursor-pointer border text-xs px-1 hover:bg-red-100 hover:border-red-500 hover:text-red-600 flex items-center h-[20px]"
                                onClick={async () => {
                                  if (confirm("Are you sure ?")) {
                                    delete local.group[g.info.id];
                                    local.render();
                                    await db.component_site.delete({
                                      where: {
                                        id_component_group_id_site: {
                                          id_component_group: g.info.id,
                                          id_site: p.site?.id || "",
                                        },
                                      },
                                    });
                                  }
                                }}
                              >
                                Del
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div
                        className={cx(
                          "flex items-start flex-wrap pl-[10px]",
                          local.collapsed.has(g.info.id) && "hidden"
                        )}
                      >
                        {g.comps.map((e, idx) => {
                          const name = e.name.toLowerCase();
                          const id = e.id.toLowerCase();

                          if (
                            w.compManagerSearch &&
                            !name.includes(w.compManagerSearch.toLowerCase()) &&
                            !id.includes(w.compManagerSearch.toLowerCase())
                          ) {
                            return null;
                          }
                          return (
                            <div
                              key={e.id}
                              className={cx(
                                boxClass,
                                "justify-between transition-all relative",
                                local.selected_id === e.id
                                  ? "border-blue-500 bg-blue-100"
                                  : "hover:border-blue-500",
                                css`
                                  .edit {
                                    display: none;
                                  }

                                  &:hover {
                                    .edit {
                                      display: flex;
                                    }
                                    .pick {
                                      opacity: 1;
                                    }
                                  }
                                `
                              )}
                              onClick={() => {
                                local.selected_id = e.id;
                                local.render();
                              }}
                            >
                              <div
                                className={cx(
                                  "absolute top-0 right-0 flex items-center justify-center w-[20px] h-[20px] border border-r-0 border-t-0",
                                  local.checked.has(`${e.id}|${g.info.id}`)
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white hover:border-blue-500"
                                )}
                                onClick={(ev) => {
                                  ev.stopPropagation();
                                  ev.preventDefault();
                                  if (
                                    local.checked.has(`${e.id}|${g.info.id}`)
                                  ) {
                                    local.checked.delete(
                                      `${e.id}|${g.info.id}`
                                    );
                                  } else {
                                    local.checked.add(`${e.id}|${g.info.id}`);
                                  }
                                  p.render();
                                }}
                              >
                                {local.checked.has(`${e.id}|${g.info.id}`) && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    fill="none"
                                    viewBox="0 0 15 15"
                                  >
                                    <path
                                      fill="currentColor"
                                      fillRule="evenodd"
                                      d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 01-.944.12l-2.75-2.5a.625.625 0 01.841-.925l2.208 2.007 3.849-5.886a.625.625 0 01.865-.181z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <div>{e.name}</div>
                                <div className="text-slate-400 text-[10px]">
                                  {e.id}
                                </div>
                              </div>
                              <div className="flex mt-1 justify-between self-stretch">
                                <div className="flex flex-1 justify-between space-x-1 mr-1">
                                  <div
                                    className="pick opacity-10 transition-all bg-blue-500 text-white px-2"
                                    onClick={() => {
                                      p.manager.comp = false;
                                      if (
                                        typeof p.manager.compCallback ===
                                        "function"
                                      ) {
                                        p.manager.compCallback(e);
                                        p.manager.compCallback = () => {};
                                        p.render();
                                      }
                                    }}
                                  >
                                    {p.manager.compActionLabel}
                                  </div>
                                </div>
                                <div
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    ev.stopPropagation();
                                  }}
                                >
                                  <Dropdown
                                    value={g.info.id}
                                    items={groups
                                      .filter(
                                        (e) => e.info.name !== "__TRASH__"
                                      )
                                      .map((e) => {
                                        return {
                                          label: e.info.name,
                                          value: e.info.id,
                                        };
                                      })}
                                    onChange={(v) => {
                                      local.group[v].comps.push(e);
                                      g.comps.splice(idx, 1);
                                      local.render();

                                      db.component.update({
                                        where: {
                                          id: e.id,
                                        },
                                        data: {
                                          id_component_group: v,
                                        },
                                        select: { id: true },
                                      });
                                    }}
                                    className="max-w-[30px] overflow-hidden border"
                                    popover={{
                                      className: "text-sm",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        )}
        {local.selected_id && (
          <CompPreview
            comp_id={local.selected_id}
            onClose={() => {
              local.selected_id = "";
              local.render();
            }}
            opt={
              <>
                <div
                  className={cx(
                    "edit bg-red-200 hover:bg-red-500 transition-all px-3 rounded-sm text-sm text-white cursor-pointer"
                  )}
                  onClick={async (ev) => {
                    if (confirm("Are you sure ?")) {
                      if (!local.trash_id) {
                        const res = await db.component_group.create({
                          data: {
                            name: "__TRASH__",
                            component_site: {
                              create: {
                                id_site: p.site?.id || "",
                              },
                            },
                          },
                        });
                        local.trash_id = res.id;
                      }

                      if (local.trash_id) {
                        await db.component.update({
                          where: {
                            id: local.selected_id,
                          },
                          data: {
                            id_component_group: local.trash_id,
                          },
                          select: { id: true },
                        });

                        w.compGroup = {};
                        await reloadComps();
                      }
                    }
                  }}
                >
                  Delete
                </div>
              </>
            }
          />
        )}
      </div>
    </>
  );
};

const CompPreview: FC<{
  comp_id: string;
  onClose: () => void;
  opt: ReactElement;
}> = ({ comp_id, onClose, opt }) => {
  const local = useLocal({ name: "", comp: null as null | IItem });
  const p = useGlobal(EditorGlobal, "EDITOR");
  const comp = p.comps.doc[comp_id];

  if (comp) {
    local.comp = comp.getMap("map").get("content_tree")?.toJSON() as IItem;
    if (local.comp) {
      local.name = local.comp.name;
    }
  } else {
    loadComponent(p, comp_id).then(() => {
      local.render();
    });
  }

  return (
    <div className="border-l w-[35%] transition-all flex flex-col">
      <div className="border-b p-2 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={onClose}>
          <ChevronLeft />
          {local.name || "Component"}
        </div>
        <div>{opt}</div>
      </div>
      <div className={cx("flex flex-1 flex-col relative overflow-auto")}>
        {!local.comp && <Loading note="comp-mgr-2" backdrop={false} />}
        <div
          className={cx(
            css`
              contain: content;
              padding: 20px;
              overflow: auto;
            `,
            "flex items-center justify-center flex-1 flex-col "
          )}
        >
          {local.comp && (
            <CItem item={local.comp} comp_id={local.comp.component?.id || ""} />
          )}
        </div>
      </div>
    </div>
  );
};

const Rename = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 1C6.22386 1 6 1.22386 6 1.5C6 1.77614 6.22386 2 6.5 2C7.12671 2 7.45718 2.20028 7.65563 2.47812C7.8781 2.78957 8 3.28837 8 4V11C8 11.7116 7.8781 12.2104 7.65563 12.5219C7.45718 12.7997 7.12671 13 6.5 13C6.22386 13 6 13.2239 6 13.5C6 13.7761 6.22386 14 6.5 14C7.37329 14 8.04282 13.7003 8.46937 13.1031C8.47976 13.0886 8.48997 13.0739 8.5 13.0591C8.51003 13.0739 8.52024 13.0886 8.53063 13.1031C8.95718 13.7003 9.62671 14 10.5 14C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13C9.87329 13 9.54282 12.7997 9.34437 12.5219C9.1219 12.2104 9 11.7116 9 11V4C9 3.28837 9.1219 2.78957 9.34437 2.47812C9.54282 2.20028 9.87329 2 10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1C9.62671 1 8.95718 1.29972 8.53063 1.89688C8.52024 1.91143 8.51003 1.92611 8.5 1.9409C8.48997 1.92611 8.47976 1.91143 8.46937 1.89688C8.04282 1.29972 7.37329 1 6.5 1ZM14 5H11V4H14C14.5523 4 15 4.44772 15 5V10C15 10.5523 14.5523 11 14 11H11V10H14V5ZM6 4V5H1L1 10H6V11H1C0.447715 11 0 10.5523 0 10V5C0 4.44772 0.447715 4 1 4H6Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);
const chevronSize = 12;

export const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={chevronSize}
    height={chevronSize}
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.158 3.135a.5.5 0 01.707.023l3.75 4a.5.5 0 010 .684l-3.75 4a.5.5 0 11-.73-.684L9.566 7.5l-3.43-3.658a.5.5 0 01.023-.707z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={chevronSize}
    height={chevronSize}
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.135 6.158a.5.5 0 01.707-.023L7.5 9.565l3.658-3.43a.5.5 0 01.684.73l-4 3.75a.5.5 0 01-.684 0l-4-3.75a.5.5 0 01-.023-.707z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14 18l-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6L14 18z"
    ></path>
  </svg>
);
