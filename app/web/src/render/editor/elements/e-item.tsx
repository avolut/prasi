import { FC } from "react";
import { IItem } from "../../../utils/types/item";
import { EComponent } from "./e-component";
import { ERender } from "./e-render";
import { EText } from "./e-text";

export const EItem: FC<{
  item: IItem;
  gid: string;
}> = ({ item, gid }) => {
  const compid = item.component?.id;
  if (compid) {
    return <EComponent item={item} gid={gid} />;
  }

  return (
    <ERender item={item} gid={gid}>
      {(childs) =>
        childs.map((e) => {
          if (e.type === "item") return <EItem gid={gid} item={e} key={e.id} />;
          else return <EText item={e} key={e.id} gid={gid} />;
        })
      }
    </ERender>
  );
};
