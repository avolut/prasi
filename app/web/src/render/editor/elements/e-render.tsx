import { FC, ReactNode } from "react";
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

export const ERender: FC<{
  item: IContent;
  children: (childs: (IItem | IText)[]) => ReactNode;
  editComponentId?: string;
  editComponentProps?: any;
}> = ({ item, children, editComponentId, editComponentProps }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  if (item.hidden) {
    return null;
  }

  const childs = (item.type !== "text" ? item.childs : [])
    .filter((e) => {
      if (e.hidden === "all") return false;
      return true;
    })
    .map((e) => {
      if (e.type === "item" && e.component?.id) {
        let meta = p.treeMeta[e.id];

        const mcomp = p.comps.doc[e.component.id];
        if (mcomp) {
          if (!meta) {
            const mitem = mcomp.getMap("map").get("content_tree");
            if (mitem) {
              p.treeMeta[e.id] = {
                item: mitem as MContent,
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
    hover: p.item.hover === item.id,
    active: p.item.active === item.id,
  });
  const adv = item.adv;

  let componentOver = null;
  if (item.type === "item" && item.component?.id) {
    if (
      p.comp &&
      p.compEdits.find((e) => {
        if (e.component?.id === item.component?.id) return true;
      })
    ) {
      componentOver = null;
    } else {
      componentOver = <ComponentOver item={item} p={p} />;
    }
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
              editComponentProps,
            },
            p.site.api_url
          )}
        </>
      );
    }
  }

  if (item.type === "text") {
    return (
      <div
        className={cx(
          className,
          css`
            user-select: all;
            outline: none;
            min-width: 3px !important;
            min-height: 10px !important;
          `
        )}
        ref={(e) => {
          setTimeout(() => {
            if (
              p.item.active === item.id &&
              e &&
              document.activeElement !== e
            ) {
              e.focus();
            }
          }, 100);
        }}
        dangerouslySetInnerHTML={{ __html: _children || "" }}
        contentEditable
        spellCheck={false}
        onBlur={(e) => {
          p.focused = "";
          p.render();
        }}
        onInput={(e) => {
          if (p.focused !== item.id) {
            p.focused = item.id;
          }
          const mitem = p.treeMeta[item.id]?.item;
          if (mitem) {
            if (e.currentTarget.innerText.trim() === "") {
              mitem.set("html", "");
            } else {
              mitem.set("html", e.currentTarget.innerHTML);
            }

            if (p.item.active !== item.id) {
              p.item.active = item.id;
            }
          }
        }}
        {...elprop}
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
