import algoliasearch from "algoliasearch";
import { npm_page, npm_site } from "dbgen";
import { FC, useCallback, useEffect } from "react";
import { useLocal } from "web-utils";
import { Loading } from "../../../../ui/loading";
import { Popover } from "../../../../ui/popover";
import { wsdoc } from "../../../ws/wsdoc";
import { Tooltip } from "../../../../ui/tooltip";
import { NPMImportAs } from "./api/npm-type";

const algolia = algoliasearch("OFCNCOG2CU", "f54e21fa3a2a0160595bb058179bfb1e");
const npm = algolia.initIndex("npm-search");
type NPMResultSingle = {
  name: string;
  objectID: string;
  version: string;
  _highlightResult: { name: { value: string } };
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
              try {
                const f = await fetch(
                  `https://data.jsdelivr.com/v1/packages/npm/${e.name}`
                );
                const j = await f.json();
                const version = j.versions[0].version;
                const res = await db.npm_site.create({
                  data: {
                    id_site: wsdoc.site?.id || "",
                    module: e.name,
                    version: version,
                  },
                });

                w.npmImport.site.push(res);
                local.render();
              } catch (e: any) {
                alert("Failed!");
                console.log(e);
              }
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
                await api.npm_bundle(
                  mode,
                  mode === "site" ? wsdoc.site?.id || "" : wsdoc.page_id
                );
                local.bundling = false;
                list.forEach((e) => {
                  e.bundled = true;
                });
                local.render();
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
  const local = useLocal({ show: false });
  const import_as = item.import_as as NPMImportAs;
  return (
    <Tooltip
      open={local.show}
      content={
        <div
          className={cx(
            "px-1",
            item.bundled
              ? "bg-green-700 my-1 text-white font-bold"
              : "-mx-1  text-black"
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
      <div
        className="flex items-center flex-1 "
        onMouseEnter={() => {
          local.show = true;
          local.render();
        }}
        onMouseLeave={() => {
          local.show = false;
          local.render();
        }}
        onClick={() => {
          local.show = false;
          local.render();
        }}
      >
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
          <div className=" text-slate-500">{item.version}</div>
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
  useEffect(() => {
    if (!local.open) {
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
  }, [local.open]);
  const import_as = item.import_as as NPMImportAs;
  return (
    <Popover
      autoFocus={false}
      placement="left"
      open={local.open}
      popoverClassName="bg-white shadow-2xl shadow-slate-600 border-2 border-slate-400 px-[8px] py-[5px]"
      onOpenChange={(open) => {
        local.open = open;
        local.render();
      }}
      content={
        <div className="text-[12px] flex flex-col font-mono  space-y-1 py-1">
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
              item.bundled = false;
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

  useEffect(() => {
    if (!local.open) {
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
  }, [local.open]);
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
        local.render();
      }}
      content={
        <div className="text-[12px] flex flex-col font-mono  space-y-1 py-1">
          <div className={"flex items-center"}>
            <div>import {"{...}"}</div>
          </div>
          {import_as.names.map((e, idx) => {
            const valid = isValidIdentifier(e);
            return (
              <Popover
                open={!valid}
                placement="right"
                backdrop={false}
                key={idx}
                autoFocus={false}
                arrow={false}
                content={
                  <div
                    className={cx(
                      "text-white bg-red-500 px-3 ",
                      css`
                        margin: -3px -9px -3px -14px;
                      `
                    )}
                  >
                    Invalid Name
                  </div>
                }
              >
                <input
                  ref={(el) => {
                    if (el && local.focusIdx === idx) {
                      local.focusIdx = -1;
                      el.focus();
                    }
                  }}
                  spellCheck={false}
                  value={e}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && local.new) {
                      local.new.focus();
                    }
                  }}
                  onChange={(ev) => {
                    item.bundled = false;
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
                  className={cx(
                    "outline-none border p-1",
                    !valid ? "border-red-500" : "focus:border-blue-500"
                  )}
                />
              </Popover>
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
                const vals = e.currentTarget.value.split(",");
                vals.forEach((e) => {
                  import_as.names.push(e.trim());
                });

                item.bundled = false;
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
const isValidIdentifier = (str: string) => {
  return /^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|null|this|true|void|with|await|break|catch|class|const|false|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7B9\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDF00-\uDF1C\uDF27\uDF30-\uDF45]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFF1]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D])(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u07FD\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D3-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7B9\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD27\uDD30-\uDD39\uDF00-\uDF1C\uDF27\uDF30-\uDF50]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD44-\uDD46\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDC9-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3B-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5E\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDC00-\uDC3A\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFF1]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])*$/.test(
    str
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
