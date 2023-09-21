import { FC } from "react";
import { ERender } from "./e-render";
import { EText } from "./e-text";

export const EItem: FC<{
  id: string;
  fromProp?: boolean;
}> = ({ id, fromProp }) => {
  return (
    <ERender id={id} fromProp={fromProp}>
      {(childs) => {
        return childs.map((e) => {
          if (e.type === "item") {
            return <EItem id={e.id} key={e.id} fromProp={fromProp} />;
          } else {
            return <EText id={e.id} key={e.id} fromProp={fromProp} />;
          }
        });
      }}
    </ERender>
  );
};
