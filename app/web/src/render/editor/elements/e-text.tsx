import { FC } from "react";
import { IText } from "../../../utils/types/text";
import { ERender } from "./e-render";

export const EText: FC<{
  item: IText;
  editComponentId?: string;
}> = ({ item, editComponentId }) => {
  return (
    <ERender item={item} editComponentId={editComponentId}>
      {() => item.html || ""}
    </ERender>
  );
};
