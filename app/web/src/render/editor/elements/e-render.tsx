import { FC, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { FNAdv, FNCompDef } from "../../../utils/types/meta-fn";
import { IText } from "../../../utils/types/text";
import { newPageComp } from "../logic/comp";
import { EditorGlobal } from "../logic/global";
import { ComponentOver, ElProp, createElProp } from "./e-relprop";
import { ETextInternal } from "./e-text";
import { scriptExec } from "./script-exec";

export const ERender: FC<{
  item: IContent;
  children?: (childs: (IItem | IText)[]) => ReactNode;
  instance?: { id: string; cid: string };
}> = ({ item, children, instance }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  const childs = (item.type !== "text" ? item.childs || [] : [])
    .filter((e) => {
      if (typeof e !== "object") return false;
      if (e.hidden === "all") return false;
      return true;
    })
    .map((e) => {
      let meta = p.treeMeta[e.id];

      if (e.type === "item" && e.component?.id && !meta) {
        const mitem = p.comps.doc[e.component.id]
          .getMap("map")
          .get("content_tree");

        const comp = newPageComp(p, e);
        if (comp && mitem) {
          p.treeMeta[e.id] = {
            item: e,
            mitem,
            comp,
          };
          meta = p.treeMeta[e.id];
        }
      }

      if (meta) {
        meta.item = e;
        if (e.type === "item" && e.component?.id) {
          if (!meta.comp) {
            const comp = newPageComp(p, e);
            if (comp) {
              meta.comp = comp;
            }
          }

          if (meta.comp) {
            if (item.nprops) meta.comp.nprops = item.nprops;
            return meta.comp;
          }
        }
      }

      if (item.nprops) {
        e.nprops = item.nprops;
      }
      return e;
    })
    .filter((e) => e);

  let _children = children ? children(childs) : undefined;

  const elprop = createElProp(item, p, instance);
  const className = produceCSS(item, {
    mode: p.mode,
    hover: p.item.sideHover ? false : p.item.hover === item.id,
    active: p.item.sideHover ? false : p.item.active === item.id,
  });
  const adv = item.adv;

  let componentOver = null;
  if (item.type === "item" && item.component?.id) {
    const isCompEdit = p.compEdits.find(
      (e) => e.component?.id === item.component?.id
    );
    if (p.comp && isCompEdit) {
      componentOver = null;
    } else {
      let hasChilds = false;
      const id = (item as IItem).component?.id;
      if (id) {
        const props = p.comps.doc[id]
          .getMap("map")
          .get("content_tree")
          ?.get("component")
          ?.get("props")
          ?.toJSON() as Record<string, FNCompDef>;

        if (props) {
          if (
            Object.values(props).filter(
              (e) => e.meta?.type === "content-element"
            ).length > 0
          ) {
            hasChilds = true;
          }
        }
      }
      if (!hasChilds) {
        componentOver = <ComponentOver item={item} p={p} elprop={elprop} />;
      }
    }
  }

  if (item.hidden) {
    return null;
  }

  if (adv) {
    const html = renderHTML(item.id, className, adv, elprop);

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
              componentOver,
            },
            p.site.api_url
          )}
        </>
      );
    }
  }

  if (item.type === "text") {
    return (
      <ETextInternal
        key={item.id}
        className={className}
        elprop={elprop}
        item={item}
        p={p}
        _children={item.html || item.text}
      />
    );
  }

  return (
    <div className={className} {...elprop}>
      {/* <pre className={"text-[9px] font-mono text-black"}>{item.id}</pre> */}
      {_children}
      {componentOver}
    </div>
  );
};

export const renderHTML = (
  id: string,
  className: string,
  adv: FNAdv,
  elprop: ElProp
) => {
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
