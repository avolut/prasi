import { FC } from "react";
import { FNLayout } from "../../../../../utils/types/meta-fn";

export const AlignIcon: FC<{
  dir: FNLayout["dir"];
  pos: "start" | "center" | "end";
  className?: string;
}> = ({ dir, pos, className }) => {
  return (
    <div
      className={cx(
        "flex w-[16px] h-[16px] justify-between",
        `flex-${dir}`,
        `items-${pos}`,
        className
      )}
    >
      <div
        className={cx(
          "bg-blue-500",
          dir.startsWith("col") ? "w-[12px] h-[4px]" : "h-[12px] w-[4px]"
        )}
      ></div>

      <div
        className={cx(
          "bg-blue-500",
          dir.startsWith("col") ? "w-[18px] h-[4px]" : "h-[18px] w-[4px]"
        )}
      ></div>

      <div
        className={cx(
          "bg-blue-500",
          dir.startsWith("col") ? "w-[8px] h-[4px]" : "h-[8px] w-[4px]"
        )}
      ></div>
    </div>
  );
};
