import type { Editor as MonacoEditor, OnMount } from "@monaco-editor/react";
import { createStore, set } from "idb-keyval";
import trim from "lodash.trim";
import Delta from "quill-delta";
import { FC, useEffect } from "react";
import strDelta from "textdiff-create";
import { useGlobal, useLocal } from "web-utils";
import * as Y from "yjs";
import { TypedMap } from "yjs-types";
import { FMCompDef, FNAdv } from "../../../../../utils/types/meta-fn";
import { Loading } from "../../../../../utils/ui/loading";
import { EditorGlobal } from "../../../logic/global";
import { mergeScopeUpwards } from "../../../logic/tree-scope";
import { newMap } from "../../../tools/yjs-tools";
import { jsMount } from "./mount";
import { MonacoScopeBar } from "./scope-bar";
import { monacoTypings } from "./typings";
import { MonacoElSnippet } from "./monaco-el-snippet";
import { Button } from "../../../../../utils/ui/form/Button";
import { Popover } from "../../../../../utils/ui/popover";
import { MonacoElHistory } from "./monaco-el-history";

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
  files?: Record<string, string>,
  verbose?: boolean
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
    historyOpen: false,
    idbstore: createStore(`prasi-page-${p.page?.id}`, "script-history"),
  });

  useEffect(() => {
    local.idbstore = createStore(`prasi-page-${p.page?.id}`, "script-history");
    local.render();
  }, [p.page?.id]);

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
  p.script.doEdit = doEdit;

  let meta = p.treeMeta[p.item.active];

  if (!meta) {
    meta = p.treeMeta[p.item.activeOriginalId];
  }

  if (!meta) {
    p.script.active = false;
    p.render();
    setTimeout(() => {
      p.script.active = true;
      p.render();
    });

    return <div>ERROR: Meta Not Found;</div>;
  }
  let mitem = meta.mitem;

  if (!mitem) {
    p.script.active = false;
    return <div>no mitem</div>;
  } else if (p.comp && p.comp.id === meta.comp?.id) {
    mitem = meta.comp.mcomp;
  }

  if (!mitem) {
    p.script.active = false;
    return <div>no mitem</div>;
  }

  let ytext: Y.Text = null as any;
  let defaultSrc = DefaultScript[script.type] || "";

  const adv = mitem.get("adv");
  let mprop = undefined as undefined | FMCompDef;
  if (p.script.prop === null) {
    if (!adv) {
      if (p.page && !local.reloading) {
        local.reloading = true;
        mitem.set(
          "adv",
          newMap({
            css: "",
            js: "",
            html: "",
            jsBuilt: "",
          }) as TypedMap<FNAdv>
        );
      }

      return <Loading note="monaco-el" backdrop={false} />;
    }
    let _ytext = adv.get(script.type) as any;
    if (!(_ytext instanceof Y.Text)) {
      adv.set(script.type, new Y.Text(_ytext || defaultSrc) as any);
      setTimeout(() => {
        local.render();
      }, 500);
      _ytext = adv.get(script.type) as any;
    }
    ytext = _ytext;
  } else {
    if (p.script.prop.mode === "instance") {
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
    } else {
      const mcomp = p.comps.doc[p.comp?.id || ""]
        .getMap("map")
        .get("content_tree");

      if (mcomp) {
        const mprops = mcomp.get("component")?.get("props");
        if (mprops) {
          const propName = p.script.prop.name;
          mprop = mprops?.get(propName);
          if (mprop) {
            let _ytext = null as any;
            let propAttrName = "" as any;
            let propAttrDefault = "";
            if (p.script.prop.mode === "master-visible") {
              propAttrDefault = "true";
              propAttrName = "visible";
            } else if (p.script.prop.mode === "master-value") {
              propAttrName = "value";
              propAttrDefault = '"hello"';
            } else if (p.script.prop.mode === "master-option") {
              propAttrName = "option";
              propAttrDefault = `\
[
  {
    label: "yes",
    value: "y"
  },
  {
    label: "no",
    value: "n"
  },
]`;
            } else if (p.script.prop.mode === "master-gen") {
              propAttrName = "gen";
              propAttrDefault = `\
async () => {
  return \`""\`
}`;
            }
            if (propAttrName) {
              if (propAttrName === "option") {
                const mmeta = mprop.get("meta");
                _ytext = mmeta?.get("options");

                if (mmeta && !(_ytext instanceof Y.Text)) {
                  mmeta.set(
                    "options",
                    new Y.Text(
                      mprop.get("meta")?.get("options") || propAttrDefault
                    ) as any
                  );
                  return <Loading note="mcomp-option" backdrop={false} />;
                }
                ytext = _ytext;
              } else {
                _ytext = mprop.get(propAttrName);
                if (!(_ytext instanceof Y.Text)) {
                  mprop.set(
                    propAttrName,
                    new Y.Text(
                      mprop.get(propAttrName) || propAttrDefault
                    ) as any
                  );
                  return <Loading note="mcomp-el" backdrop={false} />;
                }
                ytext = _ytext;
              }
            }
          }
        }
      } else {
        return <div>Failed to get mcomp</div>;
      }
    }
  }

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
          <MonacoElSnippet doEdit={doEdit} />

          <div className="flex space-x-1 items-stretch">
            {p.script.toolbar}
            <Popover
              backdrop={false}
              open={local.historyOpen}
              onOpenChange={(open) => {
                if (!open) {
                  local.historyOpen = false;
                  local.render();
                }
              }}
              content={
                <MonacoElHistory
                  store={local.idbstore}
                  doEdit={doEdit}
                  close={() => {
                    local.historyOpen = false;
                    local.render();
                  }}
                />
              }
            >
              <Button
                onClick={() => {
                  local.historyOpen = true;
                  local.render();
                }}
                className="flex space-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M98 136a6 6 0 016-6h64a6 6 0 010 12h-64a6 6 0 01-6-6zm6-26h64a6 6 0 000-12h-64a6 6 0 000 12zm126 82a30 30 0 01-30 30H88a30 30 0 01-30-30V64a18 18 0 00-36 0c0 6.76 5.58 11.19 5.64 11.23a6 6 0 11-7.24 9.57C20 84.48 10 76.85 10 64a30 30 0 0130-30h136a30 30 0 0130 30v106h10a6 6 0 013.6 1.2c.4.32 10.4 7.95 10.4 20.8zm-124 0c0-6.76-5.59-11.19-5.64-11.23A6 6 0 01104 170h90V64a18 18 0 00-18-18H64a29.82 29.82 0 016 18v128a18 18 0 0036 0zm112 0a14.94 14.94 0 00-4.34-10h-97.78a24.83 24.83 0 012.12 10 29.87 29.87 0 01-6 18h88a18 18 0 0018-18z"
                  ></path>
                </svg>
                <div>History</div>
              </Button>
            </Popover>
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
        {!!ytext && typeof ytext === "object" ? (
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
            defaultValue={ytext.toJSON()}
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
              await jsMount(p, editor, monaco);
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
                        } else if (
                          operation === 0 &&
                          typeof value === "number"
                        ) {
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

                const ts = Math.round(Date.now() / 10000);
                const id = meta.item.originalId || meta.item.id;
                if (p.script.prop) {
                  if (p.script.prop.mode === "instance") {
                    set(
                      `${id}@${p.script.prop.name}-${ts}`,
                      newsrc || "",
                      local.idbstore
                    );
                    applyChanges(async (ytext) => {
                      if (mprop) {
                        const text = ytext.toJSON();
                        const compiled = await build(
                          "element.tsx",
                          `return ${text.trim()}`
                        );
                        mprop.set("valueBuilt", compiled.substring(6));
                      }
                    });
                  } else {
                    if (p.script.prop.mode === "master-visible") {
                      set(
                        `${id}#vis-${p.script.prop.name}-${ts}`,
                        newsrc || "",
                        local.idbstore
                      );
                      applyChanges(async (ytext) => {});
                    } else if (p.script.prop.mode === "master-option") {
                      set(
                        `${id}#opt-${p.script.prop.name}-${ts}`,
                        newsrc || "",
                        local.idbstore
                      );
                      applyChanges(async (ytext) => {});
                    } else if (p.script.prop.mode === "master-gen") {
                      set(
                        `${id}#gen-${p.script.prop.name}-${ts}`,
                        newsrc || "",
                        local.idbstore
                      );
                      applyChanges(async (ytext) => {
                        const text = ytext.toJSON();
                        const compiled = await build(
                          "element.tsx",
                          `return ${text.trim()}`
                        );
                        mprop?.set("genBuilt", compiled.substring(6));
                      });
                    } else if (p.script.prop.mode === "master-value") {
                      set(
                        `${id}#val-${p.script.prop.name}-${ts}`,
                        newsrc || "",
                        local.idbstore
                      );
                      applyChanges(async (ytext) => {
                        const text = ytext.toJSON();
                        const compiled = await build(
                          "element.tsx",
                          `return ${text.trim()}`
                        );
                        mprop?.set("valueBuilt", compiled.substring(6));
                      });
                    }
                  }
                } else {
                  set(
                    `${id}:${script.type}-${ts}`,
                    newsrc || "",
                    local.idbstore
                  );
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
        ) : (
          <Loading note="monaco-ytext" backdrop={false} />
        )}
      </div>
      <MonacoScopeBar />
    </div>
  );
};
