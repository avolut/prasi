import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../logic/global";
import { EScriptCustom } from "../../script/script-custom";

export const CPCodeEdit: FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  const local = useLocal({ value, timer: null as any });
  const c = useGlobal(EditorGlobal);

  return (
    <EScriptCustom
      monaco_id={"comp_prop_value"}
      src={value || ""}
      wrap={(src) => {
        return `${src}`;
      }}
      onLoad={(editor, monaco) => {}}
      onChange={(src) => {
        onChange(src);
      }}
    />
  );
};
