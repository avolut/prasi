import { FC, useEffect } from "react";
import { useLocal } from "web-utils";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { TypedMap } from "yjs-types";
import { CompDoc } from "../../../../base/global/content-editor";
import { FMCompDef, FNCompDef } from "../../../types/meta-fn";
import { jscript } from "../script/script-element";
import { Popover } from "../../../ui/popover";
import { AutoHeightTextarea } from "./panel/link";

export const CPMaster: FC<{
  mprop: FMCompDef;
  prop: FNCompDef;
  name: string;
  props: TypedMap<Record<string, FMCompDef>>;
  doc: CompDoc | null;
  reload: () => void;
}> = ({ name, prop, mprop, doc, props, reload }) => {
  const local = useLocal({ name, open: false });
  const type = prop.meta?.type || "text";

  useEffect(() => {
    local.name = name;
    local.render();
  }, [name]);

  const transact = (fn: () => void) => {
    if (doc) {
      doc.transact(fn);
    } else fn();
  };
  const update = (key: keyof FNCompDef, value: any) => {
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
  };

  const updateValue = async (val: string) => {
    prop.value = val;

    if (jscript.build) {
      const res = await jscript.build("el.tsx", `return ${val}`);
      transact(() => {
        update("value", prop.value);
        if (typeof res === "string") {
          update("valueBuilt", res.substring(6));
        }
      });
    }
  };
  const reset = () => {
    props.delete(name);
    reload();
  };

  const mmeta = mprop.get("meta");
  const meta = prop.meta;
  if (!mmeta || !meta) {
    const map = new Y.Map();
    syncronize(map as any, { type: "text" });
    mprop.set("meta", map as any);
    return null;
  }
  return (
    <Popover
      backdrop={false}
      placement="left-start"
      open={local.open}
      popoverClassName="bg-white shadow-lg border border-slate-300"
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            local.open = false;
            local.render();
          }, 500);
        } else {
          local.open = true;
          local.render();
        }
      }}
      content={
        <div className="flex text-sm flex-col items-stretch space-y-1 py-1 w-[300px]">
          <div className="px-2 py-1 flex space-x-1">
            {[
              { label: "TXT", type: "text" },
              { label: "OPT", type: "option" },
              { label: "JSX", type: "content-element" },
            ].map((e) => {
              return (
                <div
                  key={e.type}
                  className={cx(
                    type === e.type
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-100",
                    " px-2 cursor-pointer"
                  )}
                  onClick={() => {
                    mmeta.set("type", e.type as any);
                  }}
                >
                  {e.label}
                </div>
              );
            })}
          </div>
          <div className="border-t border-slate-300 px-2 pt-2 pb-1 flex flex-col items-stretch">
            <div className="uppercase text-xs text-slate-500">Label</div>
            <input
              spellCheck={false}
              type="text"
              className="p-1 outline-none border focus:border-blue-500"
              value={local.name}
              onChange={(e) => {
                local.name = e.currentTarget.value;
                local.render();
              }}
              onBlur={() => {
                rename(local, name, props, prop, transact);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                }
              }}
            />
          </div>
          <div className="border-t border-slate-300 px-2 pt-2 pb-1 flex flex-col items-stretch">
            <div className="uppercase text-xs text-slate-500">ts type</div>
            <AutoHeightTextarea
              defaultValue={prop.type}
              onChange={(e) => {
                prop.type = e.currentTarget.value as any;

                mprop.set("type", prop.type);
                local.render();
              }}
              placeholder="TYPE"
              className="p-1 outline-none font-mono text-[11px] border focus:border-blue-500"
              spellCheck={false}
            />
          </div>
          <div className="border-t border-slate-300 px-2 pt-2 pb-1 flex flex-col items-stretch">
            <div className="uppercase text-xs text-slate-500">value</div>
            <AutoHeightTextarea
              defaultValue={prop.value}
              onChange={async (e) => {
                prop.value = e.currentTarget.value;
                mprop.set("value", prop.value);
                update("value", prop.value);
                if (jscript.build) {
                  const res = await jscript.build(
                    "el.tsx",
                    `return ${e.currentTarget.value}`
                  );
                  if (typeof res === "string") {
                    update("valueBuilt", res.substring(6));
                  }
                }
              }}
              placeholder="VALUE"
              className="p-1 outline-none font-mono text-[11px] border focus:border-blue-500"
              spellCheck={false}
            />
          </div>

          {type === "option" && (
            <div className="border-t border-slate-300 px-2 pt-2 pb-1 flex flex-col items-stretch">
              <div className="uppercase text-xs text-slate-500">OPTIONS</div>
              <AutoHeightTextarea
                defaultValue={meta.options}
                onChange={(e) => {
                  meta.options = e.currentTarget.value as any;
                  mmeta.set("options", meta.options);
                  local.render();
                }}
                onBlur={() => {}}
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
                    e.currentTarget.style.height = "220px";
                    meta.options = e.currentTarget.value as any;
                    mmeta.set("options", meta.options);
                  }
                }}
                placeholder="OPTIONS"
                className="p-1 outline-none font-mono text-[11px] border focus:border-blue-500"
                spellCheck={false}
              />
            </div>
          )}
        </div>
      }
    >
      <div
        className={cx(
          "border-b bg-white cursor-pointer hover:bg-orange-50 flex flex-col items-stretch"
        )}
        onClick={() => {
          local.open = true;
          local.render();
        }}
      >
        <div className="flex justify-between items-stretch flex-wrap">
          <input
            className="outline-none border-r p-1 w-[30px] text-center"
            value={prop.idx}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              prop.idx = parseInt(e.currentTarget.value) || 0;
              local.render();
            }}
            onBlur={(e) => {
              mprop.set("idx", parseInt(e.currentTarget.value));
            }}
          />
          <div className="p-1 flex flex-1 border-r justify-between items-center">
            <div>{name}</div>
            <div className="text-slate-500 text-xs">
              {
                (
                  {
                    option: "OPT",
                    text: "TXT",
                    "content-element": "JSX",
                  } as any
                )[type]
              }
            </div>
          </div>
          <div
            className="flex p-1 hover:bg-red-500 hover:text-white items-center justify-center cursor-pointer"
            onClick={() => {
              if (confirm("Are you sure ?")) {
                reset();
              }
            }}
          >
            <Trash />
          </div>
        </div>
      </div>
    </Popover>
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

const rename = (
  local: { name: string; render: () => void },
  name: string,
  props: TypedMap<Record<string, FMCompDef>>,
  prop: FNCompDef,
  transact: (fn: any) => void
) => {
  if (
    [
      "await",
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "debugger",
      "default",
      "delete",
      "do",
      "else",
      "enum",
      "export",
      "extends",
      "false",
      "finally",
      "for",
      "function",
      "if",
      "implements",
      "import",
      "in",
      "instanceof",
      "interface",
      "let",
      "new",
      "null",
      "package",
      "private",
      "protected",
      "public",
      "return",
      "super",
      "switch",
      "static",
      "this",
      "throw",
      "try",
      "true",
      "typeof",
      "var",
      "void",
      "while",
      "with",
      "yield",
    ].includes(local.name)
  ) {
    alert(`Cannot use "${local.name}" as name`);
    local.name = "local_name";
    local.render();
    return;
  }
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
};
