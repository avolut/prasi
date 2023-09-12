import { useGlobal } from "web-utils";
import { SPAGlobal } from "../logic/global";
import { SSection } from "./s-section";

export const SPage = () => {
  const p = useGlobal(SPAGlobal, "SPA");

  if (!p.page) return p.ui.loading;
  return (
    <div
      className={cx(
        "flex flex-col items-stretch flex-1 bg-white justify-between"
      )}
    >
      {p.page.content_tree.childs.map((e) => (
        <SSection key={e.id} item={e} />
      ))}
    </div>
  );
};
