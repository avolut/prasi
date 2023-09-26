import { FC } from "react";
import { ErrorBox } from "./e-error";
import { EItem } from "./e-item";
import { ERender } from "./e-render";

export const ESection: FC<{ id: string }> = ({ id }) => {
  return (
    <ErrorBox id={id}>
      <ERender id={id}>
        {(childs) =>
          childs.map((e) => {
            return <EItem id={e.id} key={e.id} />;
          })
        }
      </ERender>
    </ErrorBox>
  );
};
