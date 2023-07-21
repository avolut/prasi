import { FC } from "react";
import { getArray } from "../../editor/tools/yjs-tools";
import { MItem } from "../../types/item";
import { MText } from "../../types/text";
import { component as gcomp } from "../component";
import { CEComponent } from "./ce-component";
import { CERender } from "./ce-render";
import { CEText } from "./ce-text";

export const CEItem: FC<{
  ceid: string;
  item: MItem;
  preventRenderComponent?: boolean;
  parentCompIds?: string[];
}> = ({ ceid, item, preventRenderComponent, parentCompIds }) => {
  if (!preventRenderComponent) {
    const comp = item.get("component");
    if (comp) {
      const compid = comp.get("id");
      if (compid) {
        const doc = gcomp.docs[compid];
        if (doc) {
          const mitem = doc.getMap("map").get("content_tree");

          if (mitem) {
            return (
              <CEComponent
                ceid={ceid}
                item={item}
                compItem={mitem}
                parentCompIds={parentCompIds || []}
              />
            );
          }
        } 
      }
    }
  }

  return (
    <CERender ceid={ceid} item={item}>
      {getArray<MItem | MText>(item, "childs")?.map((e: MItem | MText, idx) => {
        const type = e.get("type");
        if (type === "item") {
          return (
            <CEItem
              ceid={ceid}
              item={e as MItem}
              key={e.get("id")}
              parentCompIds={parentCompIds}
            />
          );
        } else if (type === "text") {
          return <CEText ceid={ceid} item={e as MText} key={e.get("id")} />;
        }
      })}
    </CERender>
  );
};
