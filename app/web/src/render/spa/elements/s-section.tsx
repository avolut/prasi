import { FC } from "react";
import { ISection } from "../../../utils/types/section";
import { SRender } from "./s-render";
import { SItem } from "./s-item";
import { IItem } from "../../../utils/types/item";

export const SSection: FC<{ item: ISection }> = ({ item }) => {
  return (
    <SRender item={item}>
      {(childs) =>
        childs.map((e) => {
          return <SItem item={e as IItem} key={e.id} />;
        })
      }
    </SRender>
  );
};
