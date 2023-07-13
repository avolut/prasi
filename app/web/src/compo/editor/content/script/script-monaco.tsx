import type { Editor as MonacoEditor } from "@monaco-editor/react";
import { FC } from "react";
import { useGlobal } from "web-utils";
import { CEGlobal } from "../../../../base/global/content-editor";

import trim from "lodash.trim";
import Delta from "quill-delta";
import strDelta from "textdiff-create";
import { component } from "../../../page/component";
import { findScope } from "../../../page/content-edit/render-tools/init-scope";
import { FMAdv, FNComponent } from "../../../types/meta-fn";
import { getMap } from "../../tools/yjs-tools";
import { monacoTypings } from "./monaco/typings";
import { jsMount } from "./monaco/mount";
export type FBuild = (
  entryFileName: string,
  src: string,
  files?: Record<string, string>
) => Promise<string>;

export const ScriptMonaco: FC<{
  id: string;
  Editor: typeof MonacoEditor;
  build: FBuild;
}> = ({ id, Editor, build }) => {
  const c = useGlobal(CEGlobal, id);

  const script = c.editor.script.active;
  if (!script) return null;
  return (
    <Editor
      options={{
        minimap: { enabled: false },
        wordWrap: "wordWrapColumn",
        autoClosingBrackets: "always",
        tabSize: 2,
        useTabStops: true,
      }}
      defaultValue={script.src?.toString() || ""}
      onMount={async (editor, monaco) => {
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
        if (script.type === "js") {
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
        }

        const propVal: any = {};
        const propTypes: any = {};

        if (component.edit.id) {
          const doc = component.docs[component.edit.id];
          if (doc) {
            const comp = doc
              .getMap("map")
              .get("content_tree")
              ?.get("component")
              ?.toJSON() as FNComponent;

            if (comp && comp.props && typeof comp.props === "object") {
              for (const [k, v] of Object.entries(comp.props)) {
                if (v.type) {
                  propTypes[k] = v.type;
                } else if (v.value) {
                  propVal[k] = v.value;
                }
              }
            }
          }
        }

        const scope = findScope(
          c.scope[c.editor.activeScopeName || "root"],
          c.editor.active?.get("id") || ""
        );
        for (const [k, v] of Object.entries(scope)) {
          propVal[k] = v;
        }

        await jsMount(editor, monaco);
        await monacoTypings(editor, monaco);
      }}
      language={{ css: "scss", js: "typescript", html: "html" }[script.type]}
      onChange={(newsrc) => {
        const ytext = script.src;
        if (ytext && c.editor.active) {
          c.doc.transact(async () => {
            const delta = new Delta();

            const sd = strDelta(ytext.toString(), newsrc || "");
            for (const change of sd) {
              const operation = change[0];
              const value = change[1];
              if (operation == -1 && typeof value === "number") {
                delta.delete(value);
              } else if (operation === 0 && typeof value === "number") {
                delta.retain(value);
              } else if (typeof value === "string") {
                delta.insert(value);
              }
            }
            ytext.applyDelta(delta.ops);

            if (script.type === "js" && c.editor.active) {
              const map = getMap<FMAdv>(c.editor.active, "adv");
              const compiled = await build(
                "element.tsx",
                `render(${trim((newsrc || "").trim(), ";")})`
              );
              map.set("jsBuilt", compiled);
            }
            c.render();
          });
        }
      }}
    />
  );
};
