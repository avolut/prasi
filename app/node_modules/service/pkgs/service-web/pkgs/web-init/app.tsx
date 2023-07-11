import { setup } from "goober";
import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { initRouter } from "./src/web/router";
import { defineWindow } from "./src/web/define-window";
import { SSR } from "web-types";
import { g } from "./src/types";
import { decompressFromBase64 as decompress } from "lz-string";

const w = window as any;
new Function(decompress(w.royal))();

export const initApp = async (name: string, App: SSR["App"]) => {
  if (!isSSR) {
    setup(React.createElement);
    defineWindow();

    const pageImport = (await import(
      "../../../../../../app/gen/web/page/entry"
    )) as any;
    w.__PAGES__ = {};
    if (pageImport && pageImport[name]) {
      w.__PAGES__ = pageImport[name];
    }

    const layoutImport = (await import(
      "../../../../../../app/gen/web/layout/entry"
    )) as any;
    w.__LAYOUTS__ = {};
    if (layoutImport && layoutImport[name]) {
      const layouts = (layoutImport as any)[name];
      await Promise.all(
        Object.entries(layouts.default).map(async ([k, v]) => {
          w.__LAYOUTS__[k] = (await (v as any)).default;
        })
      );
    }

    initRouter();

    const onlyRoot = true;
    if (App) {
      const init = document.getElementById("_royal_");
      if (init) {
        const app = (
          <App
            initScript={init.innerText}
            name={g.__WEB_NAME__}
            props={g.__SSR_PROP__}
            res={{
              pathname: location.pathname,
              params: {},
              statusCode: (window as any).__STATUS_CODE__,
            }}
            indexCSS={
              document.getElementById("indexCSS")?.getAttribute("href") ||
              undefined
            }
            onlyRoot={onlyRoot}
          />
        );

        if (onlyRoot) {
          const rootEl = document.getElementById("root");
          if (rootEl) {
            const root = createRoot(rootEl);
            root.render(app);
          }
        } else {
          hydrateRoot(document, app);
        }
      }
    }
  }
};
