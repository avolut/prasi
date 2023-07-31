import { FC } from "react";
import { IItem } from "../../../types/item";
import { RComponent } from "./r-component";
import { RRender } from "./r-render";
import { RText } from "./r-text";

export const RItem: FC<{
  item: IItem;
}> = ({ item }) => {
  const compid = item.component?.id;
  if (compid) {
    return <RComponent item={item} />;
  }

  return (
    <RRender item={item}>
      {(childs) =>
        childs.map((e) => {
          if (e.type === "item") return <RItem item={e} key={e.id} />;
          else return <RText item={e} key={e.id} />;
        })
      }
    </RRender>
  );
};
