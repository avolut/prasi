import { FC } from "react";
import { IText } from "../../../utils/types/text";
import { ERender } from "./e-render";

export const EText: FC<{ item: IText; gid: string }> = ({ item, gid }) => {
  return (
    <ERender item={item} gid={gid}>
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
