import { CEGlobal } from "../../../../base/global/content-editor";
import { IContent, MContent } from "../../../types/general";

export const initElProp = (
  c: typeof CEGlobal & { render: () => void },
  className: string[],
  item: IContent,
  mitem?: MContent
) => {
  if (c.editor.enabled) {
    if (c.editor.active?.get("id") === item.id) {
      className.push("editor-active");
    }

    if (c.editor.hover?.get("id") === item.id) {
      className.push("editor-hover");
    }
  }

  const elementProp = {
    className: cx(className),
    ref: (el: HTMLDivElement | HTMLAnchorElement | null) => {
      if (c.editor.enabled && el) {
        if (c.editor.active && c.editor.active.get("id") === item.id) {
          if (c.editor.active.get("type") === "text") {
            c.editor.activeEl = el.children.item(0) as any;
          } else {
            c.editor.activeEl = el;
          }
        }
      }
    },
  } as any;

  if (c.editor.enabled) {
    elementProp.onPointerEnter = (
      ev: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
      if (item && mitem) {
        ev.stopPropagation();
        ev.preventDefault();

        if (c.editor && ["item", "text"].includes(item.type)) {
          if (
            c.editor.hover?.get("id") !== item.id &&
            !c.editor.focusedTextID
          ) {
            c.editor.hover = mitem;
            c.render();
          }
        }
      }
    };
    elementProp.onPointerLeave = (
      ev: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
      ev.stopPropagation();
      ev.preventDefault();

      if (item && !c.editor.focusedTextID) {
        c.editor.hover = null;
        c.render();
      }
    };
    elementProp.onPointerDown = (
      ev: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
      if (item && mitem) {
        ev.stopPropagation();
        ev.preventDefault();

        c.editor.active = mitem;
        c.render();
      }
    };
  }
  return elementProp;
};
