import { FC, useCallback, useEffect } from "react";
import { IText } from "../../../utils/types/text";
import { ERender } from "./e-render";
import { PG } from "../logic/global";
import { useLocal } from "web-utils";

export const EText: FC<{
  item: IText;
  editComponentId?: string;
}> = ({ item, editComponentId }) => {
  return (
    <ERender item={item} editComponentId={editComponentId}>
      {() => item.html || ""}
    </ERender>
  );
};

export const ETextInternal: FC<{
  className: any;
  p: PG;
  item: IText;
  _children: any;
  elprop: any;
}> = ({ p, className, item, _children, elprop }) => {
  const local = useLocal({ el: null as any });
  useEffect(() => {
    if (local.el && p.item.active === item.id) local.el.focus();
  }, [p.item.active]);

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
        if (local.el !== e) {
          local.el = e;
        }
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
};
