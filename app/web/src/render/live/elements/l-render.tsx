import { FC, ReactNode, useState } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { FNAdv, FNCompDef } from "../../../utils/types/meta-fn";
import { LiveGlobal } from "../logic/global";
import { treePropEval } from "../logic/tree-prop";
import { treeScopeEval } from "../logic/tree-scope";
import { LTextInternal } from "./l-text";

export const LRender: FC<{
  id: string;
  children?: (childs: IContent[]) => ReactNode;
  fromProp?: boolean;
}> = ({ id, children }) => {
  const [_, render] = useState({});
  const p = useGlobal(LiveGlobal, "LIVE");
  const meta = p.treeMeta[id];

  if (!meta) {
    return null;
  }

  meta.render = () => {
    render({});
  };
  let item = meta.item;

  if (item.hidden) {
    return null;
  }

  if (meta.comp && meta.comp.mcomp) {
    const comp = meta.comp;
    const props = meta.comp.mcomp
      .get("component")
      ?.get("props")
      ?.toJSON() as Record<string, FNCompDef>;

    const cprops = Object.entries(props).sort((a, b) => {
      return a[1].idx - b[1].idx;
    });

    comp.propval = treePropEval(p, meta, cprops);
  }

  let _children = null;

  if (children) {
    if (item.type === "text") _children = children([]);
    else {
      _children = children(item.childs || []);
    }
  }

  meta.className = produceCSS(item, {
    mode: p.mode,
  });

  const className = meta.className;
  const adv = item.adv;

  if (!adv?.js && (meta.scopeAttached || meta.comp)) {
    return treeScopeEval(
      p,
      meta,
      _children,
      `render(React.createElement("div",{...props},children));`
    );
  }

  if (adv) {
    if (adv.html) {
      const html = renderHTML(className, adv);
      if (html) return html;
    } else if (adv.jsBuilt && adv.js) {
      const el = treeScopeEval(p, meta, _children, adv.jsBuilt);
      return el;
    }
  }

  if (item.type === "text") {
    return (
      <LTextInternal
        key={item.id}
        className={className}
        item={item}
        p={p}
        _children={item.html || item.text}
      />
    );
  }

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
