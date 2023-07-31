import { FC } from "react";
import { ISection } from "../../../types/section";
import { RRender } from "./r-render";
import { RItem } from "./r-item";
import { IItem } from "../../../types/item";

export const RSection: FC<{ item: ISection, props: any }> = ({ item }) => {
  return (
    <RRender item={item}>
      {(childs) =>
        childs.map((e) => {
          return <RItem item={e as IItem} key={e.id} />;
        })
      }
    </RRender>
  );
};
