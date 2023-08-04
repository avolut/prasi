import { CEGlobal } from "base/global/content-editor";
import { useGlobal, useLocal } from "web-utils";
import { component } from "../../../../page/component";
import { ToolbarBox } from "../../../../ui/box";
import { Modal } from "../../../../ui/modal";
import { Popover } from "../../../../ui/popover";
import { loadSingleComponent } from "../../../comp/load-comp";
import { reloadCE } from "../../../tools/reload-ce";
import { wsdoc } from "../../../ws/wsdoc";
import { MonacoEditor } from "../../script/monaco/typings";
import { ScriptCustom } from "../../script/script-custom";
import { AddElement } from "./AddElement";
import { NPMImport } from "./NPMImport";
import { APIConfig } from "./api/APIConfig";
import { customMonacoState } from "../../script/monaco/monaco-custom";
import { LiveDeploy } from "./deploy/LiveDeploy";

const ua = navigator.userAgent.toLowerCase();
const isMac =
  ua.indexOf("mac") > -1 &&
  ua.indexOf("os") > -1 &&
  !(
    ua.indexOf("iphone") > -1 ||
    ua.indexOf("ipad") > -1 ||
    ua.indexOf("windows") > -1
  );

export const ToolbarMid = () => {
  const c = useGlobal(CEGlobal, "PAGE");
  const local = useLocal({
    apiConfigOpen: false,
    siteJS: {
      open: false,
      timeout: null as any,
      editor: null as null | MonacoEditor,
    },
  });
  return (
    <div className={cx("toolbar-mid", "flex")}>
      <Modal
        open={local.siteJS.open}
        onOpenChange={(open) => {
          if (!open) {
            if (local.siteJS.editor) {
              const state = local.siteJS.editor.saveViewState();
              customMonacoState["site"] = state;
            }
            local.siteJS.open = false;
            local.render();
          }
        }}
      >
        <div className="bg-white w-[80vw] h-[80vh] flex">
          <ScriptCustom
            ceid={"PAGE"}
            monacoid={"site"}
            src={wsdoc.site?.js || ""}
            wrap={(src) => {
              return `${src}`;
            }}
            onLoad={(e) => {
              local.siteJS.editor = e;
            }}
            onChange={(src, built) => {
              if (wsdoc.site) {
                wsdoc.site.js = src;
                wsdoc.site.js_compiled = built;
                wsdoc.site.updated_at = new Date();
              }
              clearTimeout(local.siteJS.timeout);
              local.siteJS.timeout = setTimeout(() => {
                db.site.update({
                  where: {
                    id: wsdoc.site?.id || "",
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
              }, 1000);
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
                {/* <div className="flex font-mono text-[10px]">
                  <div>Site</div>
                  <div className="text-slate-400">JS</div>
                </div> */}
              </>
            ),
            onClick() {
              local.siteJS.open = true;
              local.render();
            },
          },
        ]}
      />

      <div className="w-[5px] h-1"></div>

      <ToolbarBox
        items={[
          {
            onClick: () => {
              local.apiConfigOpen = true;
              local.render();
            },
            content: (
              <Popover
                offset={12}
                open={local.apiConfigOpen}
                content={
                  <APIConfig
                    close={() => {
                      local.apiConfigOpen = false;
                      local.render();
                    }}
                  />
                }
                onOpenChange={(open) => {
                  local.apiConfigOpen = open;
                  local.render();
                }}
              >
                <APIcon />
              </Popover>
            ),
          },
        ]}
      />
      <AddElement id={"PAGE"} />
      <div className="w-[5px] h-1"></div>

      <ToolbarBox
        items={[
          {
            onClick() {
              c.editor.manager.showComp = true;
              c.editor.manager.compCallback = async (comp) => {
                if (comp) {
                  let _c = c;
                  if (!component.docs[comp.id]) {
                    component.docs[comp.id] = await loadSingleComponent(
                      comp.id
                    );
                  }

                  component.edit.show = true;
                  if (!component.edit.tabs) component.edit.tabs = new Set();
                  component.edit.tabs?.add(comp.id);
                  _c.editor.lastActive.item = _c.editor.active;
                  _c.editor.active = null;
                  component.edit.id = comp.id;
                  _c.render();
                }
              };
              c.render();
            },
            tooltip: "Components",
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
                    d="M7.28856 0.796908C7.42258 0.734364 7.57742 0.734364 7.71144 0.796908L13.7114 3.59691C13.8875 3.67906 14 3.85574 14 4.05V10.95C14 11.1443 13.8875 11.3209 13.7114 11.4031L7.71144 14.2031C7.57742 14.2656 7.42258 14.2656 7.28856 14.2031L1.28856 11.4031C1.11252 11.3209 1 11.1443 1 10.95V4.05C1 3.85574 1.11252 3.67906 1.28856 3.59691L7.28856 0.796908ZM2 4.80578L7 6.93078V12.9649L2 10.6316V4.80578ZM8 12.9649L13 10.6316V4.80578L8 6.93078V12.9649ZM7.5 6.05672L12.2719 4.02866L7.5 1.80176L2.72809 4.02866L7.5 6.05672Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </>
            ),
          },
        ]}
      />
      <div className="w-[5px] h-1"></div>
      <ToolbarBox
        items={[
          {
            async onClick() {
              c.editor.page.reload = true;
              c.instances = {};
              await reloadCE(c);
              c.editor.page.reload = false;
              c.render();
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
          {
            content: (
              <>
                <LiveDeploy />
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
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M4 10v4h2v-3h1v3h1v-4H4m5 0v5h2v-1h2v-4H9m3 1v2h-1v-2h1m2-1v4h2v-3h1v3h1v-3h1v3h1v-4h-6M3 9h18v6h-9v1H8v-1H3V9z"
    ></path>
  </svg>
);
