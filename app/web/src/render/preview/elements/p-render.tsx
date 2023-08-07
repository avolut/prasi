import { FC, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../compo/page/css/gen";
import { responsiveVal } from "../../../compo/page/tools/responsive-val";
import { IContent } from "../../../compo/types/general";
import { IItem } from "../../../compo/types/item";
import { FNAdv, FNLinkTag } from "../../../compo/types/meta-fn";
import { IText } from "../../../compo/types/text";
import { newPageComp } from "../logic/comp";
import { PreviewGlobal } from "../logic/global";
import { extractNavigate, preload } from "../logic/route";
import { scriptExec } from "./script-exec";

const navExtracted = new Set<string>();

export const PRender: FC<{
  item: IContent;
  children: (childs: (IItem | IText)[]) => ReactNode;
}> = ({ item, children }) => {
  const p = useGlobal(PreviewGlobal, "PREVIEW");

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
        if (!p.pageComp[e.id]) {
          const comp = newPageComp(p, e);
          if (comp) p.pageComp[e.id] = comp;
        }

        if (p.pageComp[e.id]) {
          if (item.nprops) {
            p.pageComp[e.id].nprops = item.nprops;
          }

          return p.pageComp[e.id];
        }
      }

      if (item.nprops) {
        e.nprops = item.nprops;
      }
      return e;
    });

  let _children = children(childs);

  const className = produceCSS(item, { mode: p.mode });
  const adv = item.adv;
  if (adv) {
    const html = renderHTML(adv);

    if (html) _children = html;
    else if (adv.jsBuilt && adv.js) {
      if (!navExtracted.has(item.id)) {
        navExtracted.add(item.id);
        const navs = extractNavigate(adv.js);
        navs.forEach((n) => {
          preload(p, n);
        });
      }

      return (
        <>
          {scriptExec(
            {
              item,
              children: _children,
              p,
              className,
              render: p.render,
            },
            p.site.api_url
          )}
        </>
      );
    }
  }

  const linktag = responsiveVal<FNLinkTag>(item, "linktag", p.mode, {});

  if (linktag && linktag.link) {
    let href = linktag.link || "";
    if (href.startsWith("/")) {
      preload(p, href);
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
