import trim from "lodash.trim";
import { PG, PrasiOpt } from "./global";
import { defineWindow } from "web-init/src/web/define-window";

const w = window as unknown as {
  basepath: string;
  serverurl: string;
  navigateOverride: (s: string) => string;
  isEditor: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  exports: any;
  params: any;
  site: any;
};

export const initSPA = (p: PG, opt: PrasiOpt) => {
  document.body.style.opacity = "1";
  p.site = w.site;
  p.baseUrl = trim(opt.baseUrl || location.href, "/ ");
  p.status = "loading";

  w.isEditor = false;
  w.isMobile = p.mode === "mobile";
  w.isDesktop = p.mode === "desktop";
  defineWindow();
 
  w.navigateOverride = (_href) => {
    if (_href.startsWith("/")) {
      if (w.basepath.length > 1) {
        _href = `${w.basepath}${_href}`;
      }
      if (
        location.hostname === "prasi.app" ||
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1" ||
        location.hostname === "10.0.2.2" // android localhost
      ) {
        if (
          location.pathname.startsWith("/preview") &&
          !_href.startsWith("/preview")
        ) {
          const patharr = location.pathname.split("/");
          _href = `/preview/${patharr[2]}${_href}`;
        }
      }
    }
    return _href;
  };
};
