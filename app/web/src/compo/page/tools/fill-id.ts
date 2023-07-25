import { createId as cuid } from "@paralleldrive/cuid2";
import { IContent } from "../../types/general";

export const fillID = (
  object: IContent,
  ignoreComponentChilds?: boolean,
  modify?: (content: IContent) => void,
  depthLimit?: number,
  arg?: {
    currentDepth?: number;
  }
) => {
  const _depth = (arg?.currentDepth || 0) + 1;

  if (modify) {
    modify(object);
  }

  object.id = cuid();
  if (object.type !== "text") {
    if (object.childs && Array.isArray(object.childs)) {
      for (const child of object.childs) {
        if (
          !ignoreComponentChilds ||
          (ignoreComponentChilds &&
            !(child.type === "item" && child.component?.id))
        ) {
          fillID(child, ignoreComponentChilds, modify, depthLimit, {
            currentDepth: _depth,
          });
        }
      }
    }
  }

  return object;
};
