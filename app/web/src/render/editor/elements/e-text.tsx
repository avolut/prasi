import { FC, useEffect } from "react";
import { useLocal } from "web-utils";
import { IText } from "../../../utils/types/text";
import { PG } from "../logic/global";
import { rebuildTree } from "../logic/tree-logic";
import { ErrorBox } from "./e-error";
import { ERender } from "./e-render";

export const EText: FC<{
  id: string;
  fromProp?: boolean;
}> = ({ id, fromProp }) => {
  return (
    <ErrorBox id={id}>
      <ERender id={id} fromProp={fromProp} />
    </ErrorBox>
  );
};
const currentFocus = {
  id: "",
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
    if (p.item.active) {
      if (
        local.el &&
        p.item.active === item.id &&
        currentFocus.id !== item.id &&
        !p.script.active &&
        !p.script.siteActive
      ) {
        currentFocus.id = item.id;
        local.el.focus();
        local.render();
      }
      if (p.item.active !== item.id) {
      }
    }
  }, [p.item.active]);

  return (
    <div
      id={`text-${item.id}`}
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
      onBlur={async (e) => {
        p.focused = "";
        if (p.pendingRebuild) {
          p.pendingRebuild = false;
          await rebuildTree(p, { mode: "update", note: "blur-text" });
        }
        p.render();
      }}
      onInput={(e) => {
        if (p.focused !== item.id) {
          p.focused = item.id;
        }
        const mitem = p.treeMeta[item.id]?.mitem;
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
