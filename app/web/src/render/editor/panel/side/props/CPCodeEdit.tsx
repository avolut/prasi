import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../logic/global";
import { EScriptCustom } from "../../script/script-custom";
import { newPageComp } from "../../../logic/comp";

export const CPCodeEdit: FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({ comp: p.treeMeta[p.item.active].comp });

  const comp = local.comp;
  if (!comp) {
    const meta = p.treeMeta[p.item.active];

    const comp = newPageComp(p, meta.item as any);
    if (comp) {
      if (comp.nprops) {
        comp.nprops = comp.nprops;
      }

      meta.comp = comp;
      local.comp = comp;
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
      props={{
        ...window.exports,
        ...comp?.nprops,
      }}
    />
  );
};
