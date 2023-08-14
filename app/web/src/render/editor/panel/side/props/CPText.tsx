import { FC, useEffect } from "react";
import { CPArgs } from "./types";
import { AutoHeightTextarea } from "../panel/link";
import { useLocal } from "web-utils";
import { Loading } from "../../../../../utils/ui/loading";

export const CPText: FC<CPArgs> = ({ prop, onChange }) => {
  const local = useLocal({ value: "", ready: false });
  const value = prop.value;

  useEffect(() => {
    eval(`local.value = ${prop.value}`);
    local.ready = true;
    local.render();
  }, [value]);

  if (typeof value === "string" && !value.trim().startsWith('"')) {
    return null;
  }

  if (!local.ready) return <Loading backdrop={false} />;

  return (
    <>
      <div className="border-l"></div>
      <AutoHeightTextarea
        value={local.value}
        onChange={async (e) => {
          local.value = e.currentTarget.value;
          local.render();
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
