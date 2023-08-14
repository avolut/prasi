import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../logic/global";
import { FC } from "react";
import { MItem } from "../../../../../utils/types/item";
import { FNCompDef } from "../../../../../utils/types/meta-fn";

export const CPInstance: FC<{ mitem: MItem }> = ({ mitem }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  const props = mitem.get("component")?.get("props")?.toJSON() as Record<
    string,
    FNCompDef
  >;

  return (
    <div className="flex flex-col">
      {Object.entries(props)
        .sort((a, b) => {
          return a[1].idx - b[1].idx;
        })
        .map(([k, v]) => {
          return <SingleProp key={k} name={k} prop={v} />;
        })}
    </div>
  );
};

const SingleProp: FC<{ name: string; prop: FNCompDef }> = ({ name, prop }) => {
  const local = useLocal({});
  return (
    <div>
      {prop.idx}
      {name}
    </div>
  );
};
