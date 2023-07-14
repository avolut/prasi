import { FC } from "react";
import { IItem } from "../../../types/item";
import { RRender } from "./r-render";
import { RText } from "./r-text";

export const RItem: FC<{ item: IItem }> = ({ item }) => {
  return (
    <RRender item={item}>
      {item.childs.map((e) => {
        if (e.type === "item") return <RItem item={e} key={e.id} />;
        else return <RText item={e} key={e.id} />;
      })}
    </RRender>
  );
};
