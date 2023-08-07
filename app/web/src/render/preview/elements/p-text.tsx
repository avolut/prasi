import { FC } from "react";
import { IText } from "../../../compo/types/text";
import { PRender } from "./p-render";

export const PText: FC<{ item: IText }> = ({ item }) => {
  return (
    <PRender item={item}>
      {() => (
        <div
          className="w-full"
          dangerouslySetInnerHTML={{
            __html: item.html || "",
          }}
        ></div>
      )}
    </PRender>
  );
};
