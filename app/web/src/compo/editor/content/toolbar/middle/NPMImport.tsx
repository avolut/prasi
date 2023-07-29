import algoliasearch from "algoliasearch";
import { npm_page, npm_site } from "dbgen";
import { FC, useCallback } from "react";
import { useLocal } from "web-utils";
import { Loading } from "../../../../ui/loading";
import { Popover } from "../../../../ui/popover";
import { wsdoc } from "../../../ws/wsdoc";
import { Tooltip } from "../../../../ui/tooltip";

const algolia = algoliasearch("OFCNCOG2CU", "f54e21fa3a2a0160595bb058179bfb1e");
const npm = algolia.initIndex("npm-search");
type NPMResultSingle = {
  name: string;
  objectID: string;
  version: string;
  _highlightResult: { name: { value: string } };
};
type NPMImportAs = {
  main: { mode: "default" | "*"; name: string };
  names: string[];
};
type NPMResult = NPMResultSingle[];

const w = window as unknown as {
  npmImport: {
    init: boolean;
    loading: false | Promise<any>;
    site: npm_site[];
    page: Record<string, npm_page[]>;
  };
};

if (!w.npmImport) {
  w.npmImport = {
    init: false,
    loading: false,
    site: [],
    page: {},
  };
}

export const NPMImport = () => {
  const local = useLocal({});

  if (!w.npmImport.init) {
    w.npmImport.init = true;
    w.npmImport.loading = Promise.all([
      db.npm_site
        .findMany({
          where: {
            id_site: wsdoc.site?.id,
          },
        })
        .then((e) => {
          w.npmImport.site = e;
        }),
      db.npm_page
        .findMany({
          where: {
            id_page: wsdoc.page_id,
          },
        })
        .then((e) => {
          w.npmImport.page[wsdoc.page_id] = e;
        }),
    ]);
  }

  if (w.npmImport.loading) {
    w.npmImport.loading.then(() => {
      w.npmImport.loading = false;
      local.render();
    });
  }

  return (
    <div
      className={cx("text-sm w-[700px] h-[400px] relative flex items-stretch")}
    >
      {w.npmImport.loading ? (
        <Loading backdrop={false} />
      ) : (
        <>
          <NPMModule
            mode="site"
            onChange={async (e) => {
              const res = await db.npm_site.create({
                data: {
                  id_site: wsdoc.site?.id || "",
                  module: e.name,
                  version: e.version,
                },
              });

              w.npmImport.site.push(res);
              local.render();
            }}
          />
          <div className="border-r border-slate-300"></div>
          <NPMModule
            mode="page"
            onChange={async (e) => {
              const res = await db.npm_page.create({
                data: {
                  id_page: wsdoc.page_id || "",
                  module: e.name,
                  version: e.version,
                },
              });

              w.npmImport.page[wsdoc.page_id].push(res);
              local.render();
            }}
          />
        </>
      )}
    </div>
  );
};

const NPMModule: FC<{
  mode: "site" | "page";
  onChange: (e: NPMResultSingle) => any;
}> = ({ mode, onChange }) => {
  const local = useLocal({
    loading: false,
    search: { value: "", timeout: null as any, result: [] as NPMResult },
    searchRef: null as any,
    bundling: false,
  });

  const focus = useCallback(() => {
    local.searchRef.focus();
  }, [local.searchRef]);

  let list = [] as npm_page[] | npm_site[];
  if (mode === "site") {
    list = w.npmImport.site;
  } else if (mode === "page") {
    if (w.npmImport.page[wsdoc.page_id]) {
      list = w.npmImport.page[wsdoc.page_id];
    } else {
      local.loading = true;
      db.npm_page
        .findMany({
          where: {
            id_page: wsdoc.page_id,
          },
        })
        .then((e) => {
          w.npmImport.page[wsdoc.page_id] = e;
          local.loading = false;
          local.render();
        });
    }
  }

  if (local.loading) {
    return <Loading backdrop={false} />;
  }

  return (
    <div
      className={cx("flex flex-col", mode === "site" ? "flex-1" : "w-[53%]")}
    >
      <div
        className={cx(
          "border-b border-slate-300 p-2 flex justify-between select-none",
          css`
            &:hover {
              .bundle {
                opacity: 1;
              }
            }
          `
        )}
      >
        <div className="text-slate-600">
          <span className="capitalize">{mode}</span> Module
        </div>
        {local.bundling ? (
          <div className="flex relative flex-1">
            <Loading backdrop={false} />
            Bundling...
          </div>
        ) : (
          <>
            <div
              className="bg-slate-600 text-white hover:bg-blue-500 px-2  cursor-pointer bundle opacity-20 transition-all"
              onClick={async () => {
                local.bundling = true;
                local.render();
                if (mode === "site") {
                  await db.npm_site.updateMany({
                    where: {
                      id_site: wsdoc.site?.id || "",
                    },
                    data: {
                      bundled: true,
                    },
                  });
                  list.forEach((e) => {
                    e.bundled = true;
                  });
                  local.bundling = false;
                  local.render();
                }
              }}
            >
              Bundle
            </div>
            <div className="font-mono text-[12px]">0 kb</div>
          </>
        )}
      </div>
      <Popover
        open={local.search.result.length > 0}
        onOpenChange={(open) => {
          if (!open) {
            local.search.result = [];
            local.render();
          }
        }}
        className="border-b flex items-stretch"
        arrow={false}
        popoverClassName="bg-white border max-h-[200px] overflow-auto text-xs -mt-[5px] w-[300px]"
        content={
          <div className="text-sm flex flex-col items-stretch">
            {local.search.result.map((e) => {
              return (
                <div
                  key={e.objectID}
                  className={cx(
                    "p-1 hover:bg-blue-100 cursor-pointer flex flex-col",
                    css`
                      em {
                        font-weight: bold;
                        text-decoration: underline;
                        font-style: normal;
                      }
                    `
                  )}
                  onClick={() => {
                    onChange(e);
                    local.search.value = "";
                    local.search.result = [];
                    local.render();
                    focus();
                  }}
                >
                  <div className="flex space-x-1">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: e._highlightResult.name.value,
                      }}
                    ></div>
                    <div>{e.version}</div>
                  </div>
                </div>
              );
            })}
          </div>
        }
        autoFocus={false}
      >
        <input
          type="search"
          placeholder="+ Add Module"
          value={local.search.value}
          spellCheck={false}
          ref={(e) => {
            if (e && e.tagName === "INPUT") {
              local.searchRef = e;
            }
          }}
          className="flex flex-1 p-1 outline-none "
          onChange={async (e) => {
            local.search.value = e.currentTarget.value;
            if (!local.search.value) {
              local.search.result = [];
              local.render();
            } else {
              local.render();
              clearTimeout(local.search.timeout);
              local.search.timeout = setTimeout(async () => {
                const res = await npm.search(local.search.value);
                local.search.result = res.hits as any;
                local.render();
              }, 300);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            }
          }}
        />
      </Popover>
      <div className="flex-1 flex flex-col relative overflow-auto">
        <div className="absolute  inset-0 flex flex-col items-stretch">
          {list.map((e) => {
            return (
              <ImportItem
                key={e.id.toString()}
                item={e}
                mode={mode}
                remove={async (e) => {
                  if (mode === "site") {
                    await db.npm_site.delete({
                      where: { id: BigInt(e.id) },
                    });
                    w.npmImport.site = w.npmImport.site.filter(
                      (item) => e.id !== item.id
                    );
                  } else {
                    await db.npm_page.delete({
                      where: { id: BigInt(e.id) },
                    });

                    w.npmImport.page[wsdoc.page_id] = w.npmImport.page[
                      wsdoc.page_id
                    ].filter((item) => e.id !== item.id);
                  }

                  local.render();
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ImportItem: FC<{
  item: npm_site | npm_page;
  mode: "site" | "page";
  remove: (e: npm_site | npm_page) => Promise<void>;
}> = ({ item, mode, remove }) => {
  const local = useLocal({});
  const import_as = item.import_as as NPMImportAs;
  return (
    <Tooltip
      content={
        <div
          className={cx(
            "-mx-1 px-1",
            item.bundled
              ? "text-green-700 border-b border-green-700 font-bold"
              : "text-black"
          )}
        >
          {item.bundled ? "Already bundled" : "Not bundled yet"}
        </div>
      }
      delay={0}
      placement={mode === "site" ? "left" : "right"}
      className={cx(
        "flex border-b select-none ",
        item.bundled ? "bg-green-50" : ""
      )}
    >
      <div className="flex items-center flex-1 ">
        <div className="flex flex-col items-start leading-4 py-1">
          <MainImport item={item} render={local.render} mode={mode}>
            <>
              {import_as.main.name ? (
                <div className="pl-1 flex flex-1 items-center hover:text-blue-500 hover:underline cursor-pointer font-bold">
                  {import_as.main.mode === "*" ? (
                    <>
                      <span className="text-slate-400 ">import * as</span>
                      <span className="ml-1">{import_as.main.name}</span>
                    </>
                  ) : (
                    import_as.main.name
                  )}
                </div>
              ) : (
                <div className="pl-1 flex flex-1 items-center text-slate-500  hover:text-blue-500 hover:underline cursor-pointer">
                  No default import
                </div>
              )}
            </>
          </MainImport>
          <NamedImport item={item} render={local.render} mode={mode}>
            <div className=" pl-1 text-slate-500 hover:text-blue-500 hover:underline cursor-pointer">
              <span
                className={cx(
                  import_as.names.length > 0 && "text-blue-500 font-bold"
                )}
              >
                {import_as.names.length === 0 ? "No" : import_as.names.length}{" "}
                named
              </span>{" "}
              imports
            </div>
          </NamedImport>
        </div>
      </div>
      <div className="flex items-stretch">
        <div className="border-r pr-1 flex flex-col line leading-4 items-end py-1">
          <a
            href={`https://www.npmjs.com/package/${item.module}`}
            target="_blank"
            className={cx(
              css`
                &:hover {
                  svg {
                    width: 14px;
                  }
                }
              `,
              "flex items-center hover:text-blue-500 hover:underline cursor-pointer"
            )}
          >
            <div className="break-words max-w-[140px] overflow-hidden text-right">
              {item.module}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 32 32"
              className="transition-all link w-0 overflow-hidden"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 5v22h22V5zm2 2h18v18H7zm6 3v2h5.563L9.28 21.281l1.438 1.438L20 13.437V19h2v-9z"
              ></path>
            </svg>
          </a>
          <div className="  text-slate-500">{item.version}</div>
        </div>
        <div
          className="w-[20px] flex items-center justify-center hover:text-white hover:bg-red-500 cursor-pointer text-slate-500"
          onClick={() => {
            if (confirm("Remove this import ?")) {
              remove(item);
            }
          }}
        >
          <Trash />
        </div>
      </div>
    </Tooltip>
  );
};

const MainImport: FC<{
  mode: "site" | "page";
  item: npm_page | npm_site;
  children: any;
  render: () => void;
}> = ({ item, children, render, mode }) => {
  const local = useLocal({
    open: false,
  });
  const import_as = item.import_as as NPMImportAs;
  return (
    <Popover
      autoFocus={false}
      placement="left"
      open={local.open}
      popoverClassName="bg-white shadow-2xl shadow-slate-600 border-2 border-slate-400 px-[8px] py-[5px]"
      onOpenChange={(open) => {
        local.open = open;
        if (!open) {
          if (mode === "site") {
            db.npm_site.update({
              where: { id: item.id },
              data: {
                import_as,
              },
            });
          } else {
            db.npm_page.update({
              where: { id: item.id },
              data: {
                import_as,
              },
            });
          }
        }
        local.render();
      }}
      content={
        <div className="text-sm flex flex-col font-mono  space-y-1 py-1">
          <div className={"flex items-center whitespace-nowrap"}>
            <div>import</div>
            <div
              className="border ml-1 w-[95px] py-[2px] cursor-pointer hover:bg-blue-500 hover:text-white hover:border-transparent pl-1 whitespace-nowrap"
              onClick={() => {
                import_as.main.mode =
                  import_as.main.mode === "*" ? "default" : "*";
                render();
              }}
            >
              {import_as.main.mode === "*" ? "* as " : "default as"}
            </div>
          </div>
          <input
            autoFocus
            value={import_as.main.name}
            onChange={(e) => {
              import_as.main.name = e.currentTarget.value;
              render();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                local.open = false;
                local.render();
              }
            }}
            spellCheck={false}
            className="outline-none border p-1 focus:border-blue-500"
          />
        </div>
      }
    >
      <div
        onClick={() => {
          local.open = true;
          local.render();
        }}
      >
        {children}
      </div>
    </Popover>
  );
};

const NamedImport: FC<{
  mode: "site" | "page";
  item: npm_page | npm_site;
  children: any;
  render: () => void;
}> = ({ mode, item, children, render }) => {
  const import_as = item.import_as as NPMImportAs;
  const local = useLocal({
    new: null as any,
    focusIdx: -1,
    open: false,
  });

  const newFocus = useCallback(() => {
    local.new.focus();
  }, [local.new]);
  return (
    <Popover
      autoFocus={false}
      placement="left"
      open={local.open}
      popoverClassName="bg-white shadow-2xl shadow-slate-600 border-2 border-slate-400 px-[8px] py-[5px]"
      onOpenChange={(open) => {
        local.open = open;
        if (!open) {
          if (mode === "site") {
            db.npm_site.update({
              where: { id: item.id },
              data: {
                import_as,
              },
            });
          } else {
            db.npm_page.update({
              where: { id: item.id },
              data: {
                import_as,
              },
            });
          }
        }
        local.render();
      }}
      content={
        <div className="text-sm flex flex-col font-mono  space-y-1 py-1">
          <div className={"flex items-center"}>
            <div>import {"{...}"}</div>
          </div>
          {import_as.names.map((e, idx) => {
            return (
              <input
                ref={(el) => {
                  if (el && local.focusIdx === idx) {
                    local.focusIdx = -1;
                    el.focus();
                  }
                }}
                spellCheck={false}
                key={idx}
                value={e}
                onChange={(ev) => {
                  import_as.names[idx] = ev.currentTarget.value;
                  if (!import_as.names[idx]) {
                    import_as.names.splice(idx, 1);
                  }
                  render();
                  if (idx < import_as.names.length) {
                    local.focusIdx = idx;
                  } else {
                    local.focusIdx = idx - 1;
                  }

                  if (import_as.names.length === 0) {
                    newFocus();
                  }
                }}
                className="outline-none border p-1 focus:border-blue-500"
              />
            );
          })}
          <input
            autoFocus
            spellCheck={false}
            ref={(el) => {
              local.new = el;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            onBlur={(e) => {
              if (e.currentTarget.value) {
                import_as.names.push(e.currentTarget.value);
                e.currentTarget.value = "";
                render();
                newFocus();
              }
            }}
            placeholder="New Named Import"
            className="outline-none border p-1 focus:border-blue-500"
          />
        </div>
      }
    >
      <div
        onClick={() => {
          local.open = true;
          local.render();
        }}
      >
        {children}
      </div>
    </Popover>
  );
};

const Trash = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
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
);

const camel = function (snakeCased: string) {
  // Use a regular expression to find the underscores + the next letter
  return snakeCased.replace(/(\W\w)/g, function (match) {
    // Convert to upper case and ignore the first char (=the underscore)
    return match.toUpperCase().substring(1);
  });
};
