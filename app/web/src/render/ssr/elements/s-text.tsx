import { FC } from "react";
import { IText } from "../../../utils/types/text";
import { SRender } from "./s-render";

export const SText: FC<{ item: IText }> = ({ item }) => {
  return <SRender item={item}>{() => item.html}</SRender>;
};
