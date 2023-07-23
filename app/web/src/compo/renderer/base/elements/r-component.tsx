import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../types/item";
import { RItem } from "./r-item";
import { RRender } from "./r-render";
import { RText } from "./r-text";
import { RendererGlobal } from "../renderer-global";

export const RComponent: FC<{
  item: IItem;
  comp: { id: string; content_tree: IItem };
}> = ({ item }) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");
  const local = useLocal({ instanced: false });

  if (!local.instanced) {
    const scope = rg.scope;
    for (const child of item.childs) {
      scope.tree[child.id] = {
        childs: new Set(),
        // name: item.name,
        // type: item.type,
        // lv: 0,
        parent_id: item.id,
      };
    }
    local.instanced = true;
  }

  return (
    <RRender item={item}>
      {item.childs.map((e) => {
        if (e.type === "item") return <RItem item={e} key={e.id} />;
        else return <RText item={e} key={e.id} />;
      })}
    </RRender>
  );
};
