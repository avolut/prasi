import { FC } from "react";
import { IItem } from "../../../types/item";
import { RRender } from "./r-render";
import { RText } from "./r-text";
import { useGlobal } from "web-utils";
import { RendererGlobal } from "../renderer-global";
import { RComponent } from "./r-component";

export const RItem: FC<{ item: IItem }> = ({ item }) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");

  const compid = item.component?.id;
  if (compid) {
    const comp = rg.component.def[compid];
    if (comp) {
      return <RComponent item={item} comp={comp} />;
    }
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
