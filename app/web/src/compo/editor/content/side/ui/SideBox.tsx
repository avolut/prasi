import { FC, ReactNode } from "react";

export const SideBox: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex flex-col pb-2 px-2 space-y-2">{children}</div>;
};
