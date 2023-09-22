import { isValidElement } from "react";
import { useGlobal, useLocal } from "web-utils";
import { Popover } from "../../../../../utils/ui/popover";
import { createElProp } from "../../../elements/e-relprop";
import { EditorGlobal, ItemMeta } from "../../../logic/global";
import { mergeScopeUpwards } from "../../../logic/tree-scope";
import { ItemIcon } from "../../tree/item/indent";
import { ChevronLeft } from "../../tree/tree";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { editComp } from "../../../logic/comp";
import { rebuildTree } from "../../../logic/tree-logic";

const scopeHistory: ItemMeta[] = [];

export const MonacoScopeBar = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal(
    {
      vars: {} as Record<
        string,
        { meta: ItemMeta; values: Record<string, any> }
      >,
    },
    () => {
      const meta = p.treeMeta[p.item.active];
      local.vars = {};
      mergeScopeUpwards(p, meta, (m, vars) => {
        local.vars[m.item.id] = {
          meta: m,
          values: vars,
        };
        return true;
      });
      local.render();
    }
  );

  const vars = Object.entries(local.vars).filter(
    ([_, { meta }]) => meta !== p.treeMeta[p.item.active]
  );
  return (
    <div className="flex border-t min-h-[30px] select-none text-xs space-x-2 items-stretch ">
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
              }, 300);
            }
          }}
        >
          <ChevronLeft />
          <span>Back</span>
        </div>
      )}

      <div className="pl-2 flex items-center"> Available Vars: </div>
      {vars.length === 0 ? (
        <div className="text-gray-500 flex items-center">None</div>
      ) : (
        vars.map(([itemID, { meta, values }]) => {
          return (
            <div
              className="border flex my-[2px] items-stretch"
              key={`${itemID}`}
            >
              <Tooltip
                content={"Edit Item JS"}
                className="flex items-center px-2 border-r cursor-pointer bg-blue-50 hover:bg-white text-slate-500"
              >
                <div
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
                    await rebuildTree(p, { mode: "update", note: "edit-js" });

                    p.item.active = meta.item.id;
                    if (meta.item.originalId) {
                      p.item.activeOriginalId = meta.item.originalId;
                    }

                    setTimeout(() => {
                      p.script.active = true;
                      p.render();
                    }, 300);
                  }}
                >
                  {meta.item.name}
                </div>
              </Tooltip>
              <div className="px-2 flex space-x-1 py-1 bg-blue-50">
                {Object.entries(values).map(([name, value]) => {
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
            </div>
          );
        })
      )}
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
