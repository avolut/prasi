import {
  DndProvider,
  MultiBackend,
  NodeModel,
  Tree,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { page, page_folder } from "dbgen";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../../../../base/global/content-editor";
import { Loading } from "../../../../ui/loading";
import { wsdoc } from "../../../ws/wsdoc";
import { PageForm } from "./PageForm";

export type PageItem = {
  id: string;
  name: string;
  url: string;
  id_site: string;
  id_folder: null | string;
};

const data = {
  all: [] as PageItem[],
  folder: {} as Record<string, page_folder>,
  pages: [] as NodeModel<PageItem>[],
};

export const PageManager = () => {
  const c = useGlobal(CEGlobal, "PAGE");
  const local = useLocal({
    page: {
      folder_id: "",
      data: null as Partial<page> | null,
    },
    editPageID: "",
    editFolderID: "",
    loading: false,
    newFolder: { parentID: "", name: "" },
    search: "",
    init: false,
  });

  const reloadPages = async () => {
    const folders = await db.page_folder.findMany({
      where: {
        id_site: wsdoc.site?.id,
        is_deleted: false,
      },
    });
    data.folder = {};
    for (const f of folders) {
      data.folder[f.id] = { ...f };
    }

    data.all = await db.page.findMany({
      where: {
        id_site: wsdoc.site?.id,
        is_deleted: false,
      },
      select: {
        id: true,
        name: true,
        url: true,
        id_site: true,
        id_folder: true,
      },
    });
    local.loading = false;
    local.render();
  };
  if (!Array.isArray(data.all)) {
    data.all = [];
  }

  if (data.all.length === 0) {
    reloadPages();
    local.loading = true;
  }

  if (!local.init && !local.loading) {
    data.pages = [
      {
        id: "ROOT",
        parent: "",
        text: "Pages",
        droppable: true,
      },
    ];
    const folders = new Set<string>();

    for (const page of data.all) {
      const fid = page.id_folder || "-";
      const folder = data.folder[fid];

      if (
        local.search &&
        !(page.name + page.url)
          .toLowerCase()
          .includes(local.search.toLowerCase())
      ) {
        continue;
      }

      data.pages.push({
        id: page.id,
        parent: folder?.id || "ROOT",
        text: page.name,
        data: { content: {}, ...page } as any,
        droppable: false,
      });
    }

    for (const folder of Object.values(data.folder)) {
      if (!folders.has(folder.id)) {
        folders.add(folder.id);
        data.pages.push({
          id: folder.id,
          parent: folder.parent_id || "ROOT",
          text: folder.name || "",
          data: { content: {} } as any,
          droppable: true,
        });
      }
    }

    if (local.newFolder.parentID) {
      data.pages.push({
        id: "F-NEW-FOLDER",
        parent: local.newFolder.parentID,
        text: "",
        droppable: true,
      });
    }
  }

  const rawexpanded = localStorage.getItem("prasi-page-expand");
  let expanded = ["ROOT"];
  if (rawexpanded) {
    expanded = JSON.parse(rawexpanded);
  }

  return (
    <>
      <div
        className="fixed  inset-0 bg-black bg-opacity-10 cursor-pointer"
        onClick={() => {
          c.editor.manager.showPage = false;
          c.render();
        }}
      ></div>
      <div className="fixed inset-[50px] bg-white shadow-2xl">
        {local.loading ? (
          <div className="flex w-full h-full items-center justify-center">
            <Loading backdrop={false} />
          </div>
        ) : (
          <div
            className={cx(
              "relative w-full h-full flex items-stretch",
              css`
                contain: content;
                overflow: auto;

                > ul {
                  width: 100%;
                }

                .row {
                  display: flex;
                  flex-direction: column;
                  align-items: stretch;
                }

                .dropping {
                  background: #efefff;
                }
              `
            )}
          >
            <div className="fixed top-0 right-0 bg-white z-10 m-[8px]">
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
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
              <Tree
                tree={data.pages}
                dragPreviewRender={() => <></>}
                rootId=""
                onDrop={async (newTree: NodeModel<PageItem>[], opt) => {
                  local.init = true;
                  data.pages = newTree;
                  local.render();

                  if (!opt.dragSource?.droppable) {
                    await db.page.update({
                      where: {
                        id: opt.dragSourceId as string,
                      },
                      data: {
                        id_folder: (opt.dropTargetId === "ROOT" ||
                        !opt.dropTargetId
                          ? null
                          : opt.dropTargetId) as string,
                      },
                      select: { id: true },
                    });
                  } else {
                    await db.page_folder.update({
                      where: {
                        id: opt.dragSourceId as string,
                      },
                      data: {
                        parent_id: (opt.dropTargetId === "ROOT" ||
                        !opt.dropTargetId
                          ? null
                          : opt.dropTargetId) as string,
                      },
                      select: {
                        id: true,
                      },
                    });
                  }
                  reloadPages();
                }}
                initialOpen={expanded}
                classes={{
                  listItem: "row",
                  dropTarget: "dropping",
                }}
                onChangeOpen={(ids) => {
                  localStorage.setItem(
                    "prasi-page-expand",
                    JSON.stringify(ids)
                  );
                }}
                render={(node, { depth, isOpen, onToggle, hasChild }) => (
                  <div
                    className={cx(
                      "flex items-center text-[14px] h-[30px] border-b border-l",
                      "hover:bg-blue-50 cursor-pointer transition-all",
                      params.page === node.data?.id &&
                        " border-l-4 border-l-blue-600 bg-blue-100",
                      css`
                        .btn {
                          display: none;
                        }

                        &:hover .btn {
                          display: flex;
                        }
                      `
                    )}
                    style={{ marginInlineStart: depth * 10 }}
                    onClick={() => {
                      if (node.droppable) {
                        onToggle();
                      } else {
                        const page = node.data;
                        if (page && page.id) {
                          c.editor.manager.showPage = false;
                          navigate(`/editor/${page.id_site}/${page.id}`);
                        }
                      }
                    }}
                  >
                    <div className="w-[20px] flex items-center justify-center">
                      {node.droppable && (
                        <>
                          {isOpen && <FolderOpen />}
                          {!isOpen && <FolderClose />}
                        </>
                      )}
                      {!node.droppable && <Elbow />}
                    </div>
                    {local.editFolderID === node.id ? (
                      <input
                        type="text"
                        value={local.newFolder.name}
                        autoFocus
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="text-sm flex-1 self-stretch my-[3px] px-2"
                        onBlur={async () => {
                          local.editFolderID = "";
                          if (local.newFolder.parentID) {
                            if (local.newFolder.name) {
                              const firstPage = data.all[0];
                              db.page_folder
                                .create({
                                  data: {
                                    id_site: firstPage.id_site,
                                    name: local.newFolder.name,
                                    parent_id:
                                      local.newFolder.parentID === "ROOT" ||
                                      !local.newFolder.parentID
                                        ? null
                                        : local.newFolder.parentID,
                                  },
                                })
                                .then(async () => {
                                  local.init = false;
                                  await reloadPages();
                                  local.render();
                                });
                            }
                          } else {
                            node.text = local.newFolder.name;
                            db.page_folder
                              .update({
                                data: {
                                  name: local.newFolder.name,
                                },
                                where: {
                                  id: node.id as string,
                                },
                                select: { id: true },
                              })
                              .then(async () => {
                                local.init = false;
                                await reloadPages();
                                local.render();
                              });
                          }

                          local.newFolder.name = "";
                          local.newFolder.parentID = "";
                          local.render();
                        }}
                        onFocus={(e) => {
                          e.currentTarget.select();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") e.currentTarget.blur();
                        }}
                        onChange={(e) => {
                          local.newFolder.name = e.currentTarget.value;
                          local.render();
                        }}
                      />
                    ) : (
                      <div className="flex-1 flex items-stretch">
                        <div className="pr-5">{node.text}</div>
                        <div
                          className={cx(
                            "flex flex-1 items-stretch space-x-1 pr-[20px] justify-end"
                          )}
                        >
                          {node.id !== "ROOT" && (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();

                                if (node.droppable) {
                                  local.init = false;
                                  local.editFolderID = node.id as string;
                                  local.render();
                                } else {
                                  local.page.data = node.data as any;
                                  local.render();
                                }
                              }}
                              className="btn w-[25px] border rounded-sm flex justify-center items-center text-slate-500 hover:text-blue-700 hover:border-blue-600 bg-white"
                            >
                              <EditIcon />
                            </div>
                          )}
                          {node.droppable && (
                            <>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!isOpen) {
                                    onToggle();
                                  }

                                  local.init = false;
                                  local.editFolderID = "F-NEW-FOLDER";
                                  local.newFolder.parentID = node.id as string;
                                  local.render();
                                }}
                                className="btn px-2 text-xs border rounded-sm flex justify-center items-center text-slate-500 hover:text-blue-700 hover:border-blue-600 bg-white"
                              >
                                <span> + Folder</span>
                              </div>

                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!isOpen) {
                                    onToggle();
                                  }

                                  local.init = false;
                                  local.page.data = {
                                    id_site: wsdoc.site?.id,
                                    id_folder: node.id as string,
                                  };
                                  local.page.folder_id = node.id as string;
                                  local.render();
                                }}
                                className="btn px-2 text-xs border rounded-sm flex justify-center items-center text-slate-500 hover:text-blue-700 hover:border-blue-600 bg-white"
                              >
                                <span> + Page</span>
                              </div>
                            </>
                          )}

                          {!node.droppable && (
                            <div
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (confirm("Clone page ?")) {
                                  local.loading = true;
                                  local.render();
                                  const page = (await db.page.findFirst({
                                    where: { id: node.id as string },
                                  })) as any;

                                  delete page.id;
                                  page.name = `${page.name} [Cloned]`;
                                  page.url = `${page.url}-cloned`;
                                  await db.page.create({
                                    data: page,
                                  });
                                  await reloadPages();
                                  local.init = false;
                                  local.loading = false;
                                  local.render();
                                }
                              }}
                              className="btn w-[25px] text-xs border rounded-sm flex justify-center items-center text-slate-500 hover:text-blue-700 hover:border-blue-600 bg-white"
                            >
                              <CopyIcon />
                            </div>
                          )}

                          {((node.droppable && !hasChild) ||
                            (!node.droppable && data.all.length > 1)) && (
                            <div
                              onClick={async (e) => {
                                e.stopPropagation();

                                if (
                                  confirm(
                                    "Deletting cannot be undone. Are you sure ?"
                                  )
                                ) {
                                  if (node.droppable) {
                                    local.init = false;
                                    delete data.folder[node.id];
                                    local.render();
                                    db.page_folder.update({
                                      where: { id: node.id as string },
                                      data: {
                                        is_deleted: true,
                                      },
                                    });
                                  } else {
                                    local.loading = true;
                                    local.render();
                                    await db.page.update({
                                      where: { id: node.id as string },
                                      data: {
                                        is_deleted: true,
                                      },
                                    });
                                    await reloadPages();

                                    local.init = false;
                                    local.loading = false;
                                    local.render();
                                  }
                                }
                              }}
                              className="btn w-[25px] text-xs border rounded-sm flex justify-center items-center text-slate-500 hover:text-blue-700 hover:border-blue-600 bg-white"
                            >
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
                                  d="M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex-1">{node.data?.url}</div>
                  </div>
                )}
              />
            </DndProvider>
          </div>
        )}

        {local.page.data && (
          <PageForm
            onClose={() => {
              local.page.data = null;
              local.render();
            }}
            onSave={async (res) => {
              local.page.data = null;
              local.render();

              data.all.forEach((e) => {
                if (e.id === res.id) {
                  e.name = res.name;
                  e.url = res.url;
                }
              });

              data.pages.forEach((e) => {
                if (e.id === res.id && e.data) {
                  e.data.name = res.name;
                  e.data.url = res.url;
                }
              });
            }}
            page={local.page.data}
          />
        )}
      </div>
    </>
  );
};

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.146 1.146a.5.5 0 01.707 0l2 2a.5.5 0 010 .708l-3.942 3.942a1 1 0 01-.26.188L6.724 9.947a.5.5 0 01-.671-.67l1.963-3.928a1 1 0 01.188-.26l3.942-3.943zm.354 1.061l-3.59 3.59-1.037 2.076.254.254 2.077-1.038L13.793 3.5 12.5 2.207zM10 2L9 3H4.9c-.428 0-.72 0-.944.019-.22.018-.332.05-.41.09a1 1 0 00-.437.437c-.04.078-.072.19-.09.41C3 4.18 3 4.472 3 4.9v6.2c0 .428 0 .72.019.944.018.22.05.332.09.41a1 1 0 00.437.437c.078.04.19.072.41.09.225.019.516.019.944.019h6.2c.428 0 .72 0 .944-.019.22-.018.332-.05.41-.09a1 1 0 00.437-.437c.04-.078.072-.19.09-.41.019-.225.019-.516.019-.944V7l1-1V11.12c0 .403 0 .735-.022 1.006-.023.281-.072.54-.196.782a2 2 0 01-.874.874c-.243.124-.501.173-.782.196-.27.022-.603.022-1.005.022H4.88c-.403 0-.735 0-1.006-.022-.281-.023-.54-.072-.782-.196a2 2 0 01-.874-.874c-.124-.243-.173-.501-.196-.782C2 11.856 2 11.523 2 11.12V4.88c0-.403 0-.735.022-1.006.023-.281.072-.54.196-.782a2 2 0 01.874-.874c.243-.124.501-.173.782-.196C4.144 2 4.477 2 4.88 2H10z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const Elbow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    className={cx(
      css`
        opacity: 0.3;
      `
    )}
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.877 12H11.5a.5.5 0 000-1H9.9c-1.128 0-1.945 0-2.586-.053-.637-.052-1.057-.152-1.403-.329a3.5 3.5 0 01-1.53-1.529c-.176-.346-.276-.766-.328-1.403C4 7.045 4 6.228 4 5.1V3.5a.5.5 0 00-1 0v1.623c0 1.1 0 1.958.056 2.645.057.698.175 1.265.434 1.775a4.5 4.5 0 001.967 1.966c.51.26 1.077.378 1.775.435C7.92 12 8.776 12 9.877 12z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const FolderClose = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 20 20"
    strokeWidth={1}
    width={13}
    height={13}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  </svg>
);

const FolderOpen = () => (
  <svg
    fill="currentColor"
    strokeWidth={1}
    width={13}
    height={13}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      clipRule="evenodd"
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
    />
    <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
  </svg>
);

const CopyIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);
