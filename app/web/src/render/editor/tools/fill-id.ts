import { createId as cuid } from "@paralleldrive/cuid2";
import { IContent } from "../../../utils/types/general";

export const fillID = (
  object: IContent,
  modify?: (obj: IContent) => boolean,
  currentDepth?: number
) => {
  const _depth = (currentDepth || 0) + 1;

  if (modify) {
    if (modify(object)) {
      object.id = cuid();
    }
  } else {
    object.id = cuid();
  }

  if (
    object.type === "item" &&
    object.component &&
    object.component.id &&
    object.component.props
  ) {
    for (const p of Object.values(object.component.props)) {
      if (p.meta?.type === "content-element" && p.content) {
        fillID(p.content, modify, _depth);
      }
    }
  }

  if (object.type !== "text") {
    if (object.childs && Array.isArray(object.childs)) {
      for (const child of object.childs) {
        fillID(child, modify, _depth);
      }
    }
  }

  return object;
};
