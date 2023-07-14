import { IContent } from "../../types/general";
import { IItem } from "../../types/item";
import { ISection } from "../../types/section";
import { IText } from "../../types/text";
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
    hover?: IContent | null;
    active?: IContent | null;
    editor?: boolean;
  }
): string => {
  let className = item.linktag?.class;
  if (arg.mode === "mobile" && item.mobile?.linktag?.class) {
    className = item.mobile?.linktag?.class;
  }

  return cx([
    "flex relative",
    className?.trim(),
    cssLayout(item, arg.mode),
    cssPadding(item, arg.mode),
    cssDimension(item, arg.mode, arg?.editor),
    cssBorder(item, arg.mode),
    cssBackground(item, arg.mode),
    cssFont(item, arg.mode),
    (arg?.hover || arg?.active) &&
      cssEditor({ item, hover: arg?.hover, active: arg?.active }),
    cssAdv(item, arg.mode),
  ]);
};
