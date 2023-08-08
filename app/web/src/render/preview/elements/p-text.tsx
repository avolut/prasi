import { FC } from "react";
import { IText } from "../../../utils/types/text";
import { PRender } from "./p-render";

export const PText: FC<{ item: IText }> = ({ item }) => {
  return <PRender item={item}>{() => item.html}</PRender>;
};
