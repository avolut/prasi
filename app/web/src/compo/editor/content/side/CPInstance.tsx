import trim from "lodash.trim";
import { FC, useEffect } from "react";
import { useLocal } from "web-utils";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { TypedMap } from "yjs-types";
import { CompDoc } from "../../../../base/global/content-editor";
import { FMCompDef, FNCompDef } from "../../../types/meta-fn";
import { jscript } from "../script/script-edit";
import { AutoHeightTextarea } from "./panel/link";

export const CPInstance: FC<{
  prop: FNCompDef;
  props: TypedMap<Record<string, FMCompDef>>;
  name: string;
  idx: number;
  doc: CompDoc | null;
  render: () => void;
  reload: () => void;
}> = ({ idx, name, prop, render, doc, props }) => {
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
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      className={cx(
        "border-b bg-white hover:bg-orange-50 flex flex-col items-stretch",
        idx === 0 && " -mt-1 "
      )}
    >
      <div className="flex justify-between items-center flex-wrap">
        <div className="pl-2 pr-3">{name}</div>
        <div className="flex items-stretch flex-1">
          {type === "text" && (
            <CPText
              value={prop.value}
              onChange={async (val) => {
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
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const CPText: FC<{ value: string; onChange: (v: string) => void }> = ({
  value,
  onChange,
}) => {
  const local = useLocal({ value: trim(value, '"'), timer: null as any });
  useEffect(() => {
    local.value = trim(value, '"');
    local.render();
  }, [value]);
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
