import { FC, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../utils/css/gen";
import { FNAdv } from "../../../utils/types/meta-fn";
import { EditorGlobal } from "../logic/global";
import { treeScopeEval } from "../logic/tree-scope";
import { ComponentOver, ElProp, createElProp } from "./e-relprop";
import { ETextInternal } from "./e-text";
import { IContent } from "../../../utils/types/general";

export const ERender: FC<{
  id: string;
  children?: (childs: IContent[]) => ReactNode;
}> = ({ id, children }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const meta = p.treeMeta[id];

  if (!meta) {
    return null;
  }
  let item = meta.item;

  if (meta.comp?.item) {
    item = meta.comp.item;
  }

  let _children = null;

  if (children) {
    if (item.type === "text") _children = children([]);
    else _children = children(item.childs);
  }

  const elprop = createElProp(item, p);
  const className = produceCSS(item, {
    mode: p.mode,
    hover: p.item.sideHover ? false : p.item.hover === item.id,
    active: p.item.sideHover ? false : p.item.active === item.id,
  });
  const adv = item.adv;

  let componentOver = null;
  if (item.type === "item" && item.component?.id) {
    componentOver = <ComponentOver item={item} p={p} elprop={elprop} />;
  }

  if (item.hidden) {
    return null;
  }

  if (adv) {
    const html = renderHTML(item.id, className, adv, elprop);

    if (html) return html;
    else if (adv.jsBuilt && adv.js) {
      return treeScopeEval(p, meta, _children);
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
      <pre className={"text-[9px] font-mono text-black"}>
        {item.id}-{item.name}
      </pre>
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
