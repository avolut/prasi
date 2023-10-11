import { IItem } from "../types/item";
import { ISection } from "../types/section";
import { IText } from "../types/text";
import { cssAdv } from "./advanced";
import { cssBackground } from "./background";
import { cssBorder } from "./border";
import { cssDimension } from "./dimension";
import { cssEditor } from "./editor";
import { cssFont } from "./font";
import { cssLayout } from "./layout";
import { cssPadding } from "./padding";

export const produceCSS = (
  item: ISection | IItem | IText,
  arg: {
    mode: "mobile" | "desktop";
    hover?: boolean;
    active?: boolean;
    editor?: boolean;
  }
): string => {
  try {
    return cx([
      css`
        display: flex;
        position: relative;
        user-select: none;
        ${cssLayout(item, arg.mode)}
        ${cssPadding(item, arg.mode)}
        ${cssDimension(item, arg.mode, arg?.editor)}
        ${cssBorder(item, arg.mode)}
        ${cssBackground(item, arg.mode)}
        ${cssFont(item, arg.mode)}
      `,
      (arg?.hover || arg?.active) &&
        cssEditor({ item, hover: arg?.hover, active: arg?.active }),
      cssAdv(item, arg.mode),
    ]);
  } catch (e) {
    console.log(e);
  }
  return cx([]);
};
