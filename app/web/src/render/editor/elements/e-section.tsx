import { FC } from "react";
import { useGlobal } from "web-utils";
import { EditorGlobal } from "../logic/global";
import { EItem } from "./e-item";
import { ERender } from "./e-render";

export const ESection: FC<{ id: string }> = ({ id }) => {
  return (
    <ERender id={id}>
      {(childs) =>
        childs.map((e) => {
          return <EItem id={e.id} key={e.id} />;
        })
      }
    </ERender>
  );
};
