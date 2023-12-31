import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { TypedMap } from "yjs-types";
import { IContent } from "../../../../../utils/types/general";
import { MItem } from "../../../../../utils/types/item";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";
import { Popover } from "../../../../../utils/ui/popover";
import { closeEditComp } from "../../../logic/comp";
import { EditorGlobal, PG } from "../../../logic/global";
import { newMap } from "../../../tools/yjs-tools";

const popover = {
  name: "",
};

export const CPMaster: FC<{ mitem: MItem }> = ({ mitem }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({ id: mitem.get("id") || "", ready: false });

  useEffect(() => {
    const pitem = mitem.toJSON() as IContent;
    if (pitem.type === "text") {
      if (p.comp && meta?.parent_comp) {
        const nmeta = meta.parent_comp;
        p.item.active = nmeta.item.id;
        p.item.activeOriginalId = nmeta.item.id;
        if (nmeta.item.originalId) {
          p.item.activeOriginalId = nmeta.item.originalId;
        }
        localStorage.setItem("prasi-item-active-oid", p.item.activeOriginalId);
        localStorage.setItem("prasi-item-active-id", p.item.active);
      }

      if (document.activeElement) {
        (document.activeElement as HTMLInputElement).blur();
      }
      local.id = p.item.active;
      p.compProp.edit = true;
      p.render();
    } else if (local.id !== mitem.get("id")) {
      p.compProp.edit = false;
      p.render();
    }
  }, [mitem]);

  if (!p.comp)
    return <div className="flex flex-col flex-1 p-3">No Active Component</div>;

  const meta = p.treeMeta[p.comp.instance_id || ""];

  if (!meta)
    return <div className="flex flex-col flex-1 p-3">Meta Not Found</div>;
  if (!meta.comp) {
    return (
      <div className="flex flex-col flex-1 p-3">Meta Component Not Found</div>
    );
  }
  if (!meta.comp.mcomp) {
    return <div className="flex flex-col flex-1 p-3">MComponent Not Found</div>;
  }
  const mprops = meta.comp.mcomp.get("component")?.get("props");

  if (!mprops) {
    return <div className="flex flex-col flex-1 p-3">MProps Not Found</div>;
  }

  const props = mprops.toJSON();

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b py-1 bg-white flex justify-between items-center">
        <div className="flex items-center">
          <div
            className="text-[11px] cursor-pointer select-none text-slate-400 pl-1 flex items-center"
            onClick={() => {
              if (p.compProp.backToInstance) {
                p.compProp.backToInstance = false;
                closeEditComp(p);
              }
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
          <div
            className="flex cursor-pointer items-center border border-slate-500 bg-white rounded-sm text-[10px] px-[5px] m-1 opacity-50 hover:opacity-100"
            onClick={() => {
              if (mprops) {
                let idx: any = "";
                let name = "prop";
                while (mprops?.get(name)) {
                  idx = idx === "" ? 1 : idx + 1;
                  name = `prop_${idx}`;
                }

                mprops.set(
                  name,
                  newMap({
                    idx: Object.keys(mprops.toJSON()).length + 1,
                    name,
                    type: "string",
                    value: '"hello"',
                    valueBuilt: '"hello"',
                    meta: {
                      type: "text",
                    },
                  }) as FMCompDef
                );
              }
            }}
          >
            Add
          </div>
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
                    p={p}
                    key={name}
                    name={name}
                    prop={prop}
                    props={props}
                    mprop={mprop as any}
                  />
                );
              }
              return <></>;
            })}
          <div className="p-2 flex items-center justify-center space-x-2">
            <div
              className="bg-white border rounded px-3 text-xs cursor-pointer hover:bg-blue-100 active:bg-blue-500 active:text-white"
              onClick={() => {
                if (p.comp?.id) {
                  const props = p.comps.doc[p.comp.id]
                    .getMap("map")
                    .get("content_tree")
                    ?.get("component")
                    ?.get("props")
                    ?.toJSON();

                  const str = JSON.stringify(props) + `_prasiprop`;
                  navigator.clipboard.writeText(str);
                }
              }}
            >
              Copy All
            </div>
            <div
              className="bg-white border rounded px-3 text-xs cursor-pointer hover:bg-blue-100 active:bg-blue-500 active:text-white"
              onClick={async () => {
                if (p.comp?.id) {
                  const props = p.comps.doc[p.comp.id]
                    .getMap("map")
                    .get("content_tree")
                    ?.get("component")
                    ?.get("props");

                  let cp = await navigator.clipboard.readText();
                  if (cp.endsWith("_prasiprop") && props) {
                    const cprops = JSON.parse(
                      cp.substring(0, cp.length - `_prasiprop`.length)
                    ) as Record<string, any>;

                    props.doc?.transact(() => {
                      for (const [k, v] of Object.entries(cprops)) {
                        const prop = newMap({ ...(v as any), name: k });
                        props?.set(k, prop as any);
                      }
                    });
                  }
                }
              }}
            >
              Paste
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PreviewItemProp = () => {
  return <></>;
  // const p = useGlobal(EditorGlobal, "EDITOR");

  // return (
  //   <div
  //     className="flex text-xs space-x-1 mr-1 cursor-pointer hover:text-blue-500 items-center"
  //     onClick={() => {
  //       p.compProp.inherit = !p.compProp.inherit;
  //       p.render();
  //     }}
  //   >
  //     <div>
  //       {p.compProp.inherit ? <>Prop Inherited</> : <>No Inheritance</>}
  //     </div>
  //     <div>
  //       {!p.compProp.inherit ? (
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="20"
  //           height="20"
  //           viewBox="0 0 24 24"
  //         >
  //           <path
  //             fill="currentColor"
  //             d="M8 7a5 5 0 000 10h8a5 5 0 000-10H8zm0-2h8a7 7 0 110 14H8A7 7 0 118 5zm0 10a3 3 0 110-6 3 3 0 010 6z"
  //           ></path>
  //         </svg>
  //       ) : (
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="20"
  //           height="20"
  //           viewBox="0 0 24 24"
  //         >
  //           <path
  //             fill="currentColor"
  //             d="M8 5h8a7 7 0 110 14H8A7 7 0 118 5zm8 10a3 3 0 100-6 3 3 0 000 6z"
  //           ></path>
  //         </svg>
  //       )}
  //     </div>
  //   </div>
  // );
};

const SingleProp: FC<{
  p: PG;
  name: string;
  prop: FNCompDef;
  mprop: FMCompDef;
  props: Record<string, FNCompDef>;
}> = ({ p, name, prop, mprop, props }) => {
  const local = useLocal({ name });
  const type = prop.meta?.type || "text";

  return (
    <SinglePopover
      name={name}
      p={p}
      prop={prop}
      mprop={mprop}
      local={local}
      props={props}
    >
      <div
        className={cx(
          "border-b bg-white cursor-pointer hover:bg-orange-50 flex flex-col items-stretch"
        )}
      >
        <div className="flex justify-between items-stretch flex-wrap">
          <input
            className="outline-none border-r p-1 w-[30px] text-center"
            value={prop.idx}
            onClick={(e) => {
              e.stopPropagation();
              e.currentTarget.select();
            }}
            onFocus={(e) => {
              e.stopPropagation();
              e.currentTarget.select();
            }}
            onChange={(e) => {
              prop.idx = parseInt(e.currentTarget.value) || 0;
              local.render();
            }}
            onBlur={(e) => {
              mprop.set("idx", parseInt(e.currentTarget.value));
            }}
          />
          <div
            className="p-1 flex flex-1 border-r justify-between items-center"
            onClick={() => {
              popover.name = name;
              local.render();
            }}
          >
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (confirm("Are you sure ?")) {
                const parent = mprop.parent as TypedMap<
                  Record<string, FMCompDef>
                >;
                parent.forEach((m, idx) => {
                  if (mprop === m) {
                    parent.delete(idx);
                  }
                });
              }
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
  props: Record<string, FNCompDef>;
  p: PG;
}> = ({ p, name, prop, mprop, children, local, props }) => {
  const type = prop.meta?.type || "text";
  const mmeta = mprop.get("meta");
  const meta = prop.meta;
  if (!mmeta || !meta) return null;

  const args: any = {};
  for (const [k, v] of Object.entries(props)) {
    try {
      if (v.valueBuilt || v.value) {
        const fn = new Function(`return ${v.valueBuilt || v.value}`);
        args[k] = fn();
      }
    } catch (e) {}
  }

  const createEditScript = (
    mode: Exclude<typeof p.script.prop, null>["mode"]
  ) => {
    return () => {
      p.script.active = true;
      p.script.prop = {
        mode: mode as any,
        name: local.name,
      };
      p.script.onClose = () => {
        let i = 0;
        p.compProp.edit = true;
        popover.name = name;
        p.render();
        const ival = setInterval(() => {
          i++;
          if (i > 10) {
            clearInterval(ival);
          }
          p.compProp.edit = true;
          popover.name = name;
          p.render();
        }, 50);
      };
      p.render();
    };
  };

  return (
    <Popover
      children={children}
      autoFocus={false}
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
            <div className="uppercase text-xs text-slate-500">Name</div>
            <input
              spellCheck={false}
              type="text"
              className="p-1 outline-none border focus:border-blue-500"
              value={local.name}
              onChange={(e) => {
                local.name = e.currentTarget.value
                  .toLowerCase()
                  .replace(/\W/gi, "_");
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

          {type === "content-element" && (
            <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center">
              <div className="uppercase text-xs label self-stretch flex items-center">
                Visible
              </div>

              <div
                className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
                onClick={createEditScript("master-visible")}
              >
                EDIT CODE
              </div>
            </div>
          )}

          {type !== "content-element" && (
            <>
              <div
                className={cx(
                  "border-t border-slate-300 pl-2 flex justify-between items-center",
                  css`
                    margin-bottom: -0.25rem !important;

                    > .label {
                      padding-top: 0.75rem;
                      padding-bottom: 0.75rem;
                    }
                  `
                )}
              >
                <div className="uppercase text-xs label self-stretch flex items-center">
                  Generator
                </div>
                <div
                  className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px] flex "
                  onClick={createEditScript("master-gen")}
                >
                  EDIT CODE
                </div>
                <div className=" border-l border-slate-300 mr-2 self-stretch"></div>
                <div className="uppercase text-xs label self-stretch flex items-center">
                  Visible
                </div>
                <div
                  className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
                  onClick={createEditScript("master-visible")}
                >
                  EDIT CODE
                </div>
              </div>

              <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center">
                <div className="uppercase text-xs">VALUE</div>
                <div
                  className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
                  onClick={createEditScript("master-value")}
                >
                  EDIT CODE
                </div>
              </div>
            </>
          )}
          {type === "option" && (
            <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center select-none">
              <div className="uppercase text-xs">MODE</div>

              <div className="flex pr-1">
                {["button", "dropdown"].map((e) => (
                  <div
                    key={e}
                    onClick={() => {
                      const meta = mprop.get("meta");
                      if (meta) {
                        meta.set("option_mode", e as any);
                      }
                    }}
                    className={cx(
                      "m-1 px-1 capitalize text-center cursor-pointer  font-mono border border-slate-300 text-[11px]",
                      e === prop.meta?.option_mode ||
                        (e === "button" && !prop.meta?.option_mode)
                        ? "bg-blue-500 text-white"
                        : `hover:bg-blue-500 hover:text-white bg-white hover:border-blue-500`
                    )}
                  >
                    {e}
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === "option" && (
            <div className="border-t border-slate-300 pl-2 pt-1 flex justify-between items-center">
              <div className="uppercase text-xs">OPTIONS</div>

              <div
                className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
                onClick={createEditScript("master-option")}
              >
                EDIT CODE
              </div>
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
