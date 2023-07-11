import { FC, ReactElement } from "react";

export const BoxSep: FC<{
  children: string | ReactElement | (ReactElement | string)[];
  className?: string;
}> = ({ children, className = "border-l" }) => {
  return (
    <div
      className={`box-sep flex items-center p-[3px] space-x-[2px] ${
        className ? className : ""
      } border-slate-100`}
    >
      {children}
    </div>
  );
};
