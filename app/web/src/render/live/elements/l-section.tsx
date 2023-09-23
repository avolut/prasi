import { FC } from "react";
import { LItem } from "./l-item";
import { LRender } from "./l-render";

export const LSection: FC<{ id: string }> = ({ id }) => {
  return (
    <LRender id={id}>
      {(childs) =>
        childs.map((e) => {
          return <LItem id={e.id} key={e.id} />;
        })
      }
    </LRender>
  );
};
