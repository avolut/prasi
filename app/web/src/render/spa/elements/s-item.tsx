import { FC } from "react";
import { IItem } from "../../../utils/types/item";
import { SComponent } from "./s-component";
import { SRender } from "./s-render";
import { SText } from "./s-text";

export const SItem: FC<{
  item: IItem;
}> = ({ item }) => {
  const compid = item.component?.id;
  if (compid) {
    return <SComponent item={item} />;
  }

  return (
    <SRender item={item}>
      {(childs) =>
        childs.map((e) => {
          if (e.type === "item") return <SItem item={e} key={e.id} />;
          else return <SText item={e} key={e.id} />;
        })
      }
    </SRender>
  );
};
