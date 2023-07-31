import type { Editor as MonacoEditor } from "@monaco-editor/react";
import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../../../../base/global/content-editor";

import trim from "lodash.trim";
import Delta from "quill-delta";
import strDelta from "textdiff-create";
import { component } from "../../../../page/component";
import { findScope } from "../../../../page/content-edit/render-tools/init-scope";
import { FMAdv, FNComponent } from "../../../../types/meta-fn";
import { getMap } from "../../../tools/yjs-tools";
import { monacoTypings } from "./typings";
import { jsMount } from "./mount";
import { Button } from "../../side/ui/Button";
import type { OnMount } from "@monaco-editor/react";
import { reloadCE } from "../../../tools/reload-ce";
export type MonacoEditor = Parameters<OnMount>[0];

const w = window as unknown as {
  importCache: {
    prettier: any;
    prettier_babel: any;
  };
};

export type FBuild = (
  entryFileName: string,
  src: string,
  files?: Record<string, string>
) => Promise<string>;

export const ScriptMonacoElement: FC<{
  id: string;
  Editor: typeof MonacoEditor;
  build: FBuild;
}> = ({ id, Editor, build }) => {
  const c = useGlobal(CEGlobal, id);
  const local = useLocal({
    editor: null as null | MonacoEditor,
  });

  const script = c.editor.script.active;
  if (!script) return null;

  const doEdit = async (newval: string, all?: boolean) => {
    if (local.editor) {
      if (!w.importCache) {
        w.importCache = { prettier_babel: "", prettier: "" };
      }
      if (!w.importCache.prettier_babel)
        w.importCache.prettier_babel = await import("prettier/parser-babel");

      if (!w.importCache.prettier)
        w.importCache.prettier = await import("prettier/standalone");

      const prettier = w.importCache.prettier;
      const prettier_babel = w.importCache.prettier_babel;
      const text = prettier.format(
        all
          ? newval
          : local.editor?.getValue().replace(/\{\s*children\s*\}/gi, newval),
        {
          parser: "babel",
          plugins: [prettier_babel],
        }
      );

      local.editor.executeEdits(null, [
        {
          range: {
            startLineNumber: 0,
            startColumn: 0,
            endColumn: Number.MAX_SAFE_INTEGER,
            endLineNumber: Number.MAX_SAFE_INTEGER,
          },
          text,
        },
      ]);
    }
  };
  return (
    <div className="flex flex-1 items-stretch flex-col">
      {script.type === "js" && (
        <div
          className={cx(
            "bg-slate-100 h-[35px] p-1 flex space-x-1 border-b text-xs items-center justify-between",
            css`
              .prasi-btn {
                width: auto;
                padding: 0px 5px;
                height: 20px;
              }
            `
          )}
        >
          <div className="flex items-center space-x-1">
            <div className="pl-2">Wrap:</div>
            <Button
              onClick={() => {
                doEdit(
                  `\
                <Local 
                  name="local" 
                  value={{data: []}}
                  effect={
                    async (local) => {
                      local.data = ["world!"]
                      local.render();
                    }
                  }
                >{children}</Local>`
                );
              }}
            >
              &lt;Local/&gt;
            </Button>
            <Button
              onClick={() => {
                doEdit(`<PassProp val={"yourval"}>{children}</PassProp>`);
              }}
            >
              &lt;PassProp/&gt;
            </Button>
            <Button
              onClick={() => {
                doEdit(
                  `\
{(local.data || []).map((item, idx) => (
  <PassProp item={item} key={idx}>{children}</PassProp>
))}      
`
                );
              }}
            >
              &lt;Map /&gt;
            </Button>

            <Button
              onClick={() => {
                doEdit(
                  `\
<div {...props}>
  {children}
</div>`,
                  true
                );
              }}
            >
              Reset
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                reloadCE(c);
              }}
            >
              Reload Page (
              {navigator.userAgent.indexOf("Mac OS X") != -1 ? "⌘" : "Ctrl"} +
              S)
            </Button>
          </div>
        </div>
      )}

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
          defaultValue={script.src?.toString() || ""}
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

            const propVal: any = { ...(window.exports || {}) };
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

            const scope = findScope(c.scope, c.editor.active?.get("id") || "");
            for (const [k, v] of Object.entries(scope)) {
              propVal[k] = v;
            }
            if (c.scope.types.root) {
              for (const [k, v] of Object.entries(c.scope.types.root)) {
                if (!propTypes[k]) propTypes[k] = v;
              }
            }

            await jsMount(editor, monaco);
            await monacoTypings(editor, monaco, {
              values: propVal,
              types: propTypes,
            });
          }}
          language={
            { css: "scss", js: "typescript", html: "html" }[script.type]
          }
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
      </div>
    </div>
  );
};
