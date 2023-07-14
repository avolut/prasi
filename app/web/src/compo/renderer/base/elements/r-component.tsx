import { FC } from "react";
import { IItem } from "../../../types/item";
import { RItem } from "./r-item";
import { RRender } from "./r-render";
import { RText } from "./r-text";

export const RComponent: FC<{
  item: IItem;
  comp: { id: string; content_tree: IItem };
}> = ({ item, comp }) => {
  return (
    <RRender item={comp.content_tree} original={item}>
      {comp.content_tree.childs.map((e) => {
        if (e.type === "item") return <RItem item={e} key={e.id} />;
        else return <RText item={e} key={e.id} />;
      })}
    </RRender>
  );
};
