import { responsiveVal } from "../../render/editor/tools/responsive-val";
import { MetaItem } from "../types/meta";
import { FNFont } from "../types/meta-fn";

export const glbFont = window as unknown as {
  defaultFont: string;
  loadedFonts: string[];
};

export const cssFont = (
  cur: { font?: FNFont; type: MetaItem["type"] },
  mode?: "mobile" | "desktop"
) => {
  const font = responsiveVal<FNFont>(cur, "font", mode, {});

  if (font.family) {
    if (!glbFont.loadedFonts) glbFont.loadedFonts = [];
    const weight = `:wght@${[300, 400, 500, 600].join(";")}`;
    const fontName = font.family.replace(/ /g, "+");

    if (glbFont.loadedFonts.indexOf(font.family) < 0) {
      glbFont.loadedFonts.push(font.family);
      const doc = document;
      const _href = `https://fonts.googleapis.com/css2?family=${fontName}${weight}&display=block`;
      if (!doc.querySelector(`link[href="${_href}]`)) {
        const link = doc.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = _href;
        doc.head.appendChild(link);
      }
    }
  }

  if (!font.family && glbFont.defaultFont) {
    font.family = glbFont.defaultFont;
  }

  return cx(
    font.color &&
      `
        color: ${font.color};
      `,
    `
      word-break: ${
        font.whitespace === "whitespace-normal" ? "break-word" : "normal"
      };
    `,
    font.color &&
      `
        color: ${font.color};
      `,
    `
      text-align: ${font.align ? font.align : "left"};
    `,
    font.size &&
      `
        font-size: ${font.size || 15}px;
      `,
    font.height &&
      `
        line-height: ${font.height === "auto" ? "normal" : `${font.height}%`};
      `,
    font.family &&
      `
        font-family: ${font.family};
      `
  );
};
