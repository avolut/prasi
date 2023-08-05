import { type FC } from "react";
import { defineWindow } from "web-init/src/web/define-window";
import { GlobalContext } from "web-utils";
import importModule from "../../../../page/tools/dynamic-import";
import { IRoot } from "../../../../types/root";
import { RSection } from "../../../base/elements/r-section";
import { renderSSR } from "./internal";
import { w } from "./ssr-window";
export { useGlobal, useLocal } from "web-utils";
 
if (typeof __SRV_URL__ === "undefined") {
  w.__SRV_URL__ = "https://apilmtd.goperasi.id/";
  w.siteApiUrl = __SRV_URL__;
  w.isEditor = false; 
  defineWindow();
}

const local = {
  global: {},
  render: () => {},
};

const Root: FC<{
  children: any;
}> = ({ children }) => {
  return (
    <GlobalContext.Provider
      value={{
        global: local.global,
        render: local.render,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

w.ssrResult = new Promise<string>((resolve) => {
  try {
    if (w.prasi.site.js_compiled) {
      const fn = new Function("exports", "load", w.prasi.site.js_compiled);
      fn(w.exports, importModule);
    }
  } catch (e) {
    console.log(e);
  }

  const content_tree = w.prasi.page.content_tree as IRoot;
  if (content_tree) {
    const app = (
      <Root>
        <div className="flex flex-col items-stretch flex-1 bg-white">
          {content_tree.childs.map((e) => (
            <RSection key={e.id} item={e} />
          ))}
        </div>
        <style>{w.extractCss()}</style>
      </Root>
    );
    resolve(renderSSR(app));
  }
});
