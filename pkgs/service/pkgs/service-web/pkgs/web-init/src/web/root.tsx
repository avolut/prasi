import { FC, lazy, ReactNode, Suspense } from "react";
import { GlobalContext, useLocal, waitUntil } from "web-utils";
import { g, PageResponse } from "../types";
import { ErrorBoundary } from "./error-boundary";
import { PromisedComponent } from "./page";

export const Root: FC<{
  name: string;
  loading?: ReactNode;
  props: Record<string, any>;
  res: PageResponse;
}> = ({ loading, props, res }) => {
  const local = useLocal({
    Layout: undefined as
      | undefined
      | React.LazyExoticComponent<FC<any>>
      | FC<any>,
    global: {},
    pathname: "",
    pathLoaded: false,
    pageUrl: "",
    firstRender: true,
    Page: (() => <>{loading}</>) as
      | React.LazyExoticComponent<FC<any>>
      | FC<any>,
  });

  if (!isSSR) {
    const w = window as any;
    w.rootRender = local.render;

    if (local.firstRender) local.firstRender = false;
    else res.pathname = location.pathname;

    w.rootRes = res;
    w.pathname = res.pathname;
  }

  let page = g.__PAGES__["index"];

  let found = g.router.lookup(res.pathname);
  if (!found || (found && !found.name)) {
    found = g.router.lookup(res.pathname + "/");
  }
  if (!found || (found && !found.name)) {
    found = g.router.lookup(res.pathname + "/_");
  }
  if (!found || (found && !found.name)) {
    found = g.router.lookup(res.pathname + "/_/");
  }
  if (!found || (found && !found.name)) {
    found = g.router.lookup(res.pathname + "/_/_");
  }

  if (!found) {
    if (!g.notFoundPage) {
      const ffPage = Object.values(g.__PAGES__).find((e) => e.url === "*");
      if (ffPage) {
        g.notFoundPage = ffPage;
      }
    }

    if (g.notFoundPage) {
      found = g.notFoundPage;
    }
  }

  if (found && found.name) {
    if (g.__PAGES__[found.name]) {
      page = g.__PAGES__[found.name];
    }
    res.params = found.params || {};
    if (!isSSR && typeof window === "object") {
      (window as any).params = res.params;
    }
  }

  if (!isSSR) {
    g.__CURPAGE__ = page;
  }

  if (page) {
    if (local.pathname !== res.pathname) {
      if (local.pageUrl !== page.url) {
        local.pageUrl = page.url;
        local.pathLoaded = false;
        local.Layout = undefined;
        local.pathname = res.pathname;
      }
    }

    if (!local.Layout && page.layout) {
      if (g.__LAYOUTS__ && g.__LAYOUTS__[page.layout]) {
        local.Layout = g.__LAYOUTS__[page.layout] as any;
      }
    }

    if (!local.pathLoaded && typeof page.component !== "undefined") {
      const component = (page.component as PromisedComponent)();
      if (typeof component === "object" && component instanceof Promise) {
        local.pathLoaded = true;
        if (!page.ssr) {
          local.Page = () => <>{loading}</>;
          component.then((e) => {
            local.Page = e.default.component;
            local.render();
          });
        } else {
          local.Page = lazy(async () => {
            return {
              default: (await component).default.component,
            };
          });
        }
      } else {
        local.Page = component;
        local.pathLoaded = true;
      }
    }
  }

  if (!g.api) {
    waitUntil(() => typeof g.api !== "undefined").then(() => {
      local.render();
    });
    return null;
  }

  return (
    <GlobalContext.Provider
      value={{
        global: local.global,
        render: () => {
          local.render();
        },
      }}
    >
      {local.Layout ? (
        <Suspense fallback={loading}>
          <ErrorBoundary>
            <local.Layout {...props} res={res}>
              <local.Page {...props} res={res} />
            </local.Layout>
          </ErrorBoundary>
        </Suspense>
      ) : (
        <>
          <Suspense fallback={loading}>
            <ErrorBoundary>
              <local.Page {...props} res={res} />
            </ErrorBoundary>
          </Suspense>
        </>
      )}
    </GlobalContext.Provider>
  );
};
