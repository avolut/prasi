import { ReactElement, type FC } from "react";
import { renderToString } from "react-dom/server";
import { defineWindow } from "web-init/src/web/define-window";
import { GlobalContext } from "web-utils";
import { w } from "./ssr-window";
export { useGlobal, useLocal } from "web-utils";

if (typeof __SRV_URL__ === "undefined") {
  w.__SRV_URL__ = "https://api.prasi.app/";
  w.siteApiUrl = __SRV_URL__;
  w.isEditor = false;
  w.isSSR = true;
  defineWindow();
}

const ssrContext = {
  global: {},
  render: () => {},
  ssrMapEffect: {} as Record<string, (() => void)[]>,
  ssrShouldRender: false,
};

const Root: FC<{
  children: any;
}> = ({ children }) => {
  return (
    <GlobalContext.Provider value={ssrContext}>
      {children}
    </GlobalContext.Provider>
  );
};

w.ssrResult = new Promise<string>((resolve) => {
  const app = (
    <Root>
      <style>{w.extractCss()}</style>
    </Root>
  );
  let result = renderSSR(app);
  for (const effects of Object.values(ssrContext.ssrMapEffect)) {
    while (effects.length > 0) {
      const effect = effects.shift();
      if (effect) {
        effect();
      }
    }
  }
  if (ssrContext.ssrShouldRender) {
    result = renderSSR(app);
  }
  resolve(result);
});

const renderSSR = (el: ReactElement) => {
  return renderToString(el);
};
