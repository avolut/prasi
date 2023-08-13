import type { Editor as MonacoEditor, OnMount } from "@monaco-editor/react";
import trim from "lodash.trim";
import Delta from "quill-delta";
import { FC } from "react";
import strDelta from "textdiff-create";
import { useGlobal, useLocal } from "web-utils";
import * as Y from "yjs";
import { Button } from "../../../../../utils/ui/form/Button";
import { Loading } from "../../../../../utils/ui/loading";
import { EditorGlobal } from "../../../logic/global";
import { jsMount } from "./mount";
import { monacoTypings } from "./typings";

export type MonacoEditor = Parameters<OnMount>[0];
export const DefaultScript = {
  js: `<div {...props}>{children}</div>`,
  css: `\
& {
  display: flex;
  
  &:hover {
    display: flex;
  }
}`,
  html: ``,
};

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
  Editor: typeof MonacoEditor;
  build: FBuild;
}> = ({ Editor, build }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    editor: null as null | MonacoEditor,
  });

  const script = p.script;
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
      const text = trim(
        prettier.format(
          all
            ? newval
            : local.editor?.getValue().replace(/\{\s*children\s*\}/gi, newval),
          {
            parser: "babel",
            plugins: [prettier_babel],
          }
        ),
        "; \n"
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

  const mitem = p.treeMeta[p.item.active]?.item;
  if (!mitem) return <div>no mitem</div>;

  const adv = mitem.get("adv");
  if (!adv) return <div>no adv</div>;
  let _ytext = adv.get(script.type) as any;
  if (!(_ytext instanceof Y.Text)) {
    setTimeout(() => {
      adv.set(script.type, new Y.Text(_ytext) as any);
      local.render();
    });

    return <Loading backdrop={false} />;
  }
  let ytext: Y.Text = _ytext as any;

  let defaultSrc = DefaultScript[script.type] || "";

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
  value={{
    list: ["hello"],
    form: {
      hello: "yo"
    },
  }}
  effect={
    async (local) => {
      local.list.push("world!");
      local.form.hello = "world!";
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
{(local.list || []).map((item, idx) => (
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
<>{true && <div {...props}>{children}</div>}</>   
`,
                  true
                );
              }}
            >
              &lt;If /&gt;
            </Button>

            <Button
              onClick={() => {
                doEdit(
                  `\
<>{true ? <div {...props}>{children}</div> : <div {...props}>ELSE CONDITION</div>}</>      
`,
                  true
                );
              }}
            >
              &lt;If Else /&gt;
            </Button>

            <Button
              onClick={() => {
                doEdit(
                  `\
<div {...props}><input /></div>`,
                  true
                );
              }}
            >
              &lt;Input /&gt;
            </Button>

            <Button
              onClick={() => {
                doEdit(
                  `<Preload {...props} url={[""]}>{children}</Preload>`,
                  true
                );
              }}
            >
              &lt;Preload/&gt;
            </Button>

            <Button
              onClick={() => {
                doEdit(
                  `\
<div {...props}>{children}</div>`,
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
                // reloadCE(c);
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
            autoIndent: "full",
            formatOnPaste: true,
            formatOnType: true,
            tabSize: 2,
            useTabStops: true,
          }}
          defaultValue={ytext.toJSON() || defaultSrc}
          onMount={async (editor, monaco) => {
            local.editor = editor;
            editor.focus();
            setTimeout(() => {
              editor.focus();
            }, 300);

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
            if (ytext && ytext.doc) {
              ytext.doc.transact(async () => {
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

                if (script.type === "js") {
                  const compiled = await build(
                    "element.tsx",
                    `render(${trim((newsrc || "").trim(), ";")})`
                  );
                  adv.set("jsBuilt", compiled);
                }
              });
            }
          }}
        />
      </div>
    </div>
  );
};
