import { compressToBase64 as compress } from "lz-string";
import React from "react";
import { dbs } from "service-db";
import { ssr } from "web-init";
import { g } from "web-init/src/types";
import { initRouter } from "web-types/router";
import { service } from "../../../export";
import { web } from "./glb-web";

export const initSSR = async () => {
  const srvURL = await service.srv.publicURL();
  const name = web.name;
  g.isSSR = true;
  g.__SSR__ = {
    App: null,
    handler: {},
    initScript: (inject: string) => {
      const src = compress(
        `const w=window;w.__REACT_DEVTOOLS_GLOBAL_HOOK__={isDisabled:!0},w.__SRV_URL__="${srvURL}",w.__WEB_NAME__="${web.name}",w.isSSR=!1;${inject}`
      );

      return `window.royal="${src}";`;
    },
  };

  const pageImport = await import("../../../../../app/gen/web/page/entry-ssr");
  if ((pageImport as any)[name]) {
    g.__PAGES__ = (pageImport as any)[name];
    await Promise.all(
      Object.entries(g.__PAGES__).map(async ([k, v]) => {
        if (v.ssr && v.component instanceof Promise) {
          const comp = await v.component;
          v.component = comp.default.component;
        }
      })
    );
  }

  // import layouts
  g.__LAYOUTS__ = {};
  const layoutImport = await import("../../../../../app/gen/web/layout/entry");
  if ((layoutImport as any)[name]) {
    const layouts = (layoutImport as any)[name];
    await Promise.all(
      Object.entries(layouts.default).map(async ([k, v]) => {
        g.__LAYOUTS__[k] = (await (v as any)).default;
      })
    );
  }

  // import ssr handler
  const handlerImport = await import("../../../../../app/gen/web/ssr/entry");
  if ((handlerImport as any)[name]) {
    const handler = (handlerImport as any)[name] as Record<
      string,
      [string, Promise<{ default: Parameters<typeof ssr>[0] }>]
    >;
    for (const h of Object.values(handler)) {
      const route = h[0];
      const im = await h[1];
      if (im) {
        const fn = im.default;
        g.__SSR__.handler[route] = fn.onRequest;
      }
    }
  }

  // import entry app
  const index = await import("../../../../../app/gen/web/entry");
  g.__SSR__.App = (index as any)[name];

  g.isSSR = true;
  g.cx = (...classNames: any[]) => {
    const result: any[] = [];

    classNames
      .filter((e) => !!e)
      .forEach((e) => {
        if (Array.isArray(e)) {
          for (const f of e) {
            result.push(f);
          }
        } else result.push(e);
      });
    return result.join(" ");
  };
  g.React = React;
  g.Fragment = React.Fragment;

  initRouter();
};
