import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal, ItemMeta } from "../../../logic/global";
import { mergeScopeUpwards } from "../../../logic/tree-scope";
import { Popover } from "../../../../../utils/ui/popover";
import { isValidElement } from "react";
import { createElProp } from "../../../elements/e-relprop";
import { editComp } from "../../../logic/comp";

export const MonacoScopeBar = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal(
    {
      vars: {} as Record<string, { meta: ItemMeta; value: any }>,
    },
    () => {
      const meta = p.treeMeta[p.item.active];
      local.vars = {};
      mergeScopeUpwards(p, meta, (m, vars) => {
        for (const [k, v] of Object.entries(vars)) {
          local.vars[k] = {
            value: v,
            meta: m,
          };
        }
      });
      local.render();
    }
  );

  return (
    <div className="flex border-t p-2 min-h-[30px] text-xs space-x-2 ">
      <div>Available vars:</div>
      {Object.entries(local.vars).map(([name, { meta, value }]) => {
        if (meta === p.treeMeta[p.item.active]) return;
        return (
          <Popover
            backdrop={false}
            key={`${name}_${meta.item.id}`}
            popoverClassName="p-0 m-0 bg-white border select-none text-xs"
            content={
              <div className="flex flex-col ">
                <div
                  className="p-1 border-b cursor-pointer hover:bg-blue-200 space-x-1 flex justify-between"
                  onClick={(e) => {
                    p.script.active = false;
                    p.render();
                    if (meta.comp) {
                      editComp(p, meta.item.id);
                    }

                    const ep = createElProp(meta.item, p);
                    if (ep) {
                      ep.onPointerDown(e as any);
                      setTimeout(() => {
                        p.script.active = true;
                        p.render();
                      }, 200);
                    }
                  }}
                >
                  <span>Declared at: </span>
                  <div className="flex space-x-1">
                    <span>{meta.item.name}</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 13C12.5523 13 13 12.5523 13 12V3C13 2.44771 12.5523 2 12 2H3C2.44771 2 2 2.44771 2 3V6.5C2 6.77614 2.22386 7 2.5 7C2.77614 7 3 6.77614 3 6.5V3H12V12H8.5C8.22386 12 8 12.2239 8 12.5C8 12.7761 8.22386 13 8.5 13H12ZM9 6.5C9 6.5001 9 6.50021 9 6.50031V6.50035V9.5C9 9.77614 8.77614 10 8.5 10C8.22386 10 8 9.77614 8 9.5V7.70711L2.85355 12.8536C2.65829 13.0488 2.34171 13.0488 2.14645 12.8536C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L7.29289 7H5.5C5.22386 7 5 6.77614 5 6.5C5 6.22386 5.22386 6 5.5 6H8.5C8.56779 6 8.63244 6.01349 8.69139 6.03794C8.74949 6.06198 8.80398 6.09744 8.85143 6.14433C8.94251 6.23434 8.9992 6.35909 8.99999 6.49708L8.99999 6.49738"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="p-1 text-[11px] border-b font-mono">
                  Type: {typeof value}
                </div>
                <div className="p-1 text-[11px] font-mono">
                  <div className="pb-1">Value:</div>
                  {JSON.stringify(value, safeCycles())}
                </div>
              </div>
            }
            placement="top"
          >
            <div className="px-2 border rounded cursor-pointer hover:bg-blue-200 hover:border-blue-200">
              {name}
            </div>
          </Popover>
        );
      })}
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
