import { FC } from "react";
import { IItem } from "../../../utils/types/item";
import { ISection } from "../../../utils/types/section";
import { ERender } from "./e-render";
import { EItem } from "./e-item";

export const ESection: FC<{ item: ISection }> = ({ item }) => {
  return (
    <ERender item={item}>
      {(childs) =>
        childs.map((e) => {
          return <EItem item={e as IItem} key={e.id} />;
        })
      }
    </ERender>
  );
};
