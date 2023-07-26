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
                <div className="flex font-mono text-[10px]">
                  <div>Site</div>
                  <div className="text-slate-400">JS</div>
                </div>
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
                <div className={"api font-mono text-[10px]"}>API</div>
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
            onClick() {
              reloadCE(c);
            },
            tooltip: "Reload Page",
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
                  arrow={false}
                  content={<NPMImport />}
                  popoverClassName="bg-white shadow-2xl outline-none border border-slate-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M2 10.555h28v9.335H16v1.556H9.778v-1.557H2zm1.556 7.779h3.111v-4.668h1.555v4.667h1.556v-6.222H3.556zm7.778-6.223v7.779h3.111v-1.556h3.111v-6.223zm3.111 1.556H16v3.112h-1.556zm4.667-1.556v6.223h3.111v-4.668h1.556v4.667h1.556v-4.667h1.556v4.667h1.556v-6.222z"
                    ></path>
                  </svg>
                </Popover>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};
