import type { Editor as MonacoEditor } from "@monaco-editor/react";
import { FC } from "react";
import { useGlobal } from "web-utils";
import { CEGlobal } from "../../../../base/global/content-editor";
import { Loading } from "../../../ui/loading";
import { Modal } from "../../../ui/modal";
import { FBuild, ScriptMonaco } from "./script-monaco";
import { ScriptTab } from "./script-tab";
import type { BuildOptions } from "esbuild-wasm";
import { initJS } from "./monaco/init";

export const jscript = {
  editor: null as typeof MonacoEditor | null,
  build: null as null | FBuild,
  _init: false,
  async init() {
    if (!this._init) {
      this._init = true;
      const { sendIPC } = await import("./esbuild/ipc");
      await initJS();
      this.build = async (entry, src, files) => {
        const options: BuildOptions = {
          entryPoints: [entry],
          jsx: "transform",
          bundle: true,
          format: "cjs",
          minify: true,
        };
        const res = await sendIPC({
          command_: "build",
          input_: { ...files, [entry]: src },
          options_: options,
        });
        if (res.outputFiles_) return res.outputFiles_[0].text;
        return "";
      };

      await this.build("el.tsx", `return ""`);
    }
  },
};

export const CEScriptEdit: FC<{ id: string }> = ({ id }) => {
  const c = useGlobal(CEGlobal, id);

  if (!jscript.editor) {
    Promise.all([
      import("@monaco-editor/react").then((e) => {
        jscript.editor = e.Editor;
        e.loader.config({ paths: { vs: "/min/vs" } });
      }),
      jscript.init(),
    ]).then(() => {
      c.render();
    });
  }

  if (!c.editor.script.active) {
    return null;
  }

  return (
    <Modal
      onOpenChange={() => {
        c.editor.script.active = null;
        c.render();
      }}
    >
      <div className="bg-white w-[80vw] h-[80vh] flex">
        {c.editor.script.tab.list.length > 1 && <ScriptTab id={id} />}
        <div
          className={cx(
            "flex flex-1",
            css`
              .monaco-editor {
                .mtk9 {
                  color: #022f62;
                }
                .mtk1 {
                  color: #022f62;
                }
                .mtk22 {
                  color: #015cc5;
                }
                .mtk8 {
                  color: #015cc5;
                }
                .mtk5 {
                  color: #55bb8a;
                }
                .monaco-editor.showUnused .squiggly-inline-unnecessary {
                  opacity: 0.4;
                }
                .jsx-expression-braces {
                  color: #7c3813;
                }
                .jsx-tag-angle-bracket {
                  color: #619ac3;
                }
                .jsx-tag-name {
                  color: #619ac3;
                }
                .jsx-tag-order-1 {
                  color: #23863a;
                }
                .jsx-tag-order-2 {
                  color: #4e7ca1;
                }
                .jsx-tag-order-3 {
                  color: #fb8b05;
                }
                .jsx-tag-attribute-key {
                  color: #6f42c1;
                }
                .jsx-text {
                  color: #000000;
                }
              }
            `
          )}
        >
          {!jscript.editor || !jscript.build ? (
            <Loading backdrop={false} />
          ) : (
            <ScriptMonaco
              id={id}
              Editor={jscript.editor}
              build={jscript.build}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
