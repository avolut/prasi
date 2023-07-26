import { createId as cuid } from "@paralleldrive/cuid2";
import { IContent } from "../../types/general";

export const fillID = (object: IContent, currentDepth?: number) => {
  const _depth = (currentDepth || 0) + 1;

  object.id = cuid();

  if (
    object.type === "item" &&
    object.component &&
    object.component.id &&
    object.component.props
  ) {
    for (const p of Object.values(object.component.props)) {
      if (p.meta?.type === "content-element" && p.content) {
        fillID(p.content, _depth);
      }
    }
  }

  if (object.type !== "text") {
    if (object.childs && Array.isArray(object.childs)) {
      for (const child of object.childs) {
        fillID(child, _depth);
      }
    }
  }

  return object;
};
