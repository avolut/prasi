import trim from "lodash.trim";
import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { TypedMap } from "yjs-types";
import { CEGlobal, CompDoc } from "../../../../base/global/content-editor";
import { FMCompDef, FNCompDef } from "../../../types/meta-fn";
import { jscript } from "../script/script-element";
import { AutoHeightTextarea } from "./panel/link";
import { Menu, MenuItem } from "../../../ui/context-menu";
import { Popover } from "../../../ui/popover";
import { ScriptCustom } from "../script/script-custom";
import { Modal } from "../../../ui/modal";
import { findScope } from "../../../page/content-edit/render-tools/init-scope";
import { typeStringify } from "../script/monaco/types/type-stringify";
import { iftext, register } from "../script/monaco/typings";
import { wsdoc } from "../../ws/wsdoc";
import { baseTypings } from "../script/monaco/types/base";

export const CPInstance: FC<{
  ceid: string;
  prop: FNCompDef;
  props: TypedMap<Record<string, FMCompDef>>;
  name: string;
  doc: CompDoc | null;
  reload: () => void;
}> = ({ name, prop, doc, props, reload, ceid }) => {
  const local = useLocal({ mevent: null as any, editCode: false });
  const type = prop.meta?.type || "text";

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

  if (type === "content-element") return null;
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        local.mevent = e;
        local.render();
      }}
      className={cx(
        "border-b bg-white hover:bg-orange-50 flex flex-col items-stretch"
      )}
    >
      {local.mevent && (
        <Menu
          mouseEvent={local.mevent}
          onClose={() => {
            local.mevent = null;
            local.render();
          }}
        >
          <MenuItem label="Reset" onClick={reset} />
          <MenuItem
            label={"Edit Code"}
            onClick={() => {
              local.editCode = true;
              local.render();
            }}
          />
        </Menu>
      )}
      <div className="flex justify-between items-stretch flex-wrap">
        {(() => {
          const label = (
            <div
              className={cx(
                "border-l-2 border-transparent cursor-pointer pr-3 flex items-center w-[50px] overflow-hidden relative",
                local.mevent ? "bg-orange-500 text-white" : " ",
                css`
                  .absolute {
                    max-width: 45px;
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
                if (local.mevent) {
                  local.mevent = null;
                } else {
                  local.mevent = e;
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
                <Popover
                  open={true}
                  onOpenChange={(open) => {
                    if (!open) {
                      local.editCode = false;
                      local.render();
                    }
                  }}
                  placement="left-start"
                  autoFocus={false}
                  backdrop={false}
                  content={
                    <div className="bg-white w-[55vw] h-[55vh] flex">
                      <CodeEdit
                        ceid={ceid}
                        value={prop.value}
                        onChange={updateValue}
                      />
                    </div>
                  }
                  className="bg-orange-500 text-white px-2 flex items-center"
                >
                  {name}
                </Popover>
              ) : (
                label
              )}
            </>
          );
        })()}
        <div className="flex items-stretch flex-1">
          {type === "text" && (
            <CPText
              value={prop.value}
              onChange={updateValue}
              editCode={() => {
                local.editCode = true;
                local.render();
              }}
              reset={reset}
            />
          )}
          {type === "option" && (
            <CPOption
              prop={prop}
              value={prop.value}
              onChange={updateValue}
              editCode={() => {
                local.editCode = true;
                local.render();
              }}
              reset={reset}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const CPOption: FC<{
  prop: FNCompDef;
  value: string;
  onChange: (v: string) => void;
  editCode: () => void;
  reset: () => void;
}> = ({ value, prop, onChange, editCode, reset }) => {
  let metaOptions: { label: string; value: any }[] = [];
  if (prop.meta?.options) {
    try {
      eval(`metaOptions = ${prop.meta.options}`);
    } catch (e) {}
  }

  let evalue: any = null;
  try {
    eval(`evalue = ${value}`);
  } catch (e) {}

  if (
    !metaOptions.find((e) => {
      return e.value === evalue;
    })
  ) {
    return <Coded editCode={editCode} reset={reset} />;
  }

  return (
    <div className="flex items-center flex-wrap pt-1 space-x-1 justify-end px-2 flex-1">
      {Array.isArray(metaOptions) &&
        metaOptions.map((item, idx) => {
          return (
            <div
              key={idx}
              className={cx(
                "flex px-2 text-xs mb-1 border rounded-sm cursor-pointer  justify-center ",
                item.value !== evalue
                  ? "bg-white  text-blue-700 hover:bg-blue-50 hover:border-blue-500"
                  : "bg-blue-700 text-white border-blue-700"
              )}
              onClick={() => {
                const val = JSON.stringify(item.value);
                onChange(val);
              }}
            >
              {item.label}
            </div>
          );
        })}
    </div>
  );
};

const CPText: FC<{
  value: string;
  onChange: (v: string) => void;
  editCode: () => void;
  reset: () => void;
}> = ({ value, onChange, editCode, reset }) => {
  const local = useLocal({ value: trim(value, '"'), timer: null as any });
  useEffect(() => {
    local.value = trim(value, '"');
    local.render();
  }, [value]);

  if (typeof value === "string" && !value.trim().startsWith('"')) {
    return <Coded editCode={editCode} reset={reset} />;
  }

  return (
    <>
      <div className="border-l"></div>
      <AutoHeightTextarea
        value={local.value}
        onChange={async (e) => {
          local.value = e.currentTarget.value;
          local.render();

          clearTimeout(local.timer);
          local.timer = setTimeout(() => {
            onChange(`"${local.value}"`);
          }, 1000);
        }}
        onContextMenu={(e) => {
          e.stopPropagation();
        }}
        onBlur={() => {
          onChange(`"${local.value}"`);
        }}
        className="flex-1 p-1 font-mono border-2 border-transparent outline-none bg-transparent focus:bg-white focus:border-blue-500 border-slate-300 text-[11px]"
        spellCheck={false}
      />
    </>
  );
};

const Coded: FC<{
  editCode: () => void;
  reset: () => void;
}> = ({ editCode, reset }) => {
  return (
    <div className="flex flex-1 items-stretch justify-end pr-2">
      <div
        className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]"
        onClick={editCode}
      >
        EDIT CODE
      </div>

      <div
        className="my-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px] flex items-center"
        onClick={reset}
        dangerouslySetInnerHTML={{
          __html: `<svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
        }}
      ></div>
    </div>
  );
};

const CodeEdit: FC<{
  ceid: string;
  value: string;
  onChange: (v: string) => void;
}> = ({ ceid, value, onChange }) => {
  const local = useLocal({ value, timer: null as any });
  const c = useGlobal(CEGlobal, ceid);
  const scope = findScope(c.scope, c.editor.active?.get("id") || "");
  const propVal: any = { ...(window.exports || {}) };
  const propTypes: any = {};
  for (const [k, v] of Object.entries(scope)) {
    propVal[k] = v;
  }
  if (c.scope.types.root) {
    for (const [k, v] of Object.entries(c.scope.types.root)) {
      if (!propTypes[k]) propTypes[k] = v;
    }
  }
  for (const [k, v] of Object.entries(propVal)) {
    if (!propTypes[k]) {
      if (typeof v !== "function") {
        propTypes[k] = JSON.stringify(v, typeStringify)
          .replaceAll('"___FFF||', "")
          .replaceAll('||FFF___"', "");
      } else {
        propTypes[k] = "function";
      }
    }
  }

  return (
    <ScriptCustom
      ceid={ceid}
      monacoid={"value"}
      src={value || ""}
      wrap={(src) => {
        return `${src}`;
      }}
      onLoad={(editor, monaco) => {
        register(
          monaco,
          `\
import React from 'react';
import prisma from 'prisma';

${iftext(
  wsdoc.apiDef.apiTypes,
  `\
import "./api"
import type * as SRVAPI from "app/gen/srv/api/srv";`
)}


declare global {
  const db: prisma.PrismaClient; 
  
  ${baseTypings}

  ${iftext(
    wsdoc.apiDef.apiTypes,
    `
  type Api = typeof SRVAPI;
  type ApiName = keyof Api;
  const api: { [k in ApiName]: Awaited<Api[k]["handler"]>["_"]["api"] };
  `
  )}
}

  `,
          "ts:global.d.ts"
        );
      }}
      onChange={(src) => {
        local.value = src;
        local.render();
        clearTimeout(local.timer);
        local.timer = setTimeout(() => {
          onChange(local.value);
        }, 1000);
      }}
      propTypes={propTypes}
    />
  );
};
