import { useGlobal } from "web-utils";
import { PreviewGlobal } from "../logic/global";
import { PSection } from "./p-section";

export const PPage = () => {
  const p = useGlobal(PreviewGlobal, "PREVIEW");

  if (!p.page) return null;
  return (
    <div
      className={cx(
        "flex flex-col items-stretch flex-1 bg-white",
        window.innerWidth > 800 &&
          p.mode === "mobile" &&
          css`
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
        <PSection key={e.id} item={e} />
      ))}
    </div>
  );
};
