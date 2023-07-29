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
      <div className="flex-1 flex flex-col items-stretch relative overflow-auto">
        <div className="absolute">
          {list.map((e) => {
            return <ImportItem key={e.id.toString()} item={e} />;
          })}
        </div>
      </div>
    </div>
  );
};

const ImportItem: FC<{ item: npm_site | npm_page }> = ({ item }) => {
  return (
    <div className="flex">
      {item.module}
      {item.version}
    </div>
  );
};
