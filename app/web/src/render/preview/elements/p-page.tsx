import { useGlobal } from "web-utils";
import { PreviewGlobal } from "../parts/global";
import { PSection } from "./p-section";

export const PPage = () => {
  const p = useGlobal(PreviewGlobal, "PREVIEW");

  if (!p.page) return null;
  return (
    <div className="flex flex-col items-stretch flex-1 bg-white">
      {p.page.content_tree.childs.map((e) => (
        <PSection key={e.id} item={e} />
      ))}
    </div>
  );
};
