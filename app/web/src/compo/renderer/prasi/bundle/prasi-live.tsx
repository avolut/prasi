import { FC, ReactElement } from "react";
import { defineWindow } from "web-init/src/web/define-window";
import { GlobalContext, useLocal } from "web-utils";
import { PrasiLiveArg, praseiLiveRenderer } from "./prasi-live-renderer";
export { useGlobal, useLocal } from "web-utils";

const w = window as unknown as {
  __SRV_URL__: string;
  siteApiUrl: string;
  isEditor: false;
};

export const Prasi: FC<{
  notfound?: ReactElement;
  loading?: ReactElement;
  live?: PrasiLiveArg;
  props?: Record<string, any>;
}> = ({ live, loading, notfound, props }) => {
  const NotFound = () => {
    if (notfound) return notfound;
    return <>Not Found</>;
  };
  const Loading = () => {
    if (loading) return loading;
    return <>Loading</>;
  };

  if (live) {
    return (
      <Root>
        <PrasiLive
          NotFound={NotFound}
          Loading={Loading}
          live={live}
          props={props}
        />
      </Root>
    );
  }

  return <Loading />;
};

const PrasiLive: FC<{
  NotFound: any;
  Loading: any;
  live: PrasiLiveArg;
  props?: any;
}> = ({ NotFound, Loading, live, props }) => {
  if (typeof __SRV_URL__ === "undefined") {
    w.__SRV_URL__ = "https://api.prasi.app/";
    w.siteApiUrl = __SRV_URL__;
    w.isEditor = false;
    defineWindow();
  }

  const site = praseiLiveRenderer({ Loading, NotFound, live, props });
  if (!site) return <NotFound />;
  return site.renderPage(live.pathname);
};

const Root: FC<{
  children: any;
}> = ({ children }) => {
  const local = useLocal({
    global: {},
  });

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
