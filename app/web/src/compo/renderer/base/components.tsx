import { IContent } from "../../types/general";
import { IRoot } from "../../types/root";

export const scanComponent = (
  item: IRoot | IContent,
  componentIDS?: Set<string>
) => {
  const ids = componentIDS || new Set();

  if (item.type === "item" && item.component?.id) {
    ids.add(item.component.id);
  }

  if (item.type !== "text") {
    for (const c of item.childs) {
      scanComponent(c, ids);
    }
  }
  return ids;
};
