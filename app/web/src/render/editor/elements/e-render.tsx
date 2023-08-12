import { FC, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { FNAdv } from "../../../utils/types/meta-fn";
import { IText } from "../../../utils/types/text";
import { newPageComp } from "../logic/comp";
import { EditorGlobal } from "../logic/global";
import { scriptExec } from "./script-exec";
import { ElProp, createElProp } from "./e-relprop";

export const ERender: FC<{
  item: IContent;
  children: (childs: (IItem | IText)[]) => ReactNode;
}> = ({ item, children }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");

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

  const elprop = createElProp(item, p);
  const className = produceCSS(item, {
    mode: p.mode,
    hover: p.item.hover === item.id,
    active: p.item.active === item.id,
  });
  const adv = item.adv;
  if (adv) {
    const html = renderHTML(className, adv, elprop);

    if (html) return html;
    else if (adv.jsBuilt && adv.js) {
      return (
        <>
          {scriptExec(
            {
              item,
              children: _children,
              p,
              className,
              render: p.render,
              elprop,
            },
            p.site.api_url
          )}
        </>
      );
    }
  }

  if (item.type === "text" && _children)
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: _children }}
        {...elprop}
      />
    );

  return (
    <div className={className} {...elprop}>
      {_children}
    </div>
  );
};

export const renderHTML = (className: string, adv: FNAdv, elprop: ElProp) => {
  if (adv.html) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: adv.html }}
        {...elprop}
      ></div>
    );
  }
  return null;
};
