import { FC } from "react";
import { IItem } from "../../../utils/types/item";
import { PComponent } from "./p-component";
import { PRender } from "./p-render";
import { PText } from "./p-text";

export const PItem: FC<{
  item: IItem;
}> = ({ item }) => {
  const compid = item.component?.id;
  if (compid) {
    return <PComponent item={item} />;
  }

  return (
    <PRender item={item}>
      {(childs) =>
        childs.map((e) => {
          if (e.type === "item") return <PItem item={e} key={e.id} />;
          else return <PText item={e} key={e.id} />;
        })
      }
    </PRender>
  );
};
