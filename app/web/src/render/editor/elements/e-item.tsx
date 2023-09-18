import { FC } from "react";
import { ERender } from "./e-render";
import { EText } from "./e-text";

export const EItem: FC<{
  id: string;
}> = ({ id }) => {
  return (
    <ERender id={id}>
      {(childs) => {
        return childs.map((e) => {
          if (e.type === "item") {
            return <EItem id={e.id} key={e.id} />;
          } else {
            return <EText id={e.id} key={e.id} />;
          }
        });
      }}
    </ERender>
  );
};
