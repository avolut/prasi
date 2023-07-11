import { FC, useCallback, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { TypedMap } from "yjs-types";
import { CEGlobal, CompDoc } from "../../../../base/global/content-editor";
import { component } from "../../../page/component";
import { IItem } from "../../../types/item";
import { FMCompDef, FNCompDef } from "../../../types/meta-fn";
import { Dropdown } from "../../../ui/dropdown";
import { Loading } from "../../../ui/loading";
import { Tooltip } from "../../../ui/tooltip";
import { wsdoc } from "../../ws/wsdoc";
import { jscript } from "../script/script-edit";
import { AutoHeightTextarea } from "./panel/link";
import { SideLabel } from "./ui/SideLabel";

export const CompProps: FC<{
  id: string;
  props?: TypedMap<Record<string, FMCompDef>>;
  mode: "root" | "instance";
  back?: () => void;
}> = ({ id, props, back, mode }) => {
  const c = useGlobal(CEGlobal, id);
  const local = useLocal({ loading: false });
  if (!props) return null;

  if (!jscript.build) {
    local.loading = true;
    jscript.init().then(() => {
      local.loading = false;
      local.render();
    });
  }

  useEffect(() => {
    local.loading = true;
    local.render();
    setTimeout(() => {
      local.loading = false;
      local.render();
    }, 10);
  }, [c.editor.active]);

  let compRef = null as CompDoc | null;
  const active = c.editor.active?.toJSON() as IItem;
  const propJSON = props.toJSON();

  if (mode === "instance") {
    compRef = component.docs[active?.component?.id || ""];
  }

  if (compRef) {
    const props = compRef
      .getMap("map")
      .get("content_tree")
      ?.get("component")
      ?.get("props");
    if (props) {
      props.forEach((e, k) => {
        let ref: any = null;
        if (e && e.toJSON) {
          ref = e.toJSON();
        } else {
          ref = e;
        }
        if (ref) {
          if (!propJSON[k]) {
            propJSON[k] = ref;
          } else {
            propJSON[k].meta = ref.meta;
          }
        }
      });
    }
  }

  if (local.loading) return <Loading backdrop={false} />;

  return (
    <div className="flex flex-1 flex-col items-stretch">
      <SideLabel sep="bottom">
        <div className="flex items-center justify-between">
          {back ? (
            <div
              className="flex items-center -ml-1 pr-1 text-xs border rounded-sm cursor-pointer text-slate-700 hover:bg-slate-50 hover:border-slate-500 "
              onClick={back}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                  fill="currentColor"
                ></path>
              </svg>
              Back
            </div>
          ) : (
            <div>PROPS:</div>
          )}
          {mode === "root" && (
            <div
              className="flex mr-1 px-2 text-xs border rounded-sm cursor-pointer text-blue-700 hover:bg-blue-50 hover:border-blue-500 "
              onClick={() => {
                let i = 0;
                let prop: any = null;
                while (true) {
                  prop = props.get(`new_prop${i === 0 ? "" : `_${i}`}`);
                  if (prop) {
                    i++;
                  } else {
                    prop = new Y.Map();
                    syncronize(prop, { type: "string", value: '"hello"' });
                    props.set(`new_prop${i === 0 ? "" : `_${i}`}`, prop);
                    break;
                  }
                }
                c.render();
              }}
            >
              + New Prop
            </div>
          )}
          {mode === "instance" && (
            <div
              className="flex mr-1 px-2 text-xs border rounded-sm cursor-pointer text-blue-700 hover:bg-blue-50 hover:border-blue-500 "
              onClick={() => {
                let _c = c;
                component.edit.activatePropEditing = true;
                const compid = active?.component?.id || "";
                if (id.startsWith("COMP") && wsdoc.page) {
                  _c = wsdoc.page;
                  component.edit.switching = true;
                  setTimeout(() => {
                    component.edit.switching = false;
                    _c.editor.active = null;
                    component.edit.id = compid;
                    _c.render();
                  }, 10);
                } else {
                  component.edit.switching = false;
                }
                component.edit.show = true;
                if (!component.edit.tabs) component.edit.tabs = new Set();
                component.edit.tabs?.add(compid);
                _c.editor.lastActive.item = _c.editor.active;
                _c.editor.active = null;
                component.edit.id = compid;
                _c.render();
              }}
            >
              Edit Master Prop
            </div>
          )}
        </div>
      </SideLabel>
      {Object.entries(propJSON).map(([key, value], idx) => {
        const prop = value as FNCompDef;
        return (
          <PropItem
            mode={mode}
            key={key}
            name={key}
            idx={idx}
            prop={prop}
            props={props}
            doc={component.docs[active.component?.id || ""]}
            render={c.editor.page.render}
            reload={() => {
              local.loading = true;
              local.render();
              setTimeout(() => {
                local.loading = false;
                local.render();
              }, 10);
            }}
          />
        );
      })}
    </div>
  );
};

const PropItem: FC<{
  mode: "root" | "instance";
  prop: FNCompDef;
  props: TypedMap<Record<string, FMCompDef>>;
  name: string;
  idx: number;
  doc: CompDoc | null;
  render: () => void;
  reload: () => void;
}> = ({ prop, name, idx, mode, doc, render, props, reload }) => {
  const local = useLocal({
    name,
    prop,
    showType: false,
    el: null as null | HTMLDivElement,
  });

  const transact = (fn: () => void) => {
    if (doc) {
      doc.transact(fn);
    } else fn();
  };

  useEffect(() => {
    local.prop = { ...prop };
    local.render();
  }, [prop]);

  const focusType = useCallback(() => {
    setTimeout(() => {
      if (local.el) {
        const el = local.el.querySelector(
          ".type-field"
        ) as unknown as HTMLTextAreaElement;
        if (el) el.focus();
      }
    }, 10);
  }, [local.el]);

  const update = (key: keyof FNCompDef, value: any) => {
    transact(() => {
      let mprop = props.get(name);
      if (!mprop || (mprop && !(mprop instanceof Y.Map))) {
        props.set(name, new Y.Map() as any);
        mprop = props.get(name);
        syncronize(mprop as any, prop);
      }
      if (mprop) {
        if (typeof value === "object" && !(value instanceof Y.Map)) {
          const map = new Y.Map();
          syncronize(map, value);
          mprop.set(key, map);
        } else {
          mprop.set(key, value);
        }
      }
    });
  };
  let metaType = prop.meta?.type || "text";
  let metaOptions: { label: string; value: any }[] = [];
  if (prop.meta?.options) {
    try {
      eval(`metaOptions = ${prop.meta.options}`);
    } catch (e) {}
  }
  let value: any = null;
  if (prop.valueBuilt) {
    try {
      eval(`value = ${prop.valueBuilt || prop.value}`);
    } catch (e) {}
  }

  return (
    <div
      className={cx(
        "p-2 space-y-1 border-b flex flex-col items-stretch hover:bg-blue-100 ",
        idx % 2 !== 0 && "bg-white",
        idx === 0 ? "-mt-1" : "border-t border-t-white"
      )}
      ref={(el) => {
        if (el) local.el = el;
      }}
    >
      <div className="flex justify-between">
        <input
          type="text"
          value={local.name}
          className="border border-transparent bg-transparent focus:bg-white focus:border-slate-400 focus:px-1 flex-1 min-w-0"
          disabled={mode === "instance"}
          onChange={(e) => {
            local.name = e.currentTarget.value.replace(/\W/g, "");
            local.render();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          onFocus={(e) => {
            e.currentTarget.select();
          }}
          spellCheck={false}
          onBlur={() => {
            if (local.name !== name && local.name) {
              const item = props.get(name);
              if (item) {
                transact(() => {
                  props.set(local.name, new Y.Map() as any);
                  syncronize(props.get(local.name) as any, {
                    ...prop,
                    meta: { ...prop.meta, oldName: name },
                  });
                  props.delete(name);
                });
              }
            } else {
              local.name = name;
              local.render();
            }
          }}
        />
        <div className="flex items-center">
          {metaType !== "content-element" && (
            <div
              className={cx(
                "text-xs flex p-1 mr-1 border rounded-sm cursor-pointer hover:bg-white whitespace-nowrap border border-transparent hover:border-blue-500",
                mode === "instance" && "pointer-events-none"
              )}
              onClick={() => {
                local.showType = !local.showType;
                if (local.showType) {
                  focusType();
                }
                local.render();
              }}
            >
              {(prop.type || "any").substring(0, 7)}
              {(prop.type || "any").length > 7 && "…"}
            </div>
          )}

          {mode === "root" && (
            <div
              className="flex p-1 text-xs border rounded-sm cursor-pointer  bg-white justify-center text-red-700 hover:bg-red-50 hover:border-red-500"
              onClick={() => {
                props.delete(name);
                reload();
              }}
            >
              <Trash />
            </div>
          )}
          {mode === "instance" &&
            (props.has(name) || metaType === "content-element") && (
              <Tooltip content="Reset Prop" placement="top-start">
                <div
                  className="flex p-1 text-xs border rounded-sm cursor-pointer  bg-white justify-center text-orange-700 hover:bg-orange-50 hover:border-orange-500"
                  onClick={() => {
                    props.delete(name);
                    reload();
                  }}
                >
                  <Reset />
                </div>
              </Tooltip>
            )}
        </div>
      </div>

      {local.showType && (
        <AutoHeightTextarea
          defaultValue={local.prop.type}
          onChange={(e) => {
            local.prop.type = e.currentTarget.value;
            update("type", local.prop.type);
            local.render();
          }}
          onFocus={(e) => {
            e.currentTarget.select();
          }}
          onBlur={() => {
            local.showType = false;
            local.render();
          }}
          placeholder="TYPE"
          className="type-field p-1 font-mono text-xs border border-slate-300"
          spellCheck={false}
        />
      )}
      {mode === "root" && (
        <>
          <Dropdown
            popover={{
              className:
                "border text-sm max-w-[150px] h-[130px] overflow-hidden ",
              itemClassName: "border-b p-1 hover:bg-blue-100",
            }}
            items={["text", "option", "option-custom", "content-element"]}
            value={prop.meta?.type || "text"}
            onChange={(v) => {
              if (!local.prop.meta) {
                local.prop.meta = { type: "text" };
              }
              local.prop.meta = v as any;

              update("meta", { ...(prop.meta || {}), type: v });
              local.render();
            }}
            className="p-1 font-mono text-xs border border-slate-300"
          />
        </>
      )}
      <AutoHeightTextarea
        defaultValue={local.prop.meta?.options}
        placeholder="OPTIONS"
        minRows={5}
        onFocus={(e) => {
          if (!e.currentTarget.value) {
            e.currentTarget.value = `\
[
  { 
    label: "YES", 
    value: "y" 
  },
  { 
    label: "NO", 
    value: "n" 
  },
]`;
            e.currentTarget.style.height = "170px";
            update("meta", {
              ...(prop.meta || {}),
              options: e.currentTarget.value,
            });
          }
        }}
        className={cx(
          "p-1 font-mono text-[11px] border border-slate-300",
          mode === "root" &&
            (prop.meta?.type === "option" ||
              prop.meta?.type === "option-custom")
            ? ""
            : "hidden"
        )}
        onChange={(e) => {
          if (!local.prop.meta) {
            local.prop.meta = { type: "option" };
          }
          local.prop.meta.options = e.currentTarget.value;
          update("meta", {
            ...(prop.meta || {}),
            options: local.prop.meta?.options,
          });
          local.render();
        }}
      />
      {mode === "instance" &&
        (metaType === "option" || metaType === "option-custom") && (
          <div className="flex items-center space-x-1">
            {Array.isArray(metaOptions) &&
              metaOptions.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={cx(
                      "flex px-2 py-1 text-xs border rounded-sm cursor-pointer  justify-center ",
                      item.value !== value
                        ? "bg-white  text-blue-700 hover:bg-blue-50 hover:border-blue-500"
                        : "bg-blue-700 text-white"
                    )}
                    onClick={() => {
                      const val = JSON.stringify(item.value);
                      update("valueBuilt", val);
                      update("value", val);
                      local.prop.value = val;
                      if (metaType === "option-custom") {
                        reload();
                      } else {
                        local.render();
                      }
                    }}
                  >
                    {item.label}
                  </div>
                );
              })}
          </div>
        )}
      {((mode === "root" && metaType !== "content-element") ||
        (mode === "instance" &&
          (metaType === "text" || metaType === "option-custom"))) && (
        <AutoHeightTextarea
          defaultValue={local.prop.value}
          onChange={async (e) => {
            local.prop.value = e.currentTarget.value;
            update("value", local.prop.value);
            if (jscript.build) {
              const res = await jscript.build(
                "el.tsx",
                `return ${e.currentTarget.value}`
              );
              if (typeof res === "string") {
                update("valueBuilt", res.substring(6));
              }
            }
            render();
          }}
          placeholder={
            mode === "instance" ? "JS CODE </>" : "DEFAULT VALUE (JS)"
          }
          className="p-1 font-mono text-xs border border-slate-300"
          spellCheck={false}
        />
      )}
    </div>
  );
};

const Trash = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
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
);

const Reset = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z"
      fill="currentColor"
    ></path>
  </svg>
);
