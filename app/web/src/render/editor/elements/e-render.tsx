import { FC, ReactNode } from "react";
import { useGlobal, useLocal } from "web-utils";
import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { FNAdv, FNCompDef } from "../../../utils/types/meta-fn";
import { EditorGlobal } from "../logic/global";
import { ComponentOver, ElProp, createElProp } from "./e-relprop";
import { ETextInternal } from "./e-text";
import { treeScopeEval } from "../logic/tree-scope";
import { treePropEval } from "../logic/tree-prop";

export const ERender: FC<{
  id: string;
  children?: (childs: IContent[]) => ReactNode;
}> = ({ id, children }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const meta = p.treeMeta[id];
  const local = useLocal({});

  if (!meta) {
    return null;
  }
  let item = meta.item;

  if (meta.comp?.item) {
    item = meta.comp.item;
  }

  if (item.hidden) {
    return null;
  }

  if (meta.comp?.item) {
    const comp = meta.comp;
    const props = comp.mcomp.get("component")?.get("props")?.toJSON() as Record<
      string,
      FNCompDef
    >;

    const cprops = Object.entries(props).sort((a, b) => {
      return a[1].idx - b[1].idx;
    });

    if (!comp.propval) {
      treePropEval(p, meta, cprops).then((propval) => {
        comp.propval = propval;
        local.render();
      });
      return null;
    }
  }

  let _children = null;

  if (children) {
    if (item.type === "text") _children = children([]);
    else {
      if (item.id === p.comp?.instance_id && meta.comp) {
        _children = children(meta.comp.mcomp.get("childs")?.toJSON() as any);
      } else {
        _children = children(item.childs);
      }
    }
  }

  meta.elprop = createElProp(item, p);
  meta.className = produceCSS(item, {
    mode: p.mode,
    hover: p.item.sideHover ? false : p.item.hover === item.id,
    active: p.item.sideHover ? false : p.item.active === item.id,
  });

  const elprop = meta.elprop;
  const className = meta.className;
  const adv = item.adv;

  let componentOver = null;
  if (item.type === "item" && item.component?.id) {
    if (item.id !== p.comp?.instance_id) {
      componentOver = <ComponentOver item={item} p={p} elprop={elprop} />;
    }
  }

  if (adv) {
    if (adv.html) {
      const html = renderHTML(className, adv, elprop);
      if (html) return html;
    } else if (adv.jsBuilt) {
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
      {/* <pre className={"text-[9px] font-mono text-black"}>
        {item.id}-{item.name}
      </pre> */}
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
