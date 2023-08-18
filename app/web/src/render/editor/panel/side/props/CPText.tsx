import { FC } from "react";
import { useLocal } from "web-utils";
import { AutoHeightTextarea } from "../panel/link";
import { CPCoded } from "./CPCoded";
import { CPArgs } from "./types";

export const CPText: FC<CPArgs> = ({
  name,
  prop,
  onChange,
  editCode,
  reset,
}) => {
  const local = useLocal({ value: "", codeEditing: false });
  const value = prop.value;

  if (prop.value) {
    try {
      eval(`local.value = ${prop.valueBuilt}`);
    } catch (e) {}
  } else {
    local.value = "";
  }

  if (
    local.codeEditing ||
    (typeof local.value === "string" && !local.value.trim().startsWith('"'))
  ) {
    return (
      <CPCoded
        editCode={() => {
          local.codeEditing = true;
          local.render();
          editCode(() => {
            local.codeEditing = false;
            local.render();
          });
        }}
        reset={reset}
      />
    );
  }

  return (
    <>
      <div className="border-l"></div>
      <AutoHeightTextarea
        value={local.value}
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
