import type { Editor as MonacoEditor, OnMount } from "@monaco-editor/react";
import trim from "lodash.trim";
import Delta from "quill-delta";
import { FC, useEffect } from "react";
import strDelta from "textdiff-create";
import { useGlobal, useLocal } from "web-utils";
import * as Y from "yjs";
import { TypedMap } from "yjs-types";
import { FMCompDef, FNAdv } from "../../../../../utils/types/meta-fn";
import { Button } from "../../../../../utils/ui/form/Button";
import { Loading } from "../../../../../utils/ui/loading";
import { EditorGlobal } from "../../../logic/global";
import { mergeScopeUpwards } from "../../../logic/tree-scope";
import { newMap } from "../../../tools/yjs-tools";
import { jsMount } from "./mount";
import { MonacoScopeBar } from "./scope-bar";
import { monacoTypings } from "./typings";

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
    prettier_parser: any;
  };
};

export type FBuild = (
  entryFileName: string,
  src: string,
  files?: Record<string, string>
) => Promise<string>;

const monacoViewState = {} as Record<string, any>;

export const ScriptMonacoElement: FC<{
  Editor: typeof MonacoEditor;
  build: FBuild;
}> = ({ Editor, build }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    editor: null as null | MonacoEditor,
    reloading: false,
    changeTimeout: 0 as any,
  });

  useEffect(() => {
    return () => {
      if (local.editor) {
        const meta = p.treeMeta[p.item.active];
        if (meta) {
          const item = meta.item;
          monacoViewState[item.originalId || item.id] =
            local.editor.saveViewState();
        }
      }
    };
  }, [local.editor]);

  const script = p.script;
  if (!script) return null;

  const doEdit = async (newval: string, all?: boolean) => {
    if (local.editor) {
      if (!w.importCache) {
        w.importCache = { prettier_parser: "", prettier: "" };
      }
      if (!w.importCache.prettier_parser)
        w.importCache.prettier_parser = await import(
          "prettier/parser-typescript"
        );

      if (!w.importCache.prettier)
        w.importCache.prettier = await import("prettier/standalone");

      const prettier = w.importCache.prettier;
      const prettier_parser = w.importCache.prettier_parser;
      const text = trim(
        prettier.format(
          all
            ? newval
            : local.editor?.getValue().replace(/\{\s*children\s*\}/gi, newval),
          {
            parser: "typescript",
            plugins: [prettier_parser],
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

  const meta = p.treeMeta[p.item.active];
  let mitem = meta.mitem;

  if (p.comp && p.comp.id === meta.comp?.id) {
    mitem = meta.comp.mcomp;
  }

  if (!mitem) {
    p.script.active = false;
    return <div>no mitem</div>;
  }
  let ytext: Y.Text = null as any;

  const adv = mitem.get("adv");
  let mprop = undefined as undefined | FMCompDef;
  if (p.script.prop === null) {
    if (!adv) {
      if (p.page && !local.reloading) {
        local.reloading = true;
        mitem.set(
          "adv",
          newMap({ css: "", js: "", html: "", jsBuilt: "" }) as TypedMap<FNAdv>
        );
      }

      return <Loading note="monaco-el" backdrop={false} />;
    }
    let _ytext = adv.get(script.type) as any;
    if (!(_ytext instanceof Y.Text)) {
      adv.set(script.type, new Y.Text(_ytext) as any);
    }
    ytext = _ytext;
  } else {
    let mprops = mitem.get("component")?.get("props");
    if (!mprops) {
      mitem.get("component")?.set("props", new Y.Map() as any);
      mprops = mitem.get("component")?.get("props");
    }
    if (mprops) {
      const propName = p.script.prop.name;
      mprop = mprops?.get(propName);
      if (mprop) {
        let _ytext = mprop.get("value");
        if (!(_ytext instanceof Y.Text)) {
          mprop.set("value", new Y.Text(mprop.get("value")));
          return <Loading note="monaco-el2" backdrop={false} />;
        }
        ytext = _ytext;
      } else {
        return <div>MProp not found</div>;
      }
    } else {
      return <div>Failed to create mprops</div>;
    }
  }

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
<>
  {
    /**if condition */
    true ? (
      /** then  */
      <div {...props}>{children}</div>
    ) : (
      /** else  */
      <div {...props}>ELSE CONDITION</div>
    )
  }
</>
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
<input {...props} />`,
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
              CSS
            </Button>
            <Button
              onClick={() => {
                doEdit(
                  `\
<div
  {...props}
  className={cx(props.className,"custom-class")}
>
  {children}
</div>
                  `,
                  true
                );
              }}
            >
              ClassName
            </Button>
          </div>
          {/* <div>
            <Button
              onClick={() => {
                // reloadCE(c);
              }}
            >
              Reload Page (
              {navigator.userAgent.indexOf("Mac OS X") != -1 ? "⌘" : "Ctrl"} +
              S)
            </Button>
          </div> */}
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
              // emmetJSX(monaco, ["typescript"]);
            } else if (script.type === "html") {
              // emmetHTML(monaco);
            }
          }}
          defaultValue={ytext.toJSON() || defaultSrc}
          onMount={async (editor, monaco) => {
            local.editor = editor;
            editor.focus();
            setTimeout(() => {
              editor.focus();
            }, 300);

            let restoreViewState = false;

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
            const meta = p.treeMeta[p.item.active];
            if (meta) {
              const item = meta.item;
              const state = monacoViewState[item.originalId || item.id];
              if (state) {
                delete monacoViewState[item.originalId || item.id];
                local.editor?.restoreViewState(state);
              }
            }

            let propVal: any = {};

            const scope = mergeScopeUpwards(p, meta);
            propVal = {
              ...(window.exports || {}),
              ...scope,
            };

            const propTypes: any = p.script.siteTypes;
            await jsMount(editor, monaco);
            await monacoTypings(p, monaco, {
              values: propVal,
              types: propTypes,
            });
          }}
          language={
            { css: "scss", js: "typescript", html: "html" }[script.type]
          }
          onChange={(newsrc) => {
            clearTimeout(local.changeTimeout);
            local.changeTimeout = setTimeout(async () => {
              const applyChanges = async (
                fn: (ytext: Y.Text) => Promise<void>
              ) => {
                if (ytext && ytext.doc) {
                  await ytext.doc.transact(async () => {
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

                    await fn(ytext);
                  });
                }
              };

              if (p.script.prop) {
                applyChanges(async (ytext) => {
                  if (mprop) {
                    const text = ytext.toJSON();
                    const compiled = await build(
                      "element.tsx",
                      `return ${text.trim()}`
                    );
                    mprop.set("valueBuilt", compiled.substring(6));
                    console.log(mprop.toJSON());
                  }
                });
              } else {
                applyChanges(async (ytext) => {
                  const meta = p.treeMeta[p.item.active];
                  if (meta.item.adv) meta.item.adv.js = ytext.toJSON();
                  if (script.type === "js" && adv) {
                    const compiled = await build(
                      "element.tsx",
                      `render(${trim((newsrc || "").trim(), ";")})`
                    );
                    adv.set("jsBuilt", compiled);
                    if (meta.item.adv) meta.item.adv.jsBuilt = compiled;
                  }
                  if (meta.memoize) {
                    delete meta.memoize;
                  }
                  p.render();
                });
              }
            }, 200);
          }}
        />
      </div>
      <MonacoScopeBar />
    </div>
  );
};
