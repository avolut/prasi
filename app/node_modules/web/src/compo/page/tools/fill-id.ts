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
    for (const child of object.childs) {
      fillID(child, ignoreComponentChilds, modify, depthLimit, {
        currentDepth: _depth,
      });
    }
  }

  return object;
};
