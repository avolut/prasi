import { FC } from "react";
import { IText } from "../../../utils/types/text";
import { ERender } from "./e-render";

export const EText: FC<{ item: IText }> = ({ item }) => {
  return <ERender item={item}>{() => item.html}</ERender>;
};
