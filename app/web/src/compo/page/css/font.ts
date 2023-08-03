import { MetaItem } from "../../types/meta";
import { FNFont } from "../../types/meta-fn";
import { responsiveVal } from "../tools/responsive-val";

export const glbFont = (!isSSR ? window : {}) as {
  defaultFont: string;
  loadedFonts: string[];
};

export const cssFont = (
  cur: { font?: FNFont; type: MetaItem["type"] },
  mode?: "mobile" | "desktop"
) => {
  const font = responsiveVal<FNFont>(cur, "font", mode, {});

  if (!isSSR && font.family) {
    if (!glbFont.loadedFonts) glbFont.loadedFonts = [];
    if (!isSSR && glbFont.loadedFonts.indexOf(font.family) < 0) {
      glbFont.loadedFonts.push(font.family);
      const doc = document;
      let weight = `:wght@${[300, 400, 500, 600].join(";")}`;
      let fontName = font.family.replace(/ /g, "+");
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
    "break-words",
    font.whitespace && font.whitespace,
    css`
      text-align: ${font.align ? font.align : "left"};
    `,
    font.size &&
      css`
        font-size: ${font.size}px;
      `,
    font.height &&
      css`
        line-height: ${font.height === "auto" ? "normal" : `${font.height}%`};
      `,
    font.family &&
      css`
        font-family: ${font.family};
      `
  );
};
