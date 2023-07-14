import { FC } from "react";
import { IText } from "../../../types/text";
import { RRender } from "./r-render";

export const RText: FC<{ item: IText }> = ({ item }) => {
  return (
    <RRender item={item}>
      <div
        dangerouslySetInnerHTML={{
          __html: item.html || "",
        }}
        className={cx("outline-none select-text whitespace-nowrap")}
      ></div>
    </RRender>
  );
};
