import { FC } from "react";
import { ISection } from "../../../types/section";
import { RRender } from "./r-render";
import { RItem } from "./r-item";

export const RSection: FC<{ item: ISection }> = ({ item }) => {
  return (
    <RRender item={item}>
      {item.childs.map((e) => {
        return <RItem item={e} key={e.id} />;
      })}
    </RRender>
  );
};
