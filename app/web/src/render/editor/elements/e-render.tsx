import { FC, ReactNode } from "react";
import { useGlobal, useLocal } from "web-utils";
import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { FNAdv, FNCompDef } from "../../../utils/types/meta-fn";
import { Loading } from "../../../utils/ui/loading";
import { EditorGlobal } from "../logic/global";
import { treePropEval } from "../logic/tree-prop";
import { JS_DEBUG, treeScopeEval } from "../logic/tree-scope";
import { ComponentOver, ElProp, createElProp } from "./e-relprop";
import { ETextInternal } from "./e-text";

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

    if (JS_DEBUG) {
      const args = [
        ("~".repeat(meta.depth || 0) + meta.item.name).padEnd(30, "_") +
          " " +
          meta.item.id,
      ].join(" ");

      if (meta.comp) {
        console.log("%c" + args, "color:red", "prop: ", comp.propval);
      }
    }
    if (!comp.propval) {
      comp.propval = treePropEval(p, meta, cprops);
    }
  }

  let _children = null;

  if (children) {
    if (item.type === "text") _children = children([]);
    else {
      _children = children(item.childs || []);
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
    if (!p.comps.doc[item.component.id]) {
      componentOver = <Loading backdrop={false} />;
    } else if (
      item.id !== p.comp?.instance_id &&
      !p.comp?.last.find((e) => e.instance_id === item.id)
    ) {
      componentOver = <ComponentOver item={item} p={p} elprop={elprop} />;
    }
  }

  if (adv) {
    if (adv.html) {
      const html = renderHTML(className, adv, elprop);
      if (html) return html;
    } else if (adv.jsBuilt) {
      const el = treeScopeEval(
        p,
        meta,
        <>
          {_children}
          {componentOver}
        </>
      );

      return el;
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
