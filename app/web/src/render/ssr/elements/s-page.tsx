import { useGlobal } from "web-utils";
import { SSRGlobal } from "../logic/global";
import { SSection } from "./s-section";

export const SPage = () => {
  const p = useGlobal(SSRGlobal, "SSR");

  if (!p.page) return null;
  return (
    <div className={cx("flex flex-col items-stretch flex-1 bg-white")}>
      {p.page.content_tree.childs.map((e) => (
        <SSection key={e.id} item={e} />
      ))}
    </div>
  );
};
