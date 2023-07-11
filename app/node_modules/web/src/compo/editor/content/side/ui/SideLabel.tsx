import { FC, ReactNode } from "react";

export const SideLabel: FC<{ children: ReactNode; sep?: "top" | "bottom" }> = ({
  children,
  sep,
}) => {
  return (
    <div
      className={cx(
        sep === "bottom"
          ? "border-b border-b-slate-300 bg-white mb-1"
          : "border-t border-t-slate-300"
      )}
    >
      <div className="text-[10px] select-none text-slate-400 pl-2 py-1">
        {children}
      </div>
    </div>
  );
};
