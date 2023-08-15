import { FC, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { FNAdv, FNLinkTag } from "../../../utils/types/meta-fn";
import { IText } from "../../../utils/types/text";
import { newPageComp } from "../logic/comp";
import { scriptExec } from "./script-exec";
import { produceCSS } from "../../../utils/css/gen";
import { responsiveVal } from "../../editor/tools/responsive-val";
import { SSRGlobal } from "../logic/global";

export const SRender: FC<{
  item: IContent;
  children: (childs: (IItem | IText)[]) => ReactNode;
}> = ({ item, children }) => {
  const p = useGlobal(SSRGlobal, "SSR");

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
    else if (adv.jsBuilt && typeof adv.js === "string" && adv.js.trim()) {
      if (
        adv.js.replace(/\s/g, "") !==
        "<div {...props}>{children}</div>".replace(/\s/g, "")
      ) {
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
  }

  const linktag = responsiveVal<FNLinkTag>(item, "linktag", p.mode, {});

  if (linktag && linktag.link) {
    let href = linktag.link || "";

    const props = {
      className: className,
      href: href,
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
