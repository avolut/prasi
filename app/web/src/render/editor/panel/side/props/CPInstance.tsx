import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { TypedMap } from "yjs-types";
import { CompDoc } from "../../../../../base/global/content-editor";
import { MItem } from "../../../../../utils/types/item";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";
import { Menu, MenuItem } from "../../../../../utils/ui/context-menu";
import { Loading } from "../../../../../utils/ui/loading";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { editComp, loadComponent } from "../../../logic/comp";
import { EditorGlobal, PG } from "../../../logic/global";
import { rebuildTree } from "../../../logic/tree-logic";
import { newMap } from "../../../tools/yjs-tools";
import { jscript } from "../../script/script-element";
import { CPJsx } from "./CPJsx";
import { CPOption } from "./CPOption";
import { CPText } from "./CPText";
import { mergeScopeUpwards } from "../../../logic/tree-scope";

export const CPInstance: FC<{ mitem: MItem }> = ({ mitem }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    status: "loading",
    mprops: null as unknown as TypedMap<Record<string, FMCompDef>>,
    props: {} as Record<string, FNCompDef>,
    jsx: false,
  });
  const comp = p.comps.doc[mitem.get("component")?.get("id") || ""];

  useEffect(() => {
    (async () => {
      local.status = "loading";
      local.render();
      if (comp) {
        const cprops = comp
          .getMap("map")
          .get("content_tree")
          ?.get("component")
          ?.get("props")
          ?.toJSON() as Record<string, FNCompDef>;
        const mprops = mitem.get("component")?.get("props");
        if (!mprops) {
          local.status = "ERROR: Item not found.";
          local.render();
          return;
        } else if (cprops) {
          local.mprops = mprops;
          const props: any = {};
          for (const [k, v] of Object.entries(cprops)) {
            props[k] = v;
            const prop = mprops.get(k);
            if (prop) {
              props[k].value = prop.get("value");
              props[k].valueBuilt = prop.get("valueBuilt");
            } else {
              mprops.set(k, newMap(v) as any);
            }
          }
          local.props = props;

          local.render();
        }
      }

      if (!jscript.build) {
        jscript.init().then(() => {
          local.status = "ready";
          local.render();
        });
      } else {
        local.status = "ready";
        local.render();
      }
    })();
  }, [mitem]);

  if (!comp) {
    loadComponent(p, mitem.get("component")?.get("id") || "").then(
      local.render
    );

    return <Loading note="cp-comp" backdrop={false} />;
  }

  if (local.status === "loading")
    return <Loading note="cp-instance" backdrop={false} />;

  if (local.status !== "ready") {
    <div className="flex flex-col flex-1">{local.status}</div>;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b bg-white flex justify-between items-center">
        <div className="text-[10px] select-none text-slate-400 pl-1 py-1">
          PROPS
        </div>
        <div
          className="flex mr-1 px-2 bg-white text-xs border rounded-sm cursor-pointer hover:bg-blue-50 hover:border-blue-500 text-blue-700 space-x-1"
          onClick={() => {
            const meta = p.treeMeta[p.item.active];
            if (meta) {
              p.compProp.edit = true;
              p.compProp.backToInstance = true;
              editComp(p, meta.item.id);
            }
          }}
        >
          <div>Edit Prop:</div>
          <div className="text-ellipsis font-bold">{mitem.get("name")}</div>
        </div>
      </div>
      <div className="flex-1 relative overflow-y-auto">
        <div className="absolute flex-col inset-0">
          {Object.entries(local.props)
            .sort((a, b) => {
              return a[1].idx - b[1].idx;
            })
            .map(([k, v]) => {
              let mprop = local.mprops.get(k);
              if (mprop) {
                if (!local.jsx && v.meta?.type === "content-element") return;

                let visible = true;
                const meta = p.treeMeta[p.item.active];
                if (v.visible && meta) {
                  try {
                    const scopes = mergeScopeUpwards(p, meta);
                    const args = {
                      ...window.exports,
                      ...scopes,
                    };

                    const fn = new Function(
                      ...Object.keys(args),
                      `return ${v.visible}`
                    );

                    visible = fn(...Object.values(args));
                  } catch (e) {
                    console.log(e);
                  }
                }

                if (visible) {
                  return (
                    <SingleProp
                      key={k}
                      name={k}
                      prop={v}
                      mprop={mprop}
                      mprops={local.mprops}
                      comp={comp}
                      render={p.render}
                      p={p}
                    />
                  );
                }
              }
            })}

          <div className="p-2 flex items-center justify-center space-x-2">
            <div
              className="bg-white border rounded px-3 text-xs cursor-pointer hover:bg-blue-100 active:bg-blue-500 active:text-white"
              onClick={() => {
                local.jsx = !local.jsx;
                local.render();
              }}
            >
              {local.jsx ? "Hide" : "Show"} JSX
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SingleProp: FC<{
  name: string;
  prop: FNCompDef;
  mprop: FMCompDef;
  mprops: TypedMap<Record<string, FMCompDef>>;
  render: () => void;
  comp: CompDoc;
  p: PG;
}> = ({ name, prop: _prop, mprop, mprops, render, comp, p }) => {
  const local = useLocal({
    clickEvent: null as any,
    loading: false,
    editCode: false,
  });
  const type = _prop.meta?.type || "text";
  const updateValue = async (val: string) => {
    if (jscript.build) {
      const res = await jscript.build("el.tsx", `return ${val}`);
      let js = val;
      let jsBuilt = res.substring(6);

      mprop.doc?.transact(() => {
        mprop.set("value", val);
        mprop.set("valueBuilt", res.substring(6));
      });

      const meta = p.treeMeta[p.item.active];
      if (meta.item.type === "item" && meta.item.component) {
        meta.item.component.props[name].value = js;
        meta.item.component.props[name].valueBuilt = jsBuilt;
      }
      rebuildTree(p, { mode: "update", note: "update-props" });
    }
  };
  const reset = () => {
    const propVal = comp
      .getMap("map")
      .get("content_tree")
      ?.get("component")
      ?.get("props")
      ?.get(name)
      ?.toJSON() as FNCompDef;

    if (propVal) {
      mprop.doc?.transact(() => {
        mprop.set("value", propVal.value);
        mprop.set("valueBuilt", propVal.valueBuilt);
      });
      _prop.value = propVal.value;
      _prop.valueBuilt = propVal.valueBuilt;

      local.loading = true;
      render();

      setTimeout(() => {
        local.loading = false;
        render();
      }, 100);
    }
  };

  let prop = comp
    .getMap("map")
    .get("content_tree")
    ?.get("component")
    ?.get("props")
    ?.get(name)
    ?.toJSON() as FNCompDef;

  let notExists = false;
  if (prop) {
    prop.value = mprop.get("value");
    prop.valueBuilt = mprop.get("valueBuilt");
  } else {
    prop = _prop;
    notExists = true;
  }

  const editCode = (onClose?: () => void) => {
    local.editCode = true;
    p.script.active = true;
    p.script.prop = { name, mode: "instance" };
    const DEFAULT = `\
async () => {
  return \`""\`
}`;
    if (
      prop.gen &&
      prop.genBuilt &&
      prop.gen.replace(/\W/g, "") !== DEFAULT.replace(/\W/g, "")
    ) {
      p.script.toolbar = (
        <div
          className="bg-blue-500 hover:bg-blue-300 cursor-pointer text-white rounded-sm flex items-center px-2"
          onClick={async () => {
            const meta = p.treeMeta[p.item.active];
            if (prop.genBuilt && meta && p.script.doEdit) {
              try {
                const scopes = mergeScopeUpwards(p, meta);
                const args = {
                  ...window.exports,
                  ...scopes,
                };

                const fn = new Function(
                  ...Object.keys(args),
                  `return ${prop.genBuilt}`
                );

                const efn = fn(Object.values(args));
                let result = "";
                if (typeof efn === "function") {
                  const promise = efn();
                  if (promise && promise instanceof Promise) {
                    result = await promise;
                  } else {
                    result = promise;
                  }
                }
                if (typeof result === "string") {
                  p.script.doEdit(result, true);
                }
              } catch (e) {
                console.log(e);
              }
            }
          }}
        >
          Generate
        </div>
      );
    }
    p.script.onClose = () => {
      p.script.prop = null;
      if (typeof onClose === "function") {
        onClose();
      }

      local.editCode = false;
      local.render();
    };
    p.render();
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        local.clickEvent = e;
        local.render();
      }}
      className={cx(
        "border-b bg-white hover:bg-orange-50 flex flex-col items-stretch"
      )}
    >
      {local.clickEvent && (
        <Menu
          mouseEvent={local.clickEvent}
          onClose={() => {
            local.clickEvent = null;
            local.render();
          }}
        >
          <MenuItem label="Reset" onClick={reset} />
          <MenuItem
            label={"Edit Code"}
            onClick={() => {
              editCode();
            }}
          />
        </Menu>
      )}
      <div className="flex justify-between items-stretch relative">
        {(() => {
          const label = (
            <div
              className={cx(
                "border-l-2 border-transparent cursor-pointer pr-3 flex items-center w-[60px] overflow-hidden relative min-h-[25px]",
                local.clickEvent ? "bg-orange-500 text-white" : " ",
                css`
                  .absolute {
                    max-width: 55px;
                    overflow: hidden;
                  }
                  &:hover {
                    overflow: visible;

                    .absolute {
                      max-width: 150px;
                      background: white;
                      border: 1px solid #f1c2a7;
                      margin: -1px;
                    }

                    &.text-white .absolute {
                      background: #f97315;
                      border: 0px;
                      margin: 0px;
                    }
                  }
                `
              )}
              onClick={(e) => {
                if (local.clickEvent) {
                  local.clickEvent = null;
                } else {
                  local.clickEvent = e;
                }
                local.render();
              }}
            >
              <div className="absolute px-1">{name}</div>
            </div>
          );

          return (
            <>
              {local.editCode ? (
                <div className="bg-orange-500 text-white px-2 flex items-center absolute inset-0">
                  {name}
                </div>
              ) : (
                label
              )}
            </>
          );
        })()}

        {local.loading ? (
          <div className="flex items-stretch flex-1">
            <div className="min-h-[30px]"></div>
          </div>
        ) : (
          <div className="flex items-stretch flex-1">
            {type === "content-element" && (
              <CPJsx
                prop={prop}
                name={name}
                onChange={updateValue}
                editCode={editCode}
                reset={reset}
              />
            )}
            {type === "text" && (
              <CPText
                prop={prop}
                name={name}
                onChange={updateValue}
                editCode={editCode}
                reset={reset}
              />
            )}
            {type === "option" && (
              <CPOption
                name={name}
                prop={prop}
                onChange={updateValue}
                editCode={editCode}
                reset={reset}
              />
            )}
            {notExists && (
              <Tooltip
                content="Not exist in Master Prop"
                className="cursor-pointer flex items-center px-1 border-l text-red-400"
                onClick={() => {
                  mprops.delete(name);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 15 15"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Tooltip>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
