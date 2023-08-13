import { FC } from "react";
import { IText } from "../../../utils/types/text";
import { ERender } from "./e-render";

export const EText: FC<{
  item: IText;
  editComponentId?: string;
  editComponentProps?: any;
}> = ({ item, editComponentId, editComponentProps }) => {
  return (
    <ERender
      item={item}
      editComponentId={editComponentId}
      editComponentProps={editComponentProps}
    >
      {() => item.html || ""}
    </ERender>
  );
};
