import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../page/css/gen";
import { IContent } from "../../../types/general";
import { RendererGlobal } from "../renderer-global";
import { FNAdv, FNLinkTag } from "../../../types/meta-fn";
import { scriptScope } from "./script-scope";
import { scriptExec } from "./script-exec";
import { IItem } from "../../../types/item";
import { responsiveVal } from "../../../page/tools/responsive-val";

export const RRender: FC<{
  item: IContent;
  original?: IItem;
  children: ReactNode;
}> = ({ item: mitem, children, original }) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");

  let _children = children;

  let item = mitem;
  if (item.hidden === "all") {
    return null;
  }
  if (original) {
    item = { ...mitem, id: original.id };
  }

  const className = produceCSS(item, { mode: rg.mode });
  const adv = item.adv;
  if (adv) {
    const html = renderHTML(adv);
    const scope = scriptScope(original || item, rg);
    if (html) _children = html;
    else if (adv.jsBuilt && adv.js) {
      return scriptExec(
        {
          item,
          scope,
          children: _children,
          rg,
          className,
          render: rg.render,
        },
        rg.site.api_url
      );
    }
  }

  const linktag = responsiveVal<FNLinkTag>(item, "linktag", rg.mode, {});

  if (linktag && linktag.link) {
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
        className={className}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          if (href.startsWith("/")) {
            navigate(href);
          } else {
            location.href = href;
          }
        }}
      >
        {_children}
      </a>
    );
  }

  return <div className={className}>{_children}</div>;
};

export const renderHTML = (adv: FNAdv) => {
  if (adv.html) {
    return (
      <div
        className="flex-1 self-stretch justify-self-stretch p-[2px]"
        dangerouslySetInnerHTML={{ __html: adv.html }}
      ></div>
    );
  }
  return null;
};
