import { useGlobal } from "web-utils";
import { SPAGlobal } from "../logic/global";

export const SPage = () => {
  const p = useGlobal(SPAGlobal, "SPA");
  return (
    <div
      className={cx(
        "flex flex-col items-stretch flex-1 bg-white justify-between"
      )}
    ></div>
  );
};
