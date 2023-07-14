import { FC } from "react";
import { ISection } from "../../../types/section";
import { RRender } from "./r-render";

export const RSection: FC<{ item: ISection }> = ({ item }) => {
  return <RRender item={item}></RRender>;
};
