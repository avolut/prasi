import { FC, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { FNAdv, FNCompDef } from "../../../utils/types/meta-fn";
import { Loading } from "../../../utils/ui/loading";
import { EditorGlobal } from "../logic/global";
import { treePropEval } from "../logic/tree-prop";
import {
  JS_DEBUG,
  mergeScopeUpwards,
  treeScopeEval,
} from "../logic/tree-scope";
import { ComponentOver, ElProp, createElProp } from "./e-relprop";
import { ETextInternal } from "./e-text";
import { IItem } from "../../../utils/types/item";
import { newMap } from "../tools/yjs-tools";
import { fillID } from "../tools/fill-id";

export const ERender: FC<{
  id: string;
  children?: (childs: IContent[]) => ReactNode;
  fromProp?: boolean;
}> = ({ id, children }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const meta = p.treeMeta[id];

  if (!meta) {
    return null;
  }
  let item = meta.item;

  if (item.hidden) {
    return null;
  }

  if (
    meta.parent_prop &&
    typeof item.adv?.js === "string" &&
    item.adv.js.startsWith("newElement")
  ) {
    const mitem = meta.mitem;
    if (mitem && item.type === "item") {
      mitem.doc?.transact(() => {
        mitem.parent.forEach((e, idx) => {
          if (e === mitem && item.adv?.js) {
            const json = e.toJSON() as IItem;
            mitem.parent.delete(idx);

            const scope = mergeScopeUpwards(p, meta);
            let fn: any = null;
            const args = {
              ...window.exports,
              ...scope,
              render: (f: any) => {},
              newElement: (fx: any) => {
                fn = fx;
              },
            };
            const rawfn = new Function(
              ...Object.keys(args),
              item.adv.jsBuilt || ""
            );
            rawfn(...Object.values(args));

            const childs: any[] = [];

            json.childs.map((e) => {
              const res = fn(fillID(e));

              if (Array.isArray(res)) {
                for (const r of res) {
                  childs.push(newMap(fillID(r)));
                }
              } else {
                childs.push(fillID(res));
              }
            });
            mitem.parent.insert(idx, childs);
          }
        });
      });
      return null;
    }
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

    comp.propval = treePropEval(p, meta, cprops);
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
    if (
      !Object.values(item.component.props).find(
        (e) => e.meta?.type === "content-element"
      )
    ) {
      if (!p.comps.doc[item.component.id]) {
        componentOver = (
          <Loading backdrop={false} note={item.component.id.substring(28)} />
        );
      } else if (item.id !== p.comp?.instance_id) {
        componentOver = <ComponentOver item={item} p={p} elprop={elprop} />;
      }
    }
    if (
      meta.comp &&
      (p.comp?.id === meta.comp.id ||
        p.comp?.last.find((e) => e.comp_id === meta.comp?.id))
    ) {
      componentOver = null;
    }
  }

  if (!adv?.js && (meta.scopeAttached || meta.comp)) {
    return treeScopeEval(
      p,
      meta,
      <>
        {_children}
        {componentOver}
      </>,
      `render(React.createElement("div",{...props},children));`
    );
  }

  if (adv) {
    if (adv.html) {
      const html = renderHTML(className, adv, elprop);
      if (html) return html;
    } else if (adv.jsBuilt && adv.js) {
      const el = treeScopeEval(
        p,
        meta,
        <>
          {_children}
          {componentOver}
        </>,
        adv.jsBuilt
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
        {item.name === "coba" && JSON.stringify(item.childs)}
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
