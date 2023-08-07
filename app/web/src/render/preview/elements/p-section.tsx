import { FC } from "react";
import { ISection } from "../../../compo/types/section";
import { PRender } from "./p-render";
import { PItem } from "./p-item";
import { IItem } from "../../../compo/types/item";

export const PSection: FC<{ item: ISection }> = ({ item }) => {
  return (
    <PRender item={item}>
      {(childs) =>
        childs.map((e) => {
          return <PItem item={e as IItem} key={e.id} />;
        })
      }
    </PRender>
  );
};
