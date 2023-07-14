import { FC } from "react";
import { getArray } from "../../editor/tools/yjs-tools";
import { MItem } from "../../types/item";
import { MSection } from "../../types/section";
import { MText } from "../../types/text";
import { CEItem } from "./ce-item";
import { CERender } from "./ce-render";

export const CESection: FC<{ ceid: string; item: MSection }> = ({
  ceid,
  item,
}) => {
  return (
    <CERender ceid={ceid} item={item}>
      {getArray<MItem | MText>(item, "childs")?.map((e) => {
        return <CEItem ceid={ceid} item={e} key={e.get("id")} />;
      })}
    </CERender>
  );
};
