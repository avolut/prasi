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
import { emmetHTML, emmetJSX } from "emmet-monaco-es";

export type MonacoEditor = Parameters<OnMount>[0];
export const DefaultScript = {
  js: `<div {...props}>{children}</div>`,
  css: `\
& {
  display: flex;

  // &.mobile {}
  // &.desktop {}
  // &:hover {}
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
  if (!adv) {
    mitem.set("adv", new Y.Map() as any);
    return <Loading />;
  }
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
          <div className="flex items-center space-x-1 pl-1">
            <Button
              onClick={() => {
                doEdit(
                  `\
<div {...props}>
  <Local
    name="local"
    value={
      {
        //local object
      }
    }
    effect={async (local) => {
      //local effect
    }}
  >
    {children}
  </Local>
</div>
                  `,
                  true
                );
              }}
            >
              &lt;Local/&gt;
            </Button>
            <Button
              onClick={() => {
                doEdit(
                  `\
<div {...props}>
  <PassProp val={"yourval"}>{children}</PassProp>
</div>`,
                  true
                );
              }}
            >
              &lt;PassProp/&gt;
            </Button>
            <Button
              onClick={() => {
                doEdit(
                  `\
<div {...props}>
  {(local.list || []).map((item, idx) => (
    <PassProp item={item} key={idx}>
      {children}
    </PassProp>
  ))}
</div>   
`,
                  true
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

            {/* <Button
              onClick={() => {
                doEdit(
                  `<Preload {...props} url={[""]}>{children}</Preload>`,
                  true
                );
              }}
            >
              &lt;Preload/&gt;
            </Button> */}

            <Button
              onClick={() => {
                doEdit(
                  `<>{isMobile && <div {...props}>{children}</div>}</>`,
                  true
                );
              }}
            >
              &lt;isMobile/&gt;
            </Button>

            <Button
              onClick={() => {
                doEdit(
                  `<>{isDesktop && <div {...props}>{children}</div>}</>`,
                  true
                );
              }}
            >
              &lt;isDesktop/&gt;
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

            <Button
              onClick={() => {
                doEdit(
                  `\
<div
  {...props}
  className={cx(
    props.className,
    css\`
/** Custom CSS **/



\`
  )}
>
  {children}
</div>
                  `,
                  true
                );
              }}
            >
              Custom CSS
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
          beforeMount={(monaco) => {
            if (script.type === "js") {
              emmetJSX(monaco, ["typescript"]);
            } else if (script.type === "html") {
              emmetHTML(monaco);
            }
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
            if (!p.itemProps[p.item.active]) {
              let item = p.treeMeta[p.item.active].item;
              while (item.parent) {
                const id = item.get("id");
                if (id && p.itemProps[id]) {
                  p.itemProps[p.item.active] = p.itemProps[id];
                  break;
                }
                item = item.parent as any;
              }
            }

            const propVal: any = {
              ...(window.exports || {}),
              ...p.itemProps[p.item.active],
            };

            const propTypes: any = p.script.siteTypes;

            await jsMount(editor, monaco);
            await monacoTypings(p, editor, monaco, {
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
