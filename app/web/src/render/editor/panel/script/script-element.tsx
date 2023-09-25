import type { Editor as MonacoEditor } from "@monaco-editor/react";
import type { BuildOptions } from "esbuild-wasm";
import { FC } from "react";
import { useGlobal } from "web-utils";
import * as Y from "yjs";
import { Loading } from "../../../../utils/ui/loading";
import { Modal } from "../../../../utils/ui/modal";
import { EditorGlobal } from "../../logic/global";
import { initJS } from "./monaco/init";
import {
  DefaultScript,
  FBuild,
  ScriptMonacoElement,
} from "./monaco/monaco-element";

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

export const EScriptElement: FC<{}> = ({}) => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  if (!jscript.editor) {
    Promise.all([
      import("@monaco-editor/react").then((e) => {
        jscript.editor = e.Editor;
        e.loader.config({ paths: { vs: "/min/vs" } });
      }),
      jscript.init(),
    ]).then(() => {
      p.render();
    });
  }

  if (!p.script.active) {
    return null;
  }

  return (
    <Modal
      onOpenChange={(open) => {
        if (p.script.active) {
          let mitem = p.treeMeta[p.item.active]?.mitem;
          if (!mitem) return;

          mitem.doc?.transact(() => {
            if (!mitem) return;

            const adv = mitem.get("adv");
            if (adv) {
              const src = adv.get(p.script.type) as any;
              let txt = "";
              if (src && src instanceof Y.Text) {
                txt = src.toJSON();
              } else {
                txt = src;
              }
              if (
                !txt ||
                (typeof txt === "string" &&
                  txt.replace(/[\W_]+/g, "") ===
                    DefaultScript[p.script.type].replace(/[\W_]+/g, ""))
              ) {
                if (p.script.type === "js") {
                  adv.delete("js");
                  adv.delete("jsBuilt");
                } else {
                  adv.delete(p.script.type);
                }
              }
            }
          });
        }

        p.script.active = false;

        if (typeof p.script.onClose === "function") {
          p.script.onClose();
          p.script.onClose = undefined;
        }

        p.render();
      }}
    >
      <div className="bg-white w-[80vw] h-[80vh] flex">
        <div
          className={cx(
            "flex flex-1 relative",
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
                  color: #020360;
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
          {(!jscript.editor || !jscript.build) && (
            <>
              {!jscript.editor && !jscript.build && (
                <Loading note={"js-code"} backdrop={false} />
              )}
              {!jscript.editor && jscript.build && (
                <Loading note={"js-editor"} backdrop={false} />
              )}
              {!jscript.build && jscript.editor && (
                <Loading note={"js-build"} backdrop={false} />
              )}
            </>
          )}
          {jscript.editor && jscript.build && (
            <ScriptMonacoElement
              Editor={jscript.editor}
              build={jscript.build}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
