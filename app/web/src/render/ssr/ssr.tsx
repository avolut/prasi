import { type FC } from "react";
import { defineWindow } from "web-init/src/web/define-window";
import { GlobalContext } from "web-utils";
import { renderSSR } from "./logic/init";
import { w } from "./logic/window";
import { SPage } from "./elements/s-page";
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
      <SPage />
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
  resolve(
    minify(`\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" id="indexCSS" href="https://prasi.app/index.css"/>
  <style id="_goober">
    ${result.css}
  </style>
</head>
<body class="flex-col flex-1 w-full min-h-screen flex">
  <div id="root">
    
    ${result.html}
  </div>
</body>
</html>`)
  );
});

function minify(s: string) {
  return s
    ? s
        .replace(/\>[\r\n ]+\</g, "><") // Removes new lines and irrelevant spaces which might affect layout, and are better gone
        .replace(/(<.*?>)|\s+/g, (m, $1) => ($1 ? $1 : " "))
        .trim()
    : "";
}
