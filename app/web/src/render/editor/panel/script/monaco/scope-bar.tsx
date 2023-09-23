import { Fragment, isValidElement } from "react";
import { useGlobal, useLocal } from "web-utils";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { EditorGlobal, ItemMeta } from "../../../logic/global";
import { rebuildTree } from "../../../logic/tree-logic";
import { mergeScopeUpwards } from "../../../logic/tree-scope";
import { ChevronLeft } from "../../tree/tree";
import { ChevronRight } from "../../tree/item/indent";

const scopeHistory: ItemMeta[] = [];

const TIMEOUT = 100;
export const MonacoScopeBar = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal(
    {
      vars: [] as { meta: ItemMeta; values: Record<string, any> }[],
    },
    () => {
      const meta = p.treeMeta[p.item.active];
      local.vars.length = 0;
      console.clear();
      mergeScopeUpwards(p, meta, {
        debug: true,
        each: (m, vars) => {
          local.vars.push({
            meta: m,
            values: vars,
          });
          return true;
        },
      });
      local.render();
    }
  );

  const vars = Object.entries(local.vars).filter(
    ([_, { meta }]) => meta !== p.treeMeta[p.item.active]
  );
  return (
    <div className="flex border-t min-h-[55px] select-none text-xs items-stretch overflow-x-auto relative">
      <div className="absolute space-x-1  inset-0 flex flex-nowrap items-stretch">
        {scopeHistory.length > 0 && (
          <div
            className="border-r px-2 flex items-center cursor-pointer hover:bg-blue-100"
            onClick={async (e) => {
              const meta = scopeHistory.pop();

              if (meta) {
                p.script.active = false;
                p.render();

                if (meta.parent_comp) {
                  p.comp = {
                    id: meta.parent_comp.comp.id,
                    instance_id: meta.parent_comp.item.id,
                    last: [
                      {
                        active_id: p.item.active,
                        active_oid: p.item.activeOriginalId,
                      },
                    ],
                    props: {},
                  };
                } else if (meta.comp) {
                  p.comp = {
                    id: meta.comp.id,
                    instance_id: meta.item.id,
                    last: [
                      {
                        active_id: p.item.active,
                        active_oid: p.item.activeOriginalId,
                      },
                    ],
                    props: {},
                  };
                } else {
                  p.comp = null;
                }
                await rebuildTree(p, { mode: "update", note: "edit-js" });

                p.item.active = meta.item.id;
                if (meta.item.originalId) {
                  p.item.activeOriginalId = meta.item.originalId;
                }

                setTimeout(() => {
                  p.script.active = true;
                  p.render();
                }, TIMEOUT);
              }
            }}
          >
            <ChevronLeft />
            <span>Back</span>
          </div>
        )}

        <div className="pl-2 flex items-center whitespace-nowrap">Scope: </div>
        {vars.length === 0 ? (
          <div className="text-gray-500 flex items-center">None</div>
        ) : (
          vars.map(([itemID, { meta, values }], idx) => {
            const ovals = Object.entries(values);
            return (
              <Fragment key={`${itemID}`}>
                {idx > 0 && (
                  <div className="w-[15px] text-blue-400 flex items-center">
                    <ChevronRight size={15} />
                  </div>
                )}
                <div className="border flex my-[2px] items-stretch self-center h-[28px]">
                  <Tooltip
                    content={"Edit Item JS"}
                    className={cx(
                      "flex items-center px-2 cursor-pointer bg-blue-50 hover:bg-white text-slate-500",
                      ovals.length === 0 ? "" : "border-r "
                    )}
                  >
                    <div
                      className="whitespace-nowrap flex space-x-2 items-center"
                      onClick={async (e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        scopeHistory.push(p.treeMeta[p.item.active]);

                        p.script.active = false;
                        p.render();

                        if (meta.parent_comp) {
                          p.comp = {
                            id: meta.parent_comp.comp.id,
                            instance_id: meta.parent_comp.item.id,
                            last: [
                              {
                                active_id: p.item.active,
                                active_oid: p.item.activeOriginalId,
                              },
                            ],
                            props: {},
                          };
                        } else if (meta.comp) {
                          p.comp = {
                            id: meta.comp.id,
                            instance_id: meta.item.id,
                            last: [
                              {
                                active_id: p.item.active,
                                active_oid: p.item.activeOriginalId,
                              },
                            ],
                            props: {},
                          };
                        } else {
                          p.comp = null;
                        }
                        await rebuildTree(p, {
                          mode: "update",
                          note: "edit-js",
                        });

                        p.item.active = meta.item.id;
                        if (meta.item.originalId) {
                          p.item.activeOriginalId = meta.item.originalId;
                        }

                        setTimeout(() => {
                          p.script.active = true;
                          p.render();
                        }, TIMEOUT);
                      }}
                    >
                      {meta.comp && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={11}
                          height={11}
                          fill="none"
                          viewBox="0 0 15 15"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M7.289.797a.5.5 0 01.422 0l6 2.8A.5.5 0 0114 4.05v6.9a.5.5 0 01-.289.453l-6 2.8a.5.5 0 01-.422 0l-6-2.8A.5.5 0 011 10.95v-6.9a.5.5 0 01.289-.453l6-2.8zM2 4.806L7 6.93v6.034l-5-2.333V4.806zm6 8.159l5-2.333V4.806L8 6.93v6.034zm-.5-6.908l4.772-2.028L7.5 1.802 2.728 4.029 7.5 6.057z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                      <div>{meta.item.name}</div>
                    </div>
                  </Tooltip>
                  {ovals.length > 0 && (
                    <div className="px-2 flex space-x-1 py-1 bg-blue-50">
                      {ovals.map(([name, value]) => {
                        return (
                          <Tooltip
                            key={name}
                            delay={0}
                            content={
                              <div className="text-[11px] font-mono">
                                Value:
                                <br />
                                {JSON.stringify(value, safeCycles())}
                              </div>
                            }
                          >
                            <div className="px-1  hover:bg-blue-400 hover:text-white bg-white border flex items-center">
                              {name}
                            </div>
                          </Tooltip>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Fragment>
            );
          })
        )}
        <div className="min-w-[30px] h-2"></div>
      </div>
    </div>
  );
};

function safeCycles() {
  let seen: any[] = [];
  return function (_: any, val: any) {
    if (!val || typeof val !== "object") {
      return val;
    }
    if (isValidElement(val)) {
      return "React Element";
    }

    // Watch out for Window host objects that are trickier to handle.
    if (val instanceof Window || seen.indexOf(val) !== -1) {
      return "[Circular]";
    }
    seen.push(val);
    return val;
  };
}
