import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../types/item";
import { RItem } from "./r-item";
import { RRender } from "./r-render";
import { RText } from "./r-text";
import { RendererGlobal } from "../renderer-global";
import { fillID } from "../../../page/tools/fill-id";

export const RComponent: FC<{
  item: IItem;
  comp: { id: string; content_tree: IItem };
}> = ({ item, comp }) => {
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

    const cjson = fillID(comp.content_tree) as IItem;
    const nitem = {
      ...cjson,
      id: item.id,
      component: {
        id: cjson.component?.id || "",
        name: cjson.component?.name || "",
        props: {
          ...cjson.component?.props,
          ...item.component?.props,
        },
      },
    };
    for (const [k, v] of Object.entries(nitem)) {
      (item as any)[k] = v;
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
