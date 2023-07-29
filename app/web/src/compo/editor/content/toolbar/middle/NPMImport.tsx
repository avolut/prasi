import algoliasearch from "algoliasearch";
import { npm_page, npm_site } from "dbgen";
import { FC } from "react";
import { useLocal } from "web-utils";
import { Loading } from "../../../../ui/loading";
import { Popover } from "../../../../ui/popover";
import { wsdoc } from "../../../ws/wsdoc";

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
      className={cx("w-[500px] h-[400px] text-xs relative flex items-stretch")}
    >
      {w.npmImport.loading ? (
        <Loading backdrop={false} />
      ) : (
        <>
          <NPMModule
            mode="site"
            onChange={async (e) => {
              await db.npm_site.create({
                data: {
                  id_site: wsdoc.site?.id || "",
                  module: e.name,
                  version: e.version,
                },
              });
            }}
          />
          <div className="border-r border-slate-300"></div>
          <NPMModule
            mode="page"
            onChange={async (e) => {
              await db.npm_page.create({
                data: {
                  id_page: wsdoc.page_id || "",
                  module: e.name,
                  version: e.version,
                },
              });
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
  });

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
    <div className="flex-1 flex flex-col">
      <div
        className={cx(
          "border-b border-slate-300 p-2 flex justify-between",
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
        <div className="bg-slate-600 text-white hover:bg-blue-500 px-2 text-[10px] cursor-pointer bundle opacity-20 transition-all">
          Bundle
        </div>
        <div className="font-mono text-[9px]">0 kb</div>
      </div>
      <Popover
        open={local.search.result.length > 0}
        className="border-b flex items-stretch"
        arrow={false}
        popoverClassName="bg-white border max-h-[200px] overflow-auto text-xs -mt-[5px] w-[250px]"
        content={
          <div className="flex flex-col items-stretch">
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
  return (
    <div className="flex border-b select-none ">
      <div className="flex-1 flex flex-col items-star py-1">
        <div className="pl-1 flex flex-1 items-center hover:text-blue-500 hover:underline cursor-pointer">
          {camel(item.module)}{" "}
        </div>
        <div className="text-[10px] pl-1 text-slate-500 hover:text-blue-500 hover:underline cursor-pointer">
          5 named imports{" "}
        </div>
      </div>
      <div className="flex items-stretch">
        <div className="border-r pr-1 flex flex-col items-end py-1">
          <div className="flex items-center mt-1">
            <div className="">{item.module}</div>
          </div>
          <div className="text-[10px] -mt-1 text-slate-500">{item.version}</div>
        </div>
        <div
          className="w-[20px] flex items-center justify-center hover:text-white hover:bg-red-500 cursor-pointer text-slate-500"
          onClick={() => {
            if (confirm("Really ?")) {
              remove(item);
            }
          }}
        >
          <Trash />
        </div>
      </div>
    </div>
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
