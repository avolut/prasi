import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { MItem } from "../../../../../utils/types/item";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";
import { Popover } from "../../../../../utils/ui/popover";
import { EditorGlobal } from "../../../logic/global";
import { AutoHeightTextarea } from "../panel/link";
import { TypedMap } from "yjs-types";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { jscript } from "../../script/script-element";

const popover = {
  name: "",
};

export const CPMaster: FC<{ mitem: MItem }> = ({ mitem }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({ id: mitem.get("id") || "", ready: false });

  useEffect(() => {
    if (local.id !== mitem.get("id")) {
      p.compProp.edit = false;
      p.render();
    }
  }, [mitem]);

  const mprops = p.comps.doc[p.comp?.content_tree?.component?.id || ""]
    .getMap("map")
    ?.get("content_tree")
    ?.get("component")
    ?.get("props");
  const props = mprops?.toJSON() as Record<string, FNCompDef>;

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b py-1 bg-white flex justify-between items-center">
        <div
          className="text-[11px] cursor-pointer select-none text-slate-400 pl-1 flex items-center"
          onClick={() => {
            p.compProp.edit = false;
            p.render();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M10 16L20 6l1.4 1.4-8.6 8.6 8.6 8.6L20 26z"
            ></path>
          </svg>
          <div>Back</div>
        </div>
        <PreviewItemProp />
      </div>
      <div className="flex-1 relative overflow-y-auto">
        <div className="absolute flex-col inset-0">
          {Object.entries(props)
            .sort((a, b) => {
              return a[1].idx - b[1].idx;
            })
            .map(([name, prop]) => {
              const mprop = mprops?.get(name);
              if (mprop) {
                return (
                  <SingleProp
                    key={name}
                    name={name}
                    prop={prop}
                    mprop={mprop}
                  />
                );
              }
              return <></>;
            })}
        </div>
      </div>
    </div>
  );
};

export const PreviewItemProp = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  return (
    <div
      className="flex text-xs space-x-1 mr-1 cursor-pointer hover:text-blue-500 items-center"
      onClick={() => {
        for (const k of Object.keys(p.itemProps)) {
          delete p.itemProps[k];
        }
        p.compProp.preview = !p.compProp.preview;
        p.render();
      }}
    >
      <div>Preview Prop</div>
      <div>
        {!p.compProp.preview ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M8 7a5 5 0 000 10h8a5 5 0 000-10H8zm0-2h8a7 7 0 110 14H8A7 7 0 118 5zm0 10a3 3 0 110-6 3 3 0 010 6z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M8 5h8a7 7 0 110 14H8A7 7 0 118 5zm8 10a3 3 0 100-6 3 3 0 000 6z"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};

const SingleProp: FC<{ name: string; prop: FNCompDef; mprop: FMCompDef }> = ({
  name,
  prop,
  mprop,
}) => {
  const local = useLocal({ name });
  const type = prop.meta?.type || "text";

  return (
    <SinglePopover name={name} prop={prop} mprop={mprop} local={local}>
      <div
        className={cx(
          "border-b bg-white cursor-pointer hover:bg-orange-50 flex flex-col items-stretch"
        )}
        onClick={() => {
          popover.name = name;
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
              // if (confirm("Are you sure ?")) {
              //   reset();
              // }
            }}
          >
            <Trash />
          </div>
        </div>
      </div>
    </SinglePopover>
  );
};

const SinglePopover: FC<{
  name: string;
  prop: FNCompDef;
  mprop: FMCompDef;
  children: any;
  local: { name: string; render: () => void };
}> = ({ name, prop, mprop, children, local }) => {
  const type = prop.meta?.type || "text";
  const mmeta = mprop.get("meta");
  const meta = prop.meta;
  if (!mmeta || !meta) return null;

  return (
    <Popover
      children={children}
      backdrop={false}
      placement="left-start"
      open={popover.name === name}
      popoverClassName="bg-white shadow-lg border border-slate-300"
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            popover.name = "";
            local.render();
          }, 100);
        } else {
          popover.name = name;
          local.render();
        }
      }}
      content={
        <div
          className={cx(
            "flex text-sm flex-col items-stretch space-y-1 py-1 w-[300px]",
            css`
              textarea {
                max-height: 300px;
              }
            `
          )}
        >
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
                if (local.name !== name) {
                  const keys = Object.keys(mprop.parent?.toJSON());
                  if ([...keys, ...keywords].includes(local.name)) {
                    alert(`Cannot use "${local.name}" as name`);
                    local.name = name;
                    local.render();
                    return;
                  }
                  mprop.doc?.transact(() => {
                    const parent = mprop.parent as TypedMap<
                      Record<string, FMCompDef>
                    >;
                    parent.set(local.name, parent.get(name)?.clone() as any);
                    parent.delete(name);
                  });
                  popover.name = local.name;
                  local.render();
                }
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

                if (jscript.build) {
                  const res = await jscript.build(
                    "el.tsx",
                    `return ${prop.value}`
                  );
                  mprop.doc?.transact(() => {
                    mprop.set("value", prop.value);
                    mprop.set("valueBuilt", res.substring(6));
                  });
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
    />
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

const keywords = [
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
];
