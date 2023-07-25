import { useLocal } from "web-utils";
import { IContent } from "../../types/general";
import { RItem } from "../../renderer/base/elements/r-item";
import { RText } from "../../renderer/base/elements/r-text";

export const createPassChild =
  (arg: { item: IContent }) =>
  ({ name }: { name: string }) => {
    const local = useLocal({ child: null as any });
    if (!local.child) {
      if (arg.item.type !== "text") {
        for (const child of arg.item.childs) {
          if (child.name === name) {
            local.child = child;
          }
        }
      }
    }
    if (local.child) {
      if (local.child.type === "item")
        return <RItem item={{ ...local.child, hidden: false }} />;
      else if (local.child.type === "text")
        return <RText item={{ ...local.child, hidden: false }} />;
    }
  };
