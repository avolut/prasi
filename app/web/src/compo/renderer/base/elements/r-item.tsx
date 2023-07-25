import { FC } from "react";
import { useGlobal } from "web-utils";
import { IItem } from "../../../types/item";
import { RendererGlobal } from "../renderer-global";
import { RComponent } from "./r-component";
import { RRender } from "./r-render";
import { RText } from "./r-text";

export const RItem: FC<{ item: IItem; parentInstanceId?: string }> = ({
  item,
  parentInstanceId,
}) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");

  const compid = item.component?.id;
  if (compid) {
    const comp = rg.component.def[compid];
    if (comp) {
      return <RComponent item={item} comp={comp} />;
    }
  }

  return (
    <RRender item={item} parentInstanceId={parentInstanceId}>
      {item.childs.map((e) => {
        if (e.type === "item") return <RItem item={e} key={e.id} />;
        else return <RText item={e} key={e.id} />;
      })}
    </RRender>
  );
};
