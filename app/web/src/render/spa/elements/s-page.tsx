import { useGlobal } from "web-utils";
import { SPAGlobal } from "../logic/global";
import { SSection } from "./s-section";

export const SPage = () => {
  const p = useGlobal(SPAGlobal, "SPA");

  if (!p.page) return p.ui.loading;
  return (
    <div
      className={cx(
        "flex flex-col items-stretch flex-1 bg-white",
        window.innerWidth > 800 &&
          p.mode === "mobile" &&
          css`
            border-left: 1px solid #fafafa;
            border-right: 1px solid #fafafa;
            max-width: 375px;
            margin: 0px auto;
            top: 0px;
            overflow-x: hidden;
            overflow-y: auto;
            bottom: 0px;
          `
      )}
    >
      {p.page.content_tree.childs.map((e) => (
        <SSection key={e.id} item={e} />
      ))}
    </div>
  );
};
