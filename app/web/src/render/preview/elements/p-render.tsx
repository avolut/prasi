import { FC, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { FNAdv, FNLinkTag } from "../../../utils/types/meta-fn";
import { IText } from "../../../utils/types/text";
import { newPageComp } from "../logic/comp";
import { PreviewGlobal } from "../logic/global";
import { extractNavigate, preload } from "../logic/route";
import { scriptExec } from "./script-exec";
import { produceCSS } from "../../../utils/css/gen";
import { responsiveVal } from "../../editor/tools/responsive-val";

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
    const html = renderHTML(className, adv);

    if (html) return html;
    else if (adv.jsBuilt && adv.js) {
      if (!navExtracted.has(item.id)) {
        navExtracted.add(item.id);
        const navs = extractNavigate(adv.js as string);
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

  const isComponent = item.type === "item" && item.component?.id;

  if (linktag && linktag.link && !isComponent) {
    let href = linktag.link || "";
    if (href.startsWith("/")) {
      preload(p, href);
      if (
        (location.pathname.startsWith("/preview/") ||
          location.pathname.startsWith("/site/")) &&
        ["localhost", "127.0.0.1", "prasi.app"].includes(location.hostname)
      ) {
        const parts = location.pathname.split("/");
        if (parts.length >= 3) {
          href = `/${parts[1]}/${parts[2]}${href}`;
        }
      }
    }

    const props = {
      className: className,
      href: href,
      onClick: (e: any) => {
        e.preventDefault();
        if (href.startsWith("/")) {
          navigate(href);
        } else {
          location.href = href;
        }
      },
    };

    if (item.type === "text" && _children) {
      return <a {...props} dangerouslySetInnerHTML={{ __html: _children }} />;
    }
    return <a {...props}>{_children}</a>;
  }

  if (item.type === "text" && _children)
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: _children }}
      />
    );

  return <div className={className}>{_children}</div>;
};

export const renderHTML = (className: string, adv: FNAdv) => {
  if (adv.html) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: adv.html }}
      ></div>
    );
  }
  return null;
};
