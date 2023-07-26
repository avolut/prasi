import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../../../../base/global/content-editor";
import algoliasearch from "algoliasearch";
import { FC } from "react";
import { Popover } from "../../../../ui/popover";

const algolia = algoliasearch("OFCNCOG2CU", "f54e21fa3a2a0160595bb058179bfb1e");
const npm = algolia.initIndex("npm-search");

type NPMResult = {
  name: string;
  objectID: string;
  version: string;
  _highlightResult: { name: { value: string } };
}[];

export const NPMImport = () => {
  return (
    <div className={cx("w-[500px] h-[400px] text-xs  flex items-stretch")}>
      <NPMModule mode="site" />
      <div className="border-r border-slate-300"></div>
      <NPMModule mode="page" />
    </div>
  );
};

const NPMModule: FC<{ mode: "site" | "page" }> = ({ mode }) => {
  const local = useLocal({
    search: { value: "", timeout: null as any, result: [] as NPMResult },
  });
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
        <div className="absolute"></div>
      </div>
    </div>
  );
};
