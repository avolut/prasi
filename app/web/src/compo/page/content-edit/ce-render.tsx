import { FC, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { CEGlobal } from "../../../base/global/content-editor";
import { renderHTML } from "../../editor/tools/render-html";
import { wsdoc } from "../../editor/ws/wsdoc";
import { IContent } from "../../types/general";
import { MItem } from "../../types/item";
import { FNLinkTag } from "../../types/meta-fn";
import { MSection } from "../../types/section";
import { MText } from "../../types/text";
import { produceCSS } from "../css/gen";
import { execElement } from "../scripting/exec-element";
import { responsiveVal } from "../tools/responsive-val";
import { initElProp } from "./render-tools/init-elprop";
import { findScope, initScope } from "./render-tools/init-scope";

export const CERender: FC<{
  ceid: string;
  children: ReactNode;
  item: MItem | MText | MSection;
}> = ({ ceid, children, item: mitem }) => {
  const c = useGlobal(CEGlobal, ceid);

  const item = mitem.toJSON() as IContent;

  let _children = children;
  const className = [produceCSS(item, { mode: wsdoc.mode })];
  const adv = item.adv;
  const elementProp = initElProp(c, className, item, mitem);
  const scope = initScope(ceid, item, mitem, c);

  if (item.name === "New Player") {
    console.log(item.id, findScope(c.scope, item.id || "").c);
  }

  if (adv) {
    const html = renderHTML(adv);
    if (html) _children = html;
    else if (adv.jsBuilt && adv.js) {
      const res = execElement(
        {
          item,
          scope,
          children: _children,
          className,
          elementProp,
          render: c.render,
        },
        c.global.api_url
      );

      return res;
    }
  }

  if (!c.editor.enabled) {
    const linktag = responsiveVal<FNLinkTag>(item, "linktag", wsdoc.mode, {});
    if (linktag && linktag.link) {
      if (elementProp.className.indexOf("cursor-pointer") < 0) {
        elementProp.className += " cursor-pointer";
      }
      let href = linktag.link || "";
      if (href.startsWith("/")) {
        if (
          location.pathname.startsWith("/site/") &&
          ["localhost", "127.0.0.1", "prasi.app"].includes(location.hostname)
        ) {
          const parts = location.pathname.split("/");
          if (parts.length >= 3) {
            href = `/${parts[1]}/${parts[2]}${href}`;
          }
        }
      }
      return (
        <a
          {...elementProp}
          href={href}
          onClick={(e) => {
            e.preventDefault();
            if ((elementProp as any).onClick) {
              (elementProp as any).onClick(e);
              return;
            } else {
              if (href.startsWith("/")) {
                navigate(href);
              } else {
                location.href = href;
              }
            }
          }}
        >
          {children}
        </a>
      );
    }
  }

  return <div {...elementProp}>{_children}</div>;
};
