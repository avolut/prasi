import { FC } from "react";
import { IItem } from "../../../utils/types/item";
import { ISection } from "../../../utils/types/section";
import { ERender } from "./e-render";
import { EItem } from "./e-item";

export const ESection: FC<{ item: ISection; gid: string }> = ({
  item,
  gid,
}) => {
  return (
    <ERender item={item} gid={gid}>
      {(childs) =>
        childs.map((e) => {
          return <EItem item={e as IItem} key={e.id} gid={gid} />;
        })
      }
    </ERender>
  );
};
