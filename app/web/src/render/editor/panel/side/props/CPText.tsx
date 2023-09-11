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

  if (prop.value) {
    try {
      eval(`local.value = ${prop.valueBuilt}`);
    } catch (e) {}
  } else {
    local.value = "";
  }

  if (
    local.codeEditing ||
    typeof local.value !== "string" ||
    (typeof prop.valueBuilt === "string" &&
      !prop.valueBuilt.trim().startsWith('"'))
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
        className="flex-1 self-stretch font-mono border-2 border-transparent outline-none bg-transparent focus:bg-white focus:border-blue-500 border-slate-300 text-[10px] min-h-[25px] pt-[3px] pl-[3px]"
        spellCheck={false}
      />
    </>
  );
};
