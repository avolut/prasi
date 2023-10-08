import { setup } from "goober";
import { decompressFromBase64 as decompress } from "lz-string";
import React from "react";
import { createRoot } from "react-dom/client";
import { Root } from "./src/export";
import { defineApi } from "./src/web/define-api";
import { defineReact } from "./src/web/define-react";
import { defineWindow } from "./src/web/define-window";
import { initRouter } from "./src/web/router";

const w = window as any;
new Function(decompress(w.royal))();

export const initApp = async (name: string) => {
  defineReact();
  await defineWindow();
  setup(React.createElement);
  defineApi();

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

  const rootEl = document.getElementById("root");
  if (rootEl) {
    const root = createRoot(rootEl);
    root.render(<Root name={name} props={{}} />);
  }
};
