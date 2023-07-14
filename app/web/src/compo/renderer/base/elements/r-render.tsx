import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../page/css/gen";
import { IContent } from "../../../types/general";
import { RendererGlobal } from "../renderer-global";
import { FNAdv } from "../../../types/meta-fn";
import { scriptScope } from "./script-scope";
import { scriptExec } from "./script-exec";

export const RRender: FC<{ item: IContent; children: ReactNode }> = ({
  item,
  children,
}) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");
  const [_, setRender] = useState({});
  const ref = useRef({ mounted: true });
  const render = () => {
    if (ref.current.mounted) {
      setRender({});
    }
  };
  let _children = children;
  useEffect(() => {
    return () => {
      ref.current.mounted = false;
    };
  }, []);

  const className = produceCSS(item, { mode: rg.mode });
  const adv = item.adv;
  if (adv) {
    const html = renderHTML(adv);
    const scope = scriptScope(item, rg);
    if (html) _children = html;
    else if (adv.jsBuilt && adv.js) {
      return scriptExec(
        {
          item,
          scope,
          children: _children,
          rg,
          className,
          render,
        },
        rg.site.api_url
      );
    }
  }

  return <div className={className}>{_children}</div>;
};

export const renderHTML = (adv: FNAdv) => {
  if (adv.html) {
    return (
      <div
        className="flex-1 self-stretch justify-self-stretch p-[2px]"
        dangerouslySetInnerHTML={{ __html: adv.html }}
      ></div>
    );
  }
  return null;
};
