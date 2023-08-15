import { type FC } from "react";
import { defineWindow } from "web-init/src/web/define-window";
import { GlobalContext } from "web-utils";
import { renderSSR } from "./logic/init";
import { w } from "./logic/window";
import { SPage } from "./elements/s-page";
import { apiClient } from "web-init";
export { useGlobal, useLocal } from "web-utils";

if (typeof __SRV_URL__ === "undefined") {
  w.__SRV_URL__ = "https://api.prasi.app/";
  w.siteApiUrl = __SRV_URL__;
  w.isEditor = false;
  w.isSSR = true;
  w.ssrGlobalFont = [];
  w.ssrContext = {
    global: {},
    render() {
      w.ssrContext.ssrShouldRender = true;
    },
    ssrLocalEffect: {},
    ssrShouldRender: true,
  };
  w.apiClient = apiClient;
  defineWindow();
}

const Root: FC<{
  children: any;
}> = ({ children }) => {
  return (
    <GlobalContext.Provider value={w.ssrContext}>
      {children}
    </GlobalContext.Provider>
  );
};

w.ssrResult = new Promise<string>(async (resolve) => {
  let result = { html: "", css: "" };
  while (w.ssrContext.ssrShouldRender) {
    w.ssrContext.ssrShouldRender = false;
    result = renderSSR(
      <Root>
        <SPage />
      </Root>
    );

    for (const fx of Object.values(w.ssrContext.ssrLocalEffect)) {
      if (!fx.done) {
        fx.done = true;
        await fx.fn();
      }
    }
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
  ${w.ssrGlobalFont.join("\n")}
</head>
<body class="flex-col flex-1 w-full min-h-screen flex">
  <div id="root">
    ${result.html}
  </div>
  <script>
  window.addEventListener("resize", () => {
    const mode = window.innerWidth <= 600 ? "mobile" : "desktop";
    document.querySelectorAll(".cel").forEach((e) => {
      e.classList.remove("mobile");
      e.classList.remove("desktop");
      e.classList.add(mode);
    });
  });
  </script>
</body>
</html>`)
  );
});

function minify(s: string) {
  return s
    ? s
        .replace(/\>[\r\n ]+\</g, "><")
        .replace(/(<.*?>)|\s+/g, (m, $1) => ($1 ? $1 : " "))
        .trim()
    : "";
}
