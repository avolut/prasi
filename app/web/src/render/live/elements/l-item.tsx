import { FC } from "react";
import { LRender } from "./l-render";
import { LText } from "./l-text";

export const LItem: FC<{
  id: string;
  fromProp?: boolean;
}> = ({ id, fromProp }) => {
  return (
    <LRender id={id} fromProp={fromProp}>
      {(childs) => {
        return childs.map((e) => {
          if (e.type === "item") {
            return <LItem id={e.id} key={e.id} fromProp={fromProp} />;
          } else {
            return <LText id={e.id} key={e.id} fromProp={fromProp} />;
          }
        });
      }}
    </LRender>
  );
};
