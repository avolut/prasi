import { useGlobal, useLocal } from "web-utils";
import { ToolbarBox } from "../../../../../utils/ui/box";
import { Modal } from "../../../../../utils/ui/modal";
import { EditorGlobal } from "../../../logic/global";
import { MonacoEditor } from "../../script/monaco/typings";
import { useEffect } from "react";
import { reloadDBAPI } from "../../../../../utils/script/init-api";
import { w } from "../../../../../utils/types/general";
import { Popover } from "../../../../../utils/ui/popover";
import { execSiteJS } from "../../../logic/init";
import { wsend } from "../../../logic/ws";
import { customMonacoState } from "../../script/monaco/monaco-custom";
import { EScriptCustom } from "../../script/script-custom";
import { AddElement } from "./AddElement";
import { Export } from "./Export";
import { NPMImport } from "./NPMImport";
import { APIConfig } from "./api/APIConfig";

export const ToolbarCenter = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    apiConfigOpen: true,
    siteJS: {
      timeout: null as any,
      editor: null as null | MonacoEditor,
    },
    apiStatus: "" as "" | "started" | "starting" | "stopped",
  });

  const checkApi = async (preventReload?: boolean) => {
    local.apiStatus = "";
    local.render();
    if (typeof preventReload === "boolean") {
      if (preventReload) {
        local.apiStatus = "started";
      } else {
        delete w.prasiApi[p.site.api_url];
        local.apiStatus = "stopped";
      }
      local.render();

      return;
    }

    if (p.site.api_url) {
      try {
        local.apiStatus = "starting";
        local.render();
        await fetch(p.site.api_url + "/_prasi/_");
        local.apiStatus = "started";
        local.render();
      } catch (e) {
        console.log(e);
        local.apiStatus = "stopped";
        local.render();
      }
    }
  };
  useEffect(() => {
    checkApi();
  }, []);

  return (
    <div className={cx("toolbar-mid", "flex")}>
      <Modal
        open={p.script.siteActive}
        onOpenChange={(open) => {
          if (local.siteJS.editor) {
            const state = local.siteJS.editor.saveViewState();
            customMonacoState["site"] = state;
          }
          if (!open) {
            p.script.siteActive = false;
            p.render();
          }
        }}
      >
        <div className="bg-white w-[80vw] h-[80vh] flex">
          <EScriptCustom
            monaco_id="site"
            src={p.site.js}
            onLoad={(e) => {
              local.siteJS.editor = e;
            }}
            onChange={(src, compiled) => {
              if (p.site && p.site.js && p.site.js !== p.site.js_compiled) {
                p.site.js = src;
                p.site.js_compiled = compiled;
                execSiteJS(p);
                p.render();
                clearTimeout(local.siteJS.timeout);
                local.siteJS.timeout = setTimeout(async () => {
                  api.site_edit_js(p.site.id, src, compiled).then((e) => {
                    p.site_dts = e.dts || "";
                    p.render();
                  });

                  p.render();
                  wsend(
                    p,
                    JSON.stringify({ type: "sitejs_reload", id: p.site?.id })
                  );
                }, 1000);
              }
            }}
            propTypes={{
              exports: "Record<string, any>",
              types: "Record<string, string>",
              load: "(src: string) => Promise<any>",
              render: "() => void",
            }}
          />
        </div>
      </Modal>
      <ToolbarBox
        items={[
          {
            content: (
              <>
                <JSIcon />
              </>
            ),
            onClick() {
              p.script.siteActive = true;
              local.render();
            },
          },
        ]}
      />
      <AddElement />
      <div className="w-[5px] h-1"></div>

      <ToolbarBox
        items={[
          {
            onClick: () => {
              local.apiConfigOpen = true;
              local.render();
            },
            className:
              local.apiStatus !== ""
                ? cx(
                    "border-b-2",
                    local.apiStatus === "stopped" && "border-red-600",
                    local.apiStatus === "starting" && "border-yellow-600",
                    local.apiStatus === "started" && "border-green-600"
                  )
                : undefined,
            content: (
              <Popover
                offset={12}
                open={local.apiConfigOpen}
                content={
                  <APIConfig
                    checkApi={checkApi}
                    status={local.apiStatus}
                    close={() => {
                      local.apiConfigOpen = false;
                      local.render();
                    }}
                  />
                }
                onOpenChange={async (open) => {
                  local.apiConfigOpen = open;
                  local.render();

                  if (
                    !open &&
                    (!p.site.api_prasi ||
                      (p.site.api_prasi && !p.site.api_prasi.port))
                  ) {
                    await db.site.update({
                      data: {
                        config: {
                          api_url: p.site.api_url,
                        },
                      },
                      where: {
                        id: p.site?.id,
                      },
                    });
                  }

                  checkApi();
                }}
              >
                API
              </Popover>
            ),
          },
        ]}
      />
      <div className="w-[5px] h-1"></div>
      <ToolbarBox
        items={[
          {
            content: (
              <>
                <Popover
                  content={<NPMImport />}
                  popoverClassName={cx(
                    "bg-white shadow-2xl shadow-slate-400 outline-none border border-slate-300"
                  )}
                >
                  <NPMIcon />
                </Popover>
              </>
            ),
          },
          // {
          //   content: (
          //     <>
          //       <LiveDeploy />
          //     </>
          //   ),
          // },
        ]}
      />
      <div className="w-[5px] h-1"></div>
      <ToolbarBox
        items={[
          {
            content: (
              <Popover
                content={<Export />}
                popoverClassName={cx(
                  "bg-white shadow-2xl shadow-slate-400 outline-none border border-slate-300"
                )}
              >
                <ExportIcon />
              </Popover>
            ),
          },
        ]}
      />
    </div>
  );
};

const JSIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 256 256"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M212.24 83.76l-56-56A6 6 0 00152 26H56a14 14 0 00-14 14v72a6 6 0 0012 0V40a2 2 0 012-2h90v50a6 6 0 006 6h50v122a2 2 0 01-2 2h-24a6 6 0 000 12h24a14 14 0 0014-14V88a6 6 0 00-1.76-4.24zM158 46.48L193.52 82H158zm-12.17 149.58a18.89 18.89 0 01-8.31 13.81c-4.82 3.19-10.87 4.14-16.36 4.14a58.89 58.89 0 01-14.68-2 6 6 0 013.23-11.56c3.71 1 15.58 3.11 21.19-.62a6.85 6.85 0 003-5.34c.58-4.43-2.08-6.26-14.2-9.76-9.31-2.69-23.37-6.75-21.57-20.94a18.61 18.61 0 018.08-13.54c11.11-7.49 29.18-3 31.21-2.48a6 6 0 01-3.06 11.6c-3.78-1-15.85-3-21.45.84a6.59 6.59 0 00-2.88 5.08c-.41 3.22 2.14 4.78 13 7.91 9.89 2.89 24.81 7.2 22.8 22.86zM78 152v38a24 24 0 01-48 0 6 6 0 0112 0 12 12 0 0024 0v-38a6 6 0 0112 0z"
    ></path>
  </svg>
);

const APIcon = () => (
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
      d="M2.15 4a1.85 1.85 0 113.7 0 1.85 1.85 0 01-3.7 0zM4 1.25a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zM5.82 11L2.5 12.837V9.163L5.82 11zM2.64 8.212a.7.7 0 00-1.039.612v4.352a.7.7 0 001.039.613l3.933-2.176a.7.7 0 000-1.225L2.64 8.212zM8.3 9a.7.7 0 01.7-.7h4a.7.7 0 01.7.7v4a.7.7 0 01-.7.7H9a.7.7 0 01-.7-.7V9zm.9.2v3.6h3.6V9.2H9.2zm4.243-7.007a.45.45 0 00-.636-.636L11 3.364 9.193 1.557a.45.45 0 10-.636.636L10.364 4 8.557 5.807a.45.45 0 10.636.636L11 4.636l1.807 1.807a.45.45 0 00.636-.636L11.636 4l1.807-1.807z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const NPMIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M4 10v4h2v-3h1v3h1v-4H4m5 0v5h2v-1h2v-4H9m3 1v2h-1v-2h1m2-1v4h2v-3h1v3h1v-3h1v3h1v-4h-6M3 9h18v6h-9v1H8v-1H3V9z"
    ></path>
  </svg>
);

const ExportIcon = () => (
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
      d="M6.854 3.854l.8-.8c.644-.645 1.775-1.092 2.898-1.253a5.342 5.342 0 011.504-.02c.443.066.714.196.84.323.127.126.257.397.323.84.064.427.059.95-.02 1.504-.16 1.123-.608 2.254-1.253 2.898L7.5 11.793l-1.146-1.146a.5.5 0 10-.708.707l1.5 1.5a.5.5 0 00.708 0l.547-.548 1.17 1.951a.5.5 0 00.783.097l2-2a.5.5 0 00.141-.425l-.465-3.252.624-.623c.855-.856 1.358-2.225 1.535-3.465.09-.627.1-1.25.019-1.794-.08-.528-.256-1.05-.604-1.399-.349-.348-.871-.525-1.4-.604a6.333 6.333 0 00-1.793.02C9.17.987 7.8 1.49 6.946 2.345l-.623.624-3.252-.465a.5.5 0 00-.425.141l-2 2a.5.5 0 00.097.783l1.95 1.17-.547.547a.5.5 0 000 .708l1.5 1.5a.5.5 0 10.708-.708L3.207 7.5l.647-.646 3-3zm3.245 9.34l-.97-1.617 2.017-2.016.324 2.262-1.37 1.37zM3.423 5.87l2.016-2.016-2.262-.324-1.37 1.37 1.616.97zm-1.07 4.484a.5.5 0 10-.707-.708l-1 1a.5.5 0 10.708.707l1-1zm1.5 1.5a.5.5 0 10-.707-.707l-2 2a.5.5 0 00.708.707l2-2zm1.5 1.5a.5.5 0 10-.707-.708l-1 1a.5.5 0 10.708.707l1-1zM9.5 6.748a1.249 1.249 0 100-2.498 1.249 1.249 0 000 2.498z"
      clipRule="evenodd"
    ></path>
  </svg>
);
