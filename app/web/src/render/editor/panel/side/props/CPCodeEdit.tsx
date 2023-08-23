import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../logic/global";
import { EScriptCustom } from "../../script/script-custom";

export const CPCodeEdit: FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({ item: p.treeMeta[p.item.active].comp });

  const item = local.item;
  if (!item) {
    return <>ERROR: Item is not an instance of component</>;
  }

  return (
    <EScriptCustom
      monaco_id={"comp_prop_value"}
      src={value || ""}
      wrap={(src) => {
        return `${src}`;
      }}
      onChange={(src) => {
        onChange(src);
      }}
      props={{
        ...window.exports,
        ...item.nprops,
      }}
    />
  );
};
