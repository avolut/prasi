import type { Editor as MonacoEditor } from "@monaco-editor/react";
import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../../../../base/global/content-editor";

import type { OnMount } from "@monaco-editor/react";
import { findScope } from "../../../../page/content-edit/render-tools/init-scope";
import { jsMount } from "./mount";
import { monacoTypings } from "./typings";
export type MonacoEditor = Parameters<OnMount>[0];

export type FBuild = (
  entryFileName: string,
  src: string,
  files?: Record<string, string>
) => Promise<string>;

export const ScriptMonacoCustom: FC<{
  id: string;
  Editor: typeof MonacoEditor;
  build: FBuild;
  src: string;
  wrap?: (src: string) => string;
  onChange: (val: string, built: string) => void;
  item_id?: string;
  props?: any;
  propTypes?: any;
}> = ({
  id,
  Editor,
  build,
  item_id,
  src,
  onChange,
  wrap,
  props,
  propTypes,
}) => {
  const c = useGlobal(CEGlobal, id);
  const local = useLocal({
    editor: null as null | MonacoEditor,
  });

  return (
    <div className="flex flex-1 items-stretch flex-col">
      <div
        className="flex flex-1 items-stretch flex-col"
        onMouseLeave={() => {
          if (local.editor) {
            const editor = local.editor;
            editor.getAction("editor.action.format")?.run();
          }
        }}
      >
        <Editor
          options={{
            minimap: { enabled: false },
            wordWrap: "wordWrapColumn",
            autoClosingBrackets: "always",
            tabSize: 2,
            useTabStops: true,
          }}
          defaultValue={src}
          onMount={async (editor, monaco) => {
            local.editor = editor;
            editor.focus();
            setTimeout(() => {
              editor.focus();
            }, 300);
            if (c.editor.script.active?.default && !editor.getValue().trim()) {
              editor.executeEdits(null, [
                {
                  range: {
                    startLineNumber: 0,
                    startColumn: 0,
                    endColumn: Number.MAX_SAFE_INTEGER,
                    endLineNumber: Number.MAX_SAFE_INTEGER,
                  },
                  text: c.editor.script.active?.default,
                },
              ]);
            }

            const value = editor.getValue();
            monaco.editor.getModels().forEach((model) => {
              if (model.uri.toString().startsWith("inmemory://model")) {
                model.dispose();
              }
            });

            let model = monaco.editor.createModel(
              value,
              "typescript",
              monaco.Uri.parse("ts:_active.tsx")
            );
            editor.setModel(model);
            await jsMount(editor, monaco);

            const propVal: any = {};
            if (item_id) {
              const scope = findScope(c.scope, item_id);
              for (const [k, v] of Object.entries(scope)) {
                propVal[k] = v;
              }
            }
            if (props) {
              for (const [k, v] of Object.entries(props)) {
                propVal[k] = v;
              }
            }

            await monacoTypings(editor, monaco, {
              values: propVal,
              types: propTypes,
            });

            const act = editor.getAction("editor.toggleFold");
            if (act) {
              act.run();
            }
          }}
          language={"typescript"}
          onChange={async (newsrc) => {
            const src = newsrc || "";
            const compiled = await build("element.tsx", wrap ? wrap(src) : src);
            onChange(src, compiled);
          }}
        />
      </div>
    </div>
  );
};
