import { FC, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../page/css/gen";
import { responsiveVal } from "../../../page/tools/responsive-val";
import { IContent } from "../../../types/general";
import { IItem } from "../../../types/item";
import { FNAdv, FNLinkTag } from "../../../types/meta-fn";
import { IText } from "../../../types/text";
import { initScope, instantiateComp } from "../components";
import { RendererGlobal } from "../renderer-global";
import { scriptExec } from "./script-exec";

export const RRender: FC<{
  item: IContent;
  children: (childs: (IItem | IText)[]) => ReactNode;
}> = ({ item, children }) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");

  if (item.type === "section") {
    initScope(rg, item);
  }
  if (item.hidden === "all") {
    return null;
  }

  const childs = (item.type !== "text" ? item.childs : [])
    .filter((e) => {
      if (e.hidden === "all") return false;
      return true;
    })
    .map((e) => {
      if (e.type === "item" && e.component?.id) {
        if (!rg.instances[e.id]) {
          rg.instances[e.id] = instantiateComp(rg, e) as IItem;

          if (rg.instances[e.id]) {
            initScope(rg, rg.instances[e.id], item.id);
          }
        }
        if (rg.instances[e.id]) return rg.instances[e.id];
      } else {
        initScope(rg, e, item.id);
      }

      return e;
    });

  let _children = children(childs);

  const className = produceCSS(item, { mode: rg.mode });
  const adv = item.adv;
  if (adv) {
    const html = renderHTML(adv);

    if (html) _children = html;
    else if (adv.jsBuilt && adv.js) {
      return scriptExec(
        {
          item,
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
