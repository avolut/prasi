import { FC } from "react";
import { IText } from "../../../utils/types/text";
import { ERender } from "./e-render";

export const EText: FC<{ item: IText; }> = ({ item }) => {
  return (
    <ERender item={item} >
      {() => (
        <div
          className="w-full"
          dangerouslySetInnerHTML={{
            __html: item.html || "",
          }}
        ></div>
      )}
    </ERender>
  );
};
