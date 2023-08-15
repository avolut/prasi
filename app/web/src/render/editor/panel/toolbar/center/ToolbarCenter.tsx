import { useGlobal, useLocal } from "web-utils";
import { ToolbarBox } from "../../../../../utils/ui/box";
import { Modal } from "../../../../../utils/ui/modal";
import { EditorGlobal } from "../../../logic/global";
import { MonacoEditor } from "../../script/monaco/typings";
// import { customMonacoState } from "../../script/monaco/monaco-custom";
import { Popover } from "../../../../../utils/ui/popover";
import { execSiteJS } from "../../../logic/init";
import { wsend } from "../../../logic/ws";
import { customMonacoState } from "../../script/monaco/monaco-custom";
import { EScriptCustom } from "../../script/script-custom";
import { AddElement } from "./AddElement";
import { NPMImport } from "./NPMImport";
import { APIConfig } from "./api/APIConfig";
import { useEffect } from "react";
import { reloadDBAPI } from "../../../../../utils/script/api";
import { w } from "../../../../../utils/types/general";
const ua = navigator.userAgent.toLowerCase();
const isMac =
  ua.indexOf("mac") > -1 &&
  ua.indexOf("os") > -1 &&
  !(
    ua.indexOf("iphone") > -1 ||
    ua.indexOf("ipad") > -1 ||
    ua.indexOf("windows") > -1
  );

export const ToolbarCenter = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    apiConfigOpen: false,
    siteJS: {
      timeout: null as any,
      editor: null as null | MonacoEditor,
    },
    apiOnline: null as null | boolean,
  });

  const checkApi = async (status?: boolean) => {
    if (typeof status === "boolean") {
      if (local.apiOnline) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await reloadDBAPI(p.site.api_url);
      } else {
        delete w.prasiApi[p.site.api_url];
      }

      local.apiOnline = status;
      local.render();
      return;
    }

    if (p.site.api_url) {
      try {
        await fetch(p.site.api_url + "/_prasi/api-types");
        local.apiOnline = true;

        await reloadDBAPI(p.site.api_url);
      } catch (e) {
        local.apiOnline = false;
      }
      local.render();
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
            local.render();
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
            onChange={(src, built) => {
              if (p.site) {
                p.site.js = src;
                p.site.js_compiled = built;
                execSiteJS(p);
                p.render();
              }
              clearTimeout(local.siteJS.timeout);
              local.siteJS.timeout = setTimeout(async () => {
                await db.site.update({
                  where: {
                    id: p.site?.id || "",
                  },
                  data: {
                    js: src,
                    js_compiled: built,
                    updated_at: new Date(),
                  },
                  select: {
                    id: true,
                  },
                });
                wsend(
                  p,
                  JSON.stringify({ type: "sitejs_reload", id: p.site?.id })
                );
              }, 600);
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
              typeof local.apiOnline === "boolean"
                ? cx(
                    "border-b-2",
                    !local.apiOnline ? "border-red-600" : "border-green-600"
                  )
                : undefined,
            content: (
              <Popover
                offset={12}
                open={local.apiConfigOpen}
                content={
                  <APIConfig
                    checkApi={checkApi}
                    close={() => {
                      local.apiConfigOpen = false;
                      local.render();
                    }}
                  />
                }
                onOpenChange={(open) => {
                  local.apiConfigOpen = open;
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
            async onClick() {
              if (p.page) {
                p.page.effects = {};
                p.render();
              }
            },
            tooltip: <>Reload Page ({isMac ? "⌘" : "Ctrl"} + S)</>,
            content: (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </>
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
    <path d="M212.24 83.76l-56-56A6 6 0 00152 26H56a14 14 0 00-14 14v72a6 6 0 0012 0V40a2 2 0 012-2h90v50a6 6 0 006 6h50v122a2 2 0 01-2 2h-24a6 6 0 000 12h24a14 14 0 0014-14V88a6 6 0 00-1.76-4.24zM158 46.48L193.52 82H158zm-12.17 149.58a18.89 18.89 0 01-8.31 13.81c-4.82 3.19-10.87 4.14-16.36 4.14a58.89 58.89 0 01-14.68-2 6 6 0 013.23-11.56c3.71 1 15.58 3.11 21.19-.62a6.85 6.85 0 003-5.34c.58-4.43-2.08-6.26-14.2-9.76-9.31-2.69-23.37-6.75-21.57-20.94a18.61 18.61 0 018.08-13.54c11.11-7.49 29.18-3 31.21-2.48a6 6 0 01-3.06 11.6c-3.78-1-15.85-3-21.45.84a6.59 6.59 0 00-2.88 5.08c-.41 3.22 2.14 4.78 13 7.91 9.89 2.89 24.81 7.2 22.8 22.86zM78 152v38a24 24 0 01-48 0 6 6 0 0112 0 12 12 0 0024 0v-38a6 6 0 0112 0z"></path>
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
