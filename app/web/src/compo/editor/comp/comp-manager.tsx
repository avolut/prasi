import { FC, Fragment } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../../base/global/content-editor";
import { Dropdown } from "../../ui/dropdown";
import { Loading } from "../../ui/loading";
import { wsdoc } from "../ws/wsdoc";
import { Modal } from "../../ui/modal";
import { CompUseShared } from "./comp-use-shared";

export const CompManager: FC<{ id: string }> = ({ id }) => {
  const c = useGlobal(CEGlobal, id);
  const local = useLocal({
    loading: true,
    group: wsdoc.compGroup,
    init: false,
    edit_id: "",
    renaming: {
      id: "",
      text: "",
    },
    search: "",
    trash_id: "",
    collapsed: new Set(),
    sharedPopup: false,
  });

  const toggleCollapse = (id: string) => {
    if (!local.collapsed.has(id)) {
      local.collapsed.add(id);
    } else {
      local.collapsed.delete(id);
    }
    local.render();
  };

  const reloadComps = async () => {
    if (Object.keys(wsdoc.compGroup).length > 0) {
      local.loading = false;
      local.group = wsdoc.compGroup;

      for (const g of Object.values(local.group)) {
        if (g.info.name === "__TRASH__") {
          local.trash_id = g.info.id;
          local.collapsed.add(g.info.id);
        }
      }
      local.render();
      return;
    }

    if (wsdoc.site) {
      local.loading = true;
      const group = await db.component_group.findMany({
        where: {
          component_site: {
            some: {
              id_site: wsdoc.site.id,
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
              id_site: wsdoc.site.id,
            },
          },
        },
      });

      if (group) {
        local.group = {};
        for (const g of group) {
          local.group[g.id] = {
            info: g,
            shared: g.shared,
            isOwner: g.component_site[0].is_owner,
            comps: [],
          };

          if (g.name === "__TRASH__") {
            local.trash_id = g.id;
            local.collapsed.add(g.id);
          }
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
      wsdoc.compGroup = local.group;
      local.render();
    }
  };

  if (!local.init) {
    local.init = true;
    reloadComps();
  }

  const boxClass =
    "flex flex-col items-start w-[200px] h-[100px] p-2 text-sm border cursor-pointer hover:bg-blue-100 ml-1 mb-1";

  let groups = Object.values(local.group).sort((a, b) => {
    const aname = a.info.name === "__TRASH__" ? "zzzTRASHzzz" : a.info.name;
    const bname = b.info.name === "__TRASH__" ? "zzzTRASHzzz" : b.info.name;
    return aname.localeCompare(bname);
  });

  if (local.search) {
    groups = [...groups].filter((g) => {
      let count = 0;
      g.comps.forEach((e) => {
        const name = e.name.toLowerCase();
        const id = e.id.toLowerCase();

        if (
          name.includes(local.search.toLowerCase()) ||
          id.includes(local.search.toLowerCase())
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
          c.editor.manager.showComp = false;
          c.editor.manager.compCallback = () => {};
          c.render();
        }}
      ></div>
      <div
        className="fixed inset-[50px] bg-white shadow-2xl"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {local.loading ? (
          <div className="flex w-full h-full items-center justify-center">
            <Loading backdrop={false} />
          </div>
        ) : (
          <div
            className={cx(
              "relative w-full h-full pt-1",
              css`
                contain: content;
                overflow: auto;
              `
            )}
          >
            <Modal
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
                      id_site: wsdoc.site?.id || "",
                      is_owner: false,
                    },
                  });
                  wsdoc.compGroup = {};
                  reloadComps();
                }}
              />
            </Modal>
            <div className="fixed top-0 right-0 bg-white z-10 m-[8px] flex">
              <div
                className="hover:bg-blue-500 hover:text-white text-xs flex items-center px-2 cursor-pointer border text-blue-500 border-blue-200 mr-1"
                onClick={() => {
                  local.sharedPopup = true;
                  local.render();
                }}
              >
                Browse Shared
              </div>
              <input
                type="search"
                value={local.search}
                onChange={(e) => {
                  local.search = e.currentTarget.value;
                  local.render();
                }}
                placeholder="Search"
                className="border  px-2 text-sm h-[26px] outline-none w-[150px] focus:border-blue-500 focus:w-[350px] transition-all"
              />
            </div>
            <div className="flex h-full flex-col space-y-2 select-none">
              {groups.map((g) => {
                return (
                  <Fragment key={g.info.id}>
                    {g.info.name === "__TRASH__" && (
                      <div className="flex-1"></div>
                    )}
                    <div className="flex flex-col border-b pb-2">
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

                            {g.shared && !g.isOwner && (
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
                                          id_site: wsdoc.site?.id || "",
                                        },
                                      },
                                    });
                                  }
                                }}
                              >
                                Detach
                              </div>
                            )}

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
                                          id_site: wsdoc.site?.id || "",
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
                                          id_site: wsdoc.site?.id || "",
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
                            local.search &&
                            !name.includes(local.search.toLowerCase()) &&
                            !id.includes(local.search.toLowerCase())
                          ) {
                            return null;
                          }
                          return (
                            <div
                              key={e.id}
                              className={cx(
                                boxClass,
                                "justify-between transition-all",
                                "hover:border-blue-500",
                                css`
                                  .edit {
                                    display: none;
                                  }

                                  &:hover {
                                    .edit {
                                      display: flex;
                                    }
                                  }
                                `
                              )}
                              onClick={() => {
                                c.editor.manager.showComp = false;
                                c.editor.manager.compCallback(e);
                                c.editor.manager.compCallback = () => {};
                                c.render();
                              }}
                            >
                              <div className="flex flex-col">
                                <div>{e.name}</div>
                                <div className="text-slate-400 text-[10px]">
                                  {e.id}
                                </div>
                              </div>
                              <div
                                className="flex justify-between self-stretch"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  ev.stopPropagation();
                                }}
                              >
                                <div>
                                  {g.info.name !== "__TRASH__" && (
                                    <div
                                      className={cx(
                                        "edit bg-red-200 hover:bg-red-500 transition-all px-3 rounded-sm text-sm text-white"
                                      )}
                                      onClick={async (ev) => {
                                        if (!local.trash_id) {
                                          const res =
                                            await db.component_group.create({
                                              data: {
                                                name: "__TRASH__",
                                                component_site: {
                                                  create: {
                                                    id_site:
                                                      wsdoc.site?.id || "",
                                                  },
                                                },
                                              },
                                            });
                                          local.trash_id = res.id;
                                          await reloadComps();
                                        }

                                        if (local.trash_id) {
                                          local.group[
                                            local.trash_id
                                          ].comps.push(e);
                                          g.comps.splice(idx, 1);
                                          local.render();

                                          db.component.update({
                                            where: {
                                              id: e.id,
                                            },
                                            data: {
                                              id_component_group:
                                                local.trash_id,
                                            },
                                            select: { id: true },
                                          });
                                        }
                                      }}
                                    >
                                      Trash
                                    </div>
                                  )}
                                </div>
                                <Dropdown
                                  value={g.info.id}
                                  items={groups
                                    .filter((e) => e.info.name !== "__TRASH__")
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
      </div>
    </>
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
