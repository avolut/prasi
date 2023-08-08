import { FC } from "react";
import { IContent } from "../../../../../utils/types/general";

export const ETreeItemName: FC<{ item: IContent; name: string }> = ({
  name,
}) => {
  return (
    <div className="text-sm flex-1 ">
      <>{name}</>
    </div>
  );
};
