import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { TypedMap } from "yjs-types";
import { IItem, MItem } from "../../../../../utils/types/item";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";
import { Loading } from "../../../../../utils/ui/loading";
import { Popover } from "../../../../../utils/ui/popover";
import { EditorGlobal } from "../../../logic/global";
import { jscript } from "../../script/script-element";
import { CPCodeEdit } from "./CPCodeEdit";
import { CPOption } from "./CPOption";
import { CPText } from "./CPText";
import { editComp } from "../../../logic/comp";

export const CPInstance: FC<{ mitem: MItem }> = ({ mitem }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    ready: false,
    mprops: null as unknown as TypedMap<Record<string, FMCompDef>>,
    props: {} as Record<string, FNCompDef>,
  });

  useEffect(() => {
    (async () => {
      const comp = p.comps.doc[mitem.get("component")?.get("id") || ""];
      if (comp) {
        const rprops = comp
          .getMap("map")
          .get("content_tree")
          ?.get("component")
          ?.get("props");

        const mcomp = mitem.get("component");
        if (rprops && mcomp) {
          local.mprops = mcomp.get("props") as any;
          const newprops: any = {};
          rprops.forEach((e, k) => {
            const prop = local.mprops.get(k);
            newprops[k] = e.toJSON();
            if (prop) {
              newprops[k].value = prop.get("value");
              newprops[k].valueBuilt = prop.get("valueBuilt");
            } else {
              local.mprops.set(k, new Y.Map() as any);
              const mprop = local.mprops.get(k);
              syncronize(mprop as any, newprops[k]);
            }
          });
          local.props = newprops;
        }
      }

      if (!jscript.build) {
        jscript.init().then(() => {
          local.ready = true;
          local.render();
        });
      } else {
        local.ready = true;
        local.render();
      }
    })();
  }, []);

  if (!local.ready) return <Loading backdrop={false} />;

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b bg-white flex justify-between items-center">
        <div className="text-[10px] select-none text-slate-400 pl-1 py-1">
          PROPS
        </div>
        <div
          className="flex mr-1 px-2 bg-white text-xs border rounded-sm cursor-pointer hover:bg-blue-50 hover:border-blue-500 text-blue-700"
          onClick={() => {
            p.compProp.edit = true;
            editComp(p, mitem.toJSON() as IItem);
          }}
        >
          Edit Master Props
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
              if (mprop && v.meta?.type !== "content-element") {
                return (
                  <SingleProp
                    key={k}
                    name={k}
                    prop={mprop.toJSON() as any}
                    mprop={mprop}
                    render={p.render}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

const SingleProp: FC<{
  name: string;
  prop: FNCompDef;
  mprop: FMCompDef;
  render: () => void;
}> = ({ name, prop, mprop, render }) => {
  const local = useLocal({
    clickEvent: null as any,
    editCode: false,
  });
  const type = prop.meta?.type || "text";
  const updateValue = async (val: string) => {
    if (jscript.build) {
      const res = await jscript.build("el.tsx", `return ${val}`);
      mprop.doc?.transact(() => {
        mprop.set("value", val);
        mprop.set("valueBuilt", res.substring(6));
      });
      render();
    }
  };
  const reset = () => {};

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
      <div className="flex justify-between items-stretch flex-wrap relative">
        {(() => {
          const label = (
            <div
              className={cx(
                "border-l-2 border-transparent cursor-pointer pr-3 flex items-center w-[50px] overflow-hidden relative",
                local.clickEvent ? "bg-orange-500 text-white" : " ",
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
                      <CPCodeEdit
                        value={prop.value || ""}
                        onChange={updateValue}
                      />
                    </div>
                  }
                  className="bg-orange-500 text-white px-2 flex items-center absolute inset-0"
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
              prop={prop}
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