import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../logic/global";
import { EScriptCustom } from "../../script/script-custom";
import { mergeScopeUpwards } from "../../../logic/tree-scope";

export const CPCodeEdit: FC<{
  value: string;
  onChange: (v: string) => void;
  args?: any;
}> = ({ value, onChange, args }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const meta = p.treeMeta[p.item.active];

  const scope = mergeScopeUpwards(p, meta);
  const props: any = {
    ...window.exports,
    ...scope,
    ...args,
  };
  for (const [k, v] of Object.entries(props)) {
    const item = v as any;
    if (item && item._jsx && typeof item.Comp === "function") {
      props[k] = item.Comp;
    }
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
      props={props}
    />
  );
};
