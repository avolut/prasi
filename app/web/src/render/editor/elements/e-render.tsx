import { FC, ReactNode, useCallback } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../utils/css/gen";
import { IContent, MContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { FNAdv } from "../../../utils/types/meta-fn";
import { IText } from "../../../utils/types/text";
import { newPageComp } from "../logic/comp";
import { EditorGlobal } from "../logic/global";
import { ComponentOver, ElProp, createElProp } from "./e-relprop";
import { scriptExec } from "./script-exec";
import { ETextInternal } from "./e-text";

export const ERender: FC<{
  item: IContent;
  children: (childs: (IItem | IText)[]) => ReactNode;
  editComponentId?: string;
}> = ({ item, children, editComponentId }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  const childs = (item.type !== "text" ? item.childs : [])
    .filter((e) => {
      if (e.hidden === "all") return false;
      return true;
    })
    .map((e) => {
      let meta = p.treeMeta[e.id];
      if (meta) {
        meta.item = e;
      }

      if (e.type === "item" && e.component?.id) {
        const mcomp = p.comps.doc[e.component.id];
        if (mcomp) {
          if (!meta) {
            const mitem = mcomp.getMap("map").get("content_tree");
            if (mitem) {
              p.treeMeta[e.id] = {
                mitem: mitem as MContent,
                item,
              };
              meta = p.treeMeta[e.id];
            }
          }

          if (!meta) {
            console.warn(
              `Warning component not found: ${e.component.id} ${e.name}`
            );
          } else {
            if (!meta.comp) {
              const comp = newPageComp(p, e);
              if (comp) {
                if (item.nprops) {
                  comp.nprops = item.nprops;
                }

                meta.comp = comp;
                return comp;
              }
            } else {
              if (item.nprops) {
                meta.comp.nprops = item.nprops;
              }
              return meta.comp;
            }
          }
        } else {
          console.warn(
            `Warning component not found: ${e.component.id} ${e.name}`
          );
        }
      }

      if (item.nprops) {
        e.nprops = item.nprops;
      }
      return e;
    })
    .filter((e) => e);

  let _children = children(childs);

  const elprop = createElProp(item, p, editComponentId);
  const className = produceCSS(item, {
    mode: p.mode,
    hover: p.item.sideHover ? false : p.item.hover === item.id,
    active: p.item.sideHover ? false : p.item.active === item.id,
  });
  const adv = item.adv;

  let componentOver = null;
  if (item.type === "item" && item.component?.id) {
    const compEdit = p.compEdits.find((e) => {
      if (e.id === item.id) return true;
    });
    if (p.comp && compEdit) {
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
          ?.toJSON();

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
        className={className}
        elprop={elprop}
        item={item}
        p={p}
        _children={_children}
      />
    );
  }

  return (
    <div className={className} {...elprop}>
      {_children}
      {componentOver}
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
