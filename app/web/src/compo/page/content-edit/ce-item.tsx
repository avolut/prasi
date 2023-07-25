import { FC } from "react";
import { getArray } from "../../editor/tools/yjs-tools";
import { MItem } from "../../types/item";
import { MText } from "../../types/text";
import { component as gcomp } from "../component";
import { CEComponent } from "./ce-component";
import { CERender } from "./ce-render";
import { CEText } from "./ce-text";
import {
  componentShouldLoad,
  instantiateComp,
  loadComponents,
} from "../../editor/comp/load-comp";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../../base/global/content-editor";

export const CEItem: FC<{
  ceid: string;
  item: MItem;
  preventRenderComponent?: boolean;
  parentInstanceId?: string;
}> = ({ ceid, item, preventRenderComponent, parentInstanceId }) => {
  const c = useGlobal(CEGlobal, ceid);

  if (!preventRenderComponent) {
    const comp = item.get("component");
    if (comp) {
      const compid = comp.get("id");
      if (compid) {
        const doc = gcomp.docs[compid];
        if (doc) {
          const mitem = doc.getMap("map").get("content_tree");

          if (mitem) {
            return <CEComponent ceid={ceid} item={item} compItem={mitem} />;
          }
        }
      }
    }
  }

  if (parentInstanceId) {
    const local = useLocal({ loading: false });
    if (!local.loading && componentShouldLoad(c, item)) {
      local.loading = true;
      loadComponents(item).then((items) => {
        for (const item of items) {
          instantiateComp(c, item);
        }
        local.loading = false;
        local.render();
      });
    }
  }

  return (
    <CERender ceid={ceid} item={item} parentInstanceId={parentInstanceId}>
      {getArray<MItem | MText>(item, "childs")?.map((e: MItem | MText, idx) => {
        const type = e.get("type");
        if (type === "item") {
          return <CEItem ceid={ceid} item={e as MItem} key={e.get("id")} />;
        } else if (type === "text") {
          return <CEText ceid={ceid} item={e as MText} key={e.get("id")} />;
        }
      })}
    </CERender>
  );
};
