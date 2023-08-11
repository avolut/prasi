import { type FC } from "react";
import { defineWindow } from "web-init/src/web/define-window";
import { GlobalContext } from "web-utils";
import importModule from "../editor/tools/dynamic-import";
import { w } from "./ssr-window";
import { renderSSR } from "./internal";
import { IRoot } from "../../utils/types/root";
import { Preview } from "../preview/preview";
export { useGlobal, useLocal } from "web-utils";

if (typeof __SRV_URL__ === "undefined") {
  w.__SRV_URL__ = "https://api.prasi.app/";
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
  const app = (
    <Root>
      <Preview domain={w.prasi.domain} pathname={w.prasi.pathname} />
      <style>{w.extractCss()}</style>
    </Root>
  );
  resolve(renderSSR(app));
});
