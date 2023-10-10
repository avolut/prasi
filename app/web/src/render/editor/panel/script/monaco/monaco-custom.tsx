import type {
  Monaco,
  Editor as MonacoEditor,
  OnMount,
} from "@monaco-editor/react";
import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../logic/global";
import { jsMount } from "./mount";
import { monacoTypings } from "./typings";
export type MonacoEditor = Parameters<OnMount>[0];

export type FBuild = (
  entryFileName: string,
  src: string,
  files?: Record<string, string>
) => Promise<string>;

export const customMonacoState: Record<string, any> = {};

export const ScriptMonacoCustom: FC<{
  monaco_id: string;
  Editor: typeof MonacoEditor;
  build: FBuild;
  src: string;
  onLoad?: (editor: MonacoEditor, monaco: Monaco) => void;
  wrap?: (src: string) => string;
  onChange: (val: string, built: string) => void;
  item_id?: string;
  props?: any;
  propTypes?: any;
}> = ({
  monaco_id,
  Editor,
  build,
  item_id,
  src,
  onLoad,
  onChange,
  wrap,
  props,
  propTypes,
}) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
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
            autoIndent: "full",
            formatOnPaste: true,
            formatOnType: true,
            useTabStops: true,
          }}
          value={src}
          onMount={async (editor, monaco) => {
            local.editor = editor;
            editor.focus();
            setTimeout(() => {
              editor.focus();
            }, 300);

            if (onLoad) onLoad(editor, monaco);

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

            if (!customMonacoState[monaco_id]) {
              editor.trigger("fold", "editor.foldAllMarkerRegions", null);
            } else {
              editor.restoreViewState(customMonacoState[monaco_id]);
            }

            await jsMount(p, editor, monaco);
            const propVal: any = props || {};

            await monacoTypings(p, monaco, {
              values: propVal,
              types: propTypes,
            });
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
