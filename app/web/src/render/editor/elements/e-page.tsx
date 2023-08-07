import { useGlobal } from "web-utils";
import { EditorGlobal } from "../logic/global";
import { ESection } from "./e-section";

export const EPage = ({ gid }: { gid: string }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  if (!p.page) return null;
  return (
    <div className="flex flex-col items-stretch flex-1 bg-white">
      {p.page.content_tree.childs.map((e) => (
        <ESection key={e.id} item={e} gid={gid} />
      ))}
    </div>
  );
};
