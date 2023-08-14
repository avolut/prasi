import { FC, useEffect } from "react";
import { CPArgs } from "./types";
import { AutoHeightTextarea } from "../panel/link";
import { useLocal } from "web-utils";
import { Loading } from "../../../../../utils/ui/loading";
import { CPCoded } from "./CPCoded";

export const CPText: FC<CPArgs> = ({ prop, onChange, editCode, reset }) => {
  const local = useLocal({ value: "", ready: false });
  const value = prop.value;

  useEffect(() => {
    try {
      eval(`local.value = ${prop.value}`);
    } catch (e) {}
    local.ready = true;
    local.render();
  }, [value, local.ready]);

  if (typeof value === "string" && !value.trim().startsWith('"')) {
    return <CPCoded editCode={editCode} reset={reset} />;
  }

  if (!local.ready)
    return (
      <div className="min-h-[30px] flex relative items-center justify-center flex-1">
        <Loading backdrop={false} />
      </div>
    );

  return (
    <>
      <div className="border-l"></div>
      <AutoHeightTextarea
        defaultValue={local.value}
        onChange={async (e) => {
          local.value = e.currentTarget.value;
          onChange(`"${local.value}"`);
        }}
        onContextMenu={(e) => {
          e.stopPropagation();
        }}
        className="flex-1 p-1 font-mono border-2 border-transparent outline-none bg-transparent focus:bg-white focus:border-blue-500 border-slate-300 text-[11px]"
        spellCheck={false}
      />
    </>
  );
};
