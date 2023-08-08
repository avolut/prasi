import { FC } from "react";
import { IItem } from "../../../utils/types/item";
import { EComponent } from "./e-component";
import { ERender } from "./e-render";
import { EText } from "./e-text";

export const EItem: FC<{
  item: IItem;
}> = ({ item }) => {
  const compid = item.component?.id;
  if (compid) {
    return <EComponent item={item} />;
  }


  return (
    <ERender item={item}>
      {(childs) =>
        childs.map((e) => {
          if (e.type === "item") return <EItem item={e} key={e.id} />;
          else return <EText item={e} key={e.id} />;
        })
      }
    </ERender>
  );
};