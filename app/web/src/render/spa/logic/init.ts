import trim from "lodash.trim";
import { PG, PrasiOpt } from "./global";
import { defineWindow } from "web-init/src/web/define-window";
import { IItem } from "../../../utils/types/item";

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
  prasi_page: any;
  prasi_pages: any[];
  prasi_comps: Record<string, { id: string; content_tree: IItem }>;
};

export const initSPA = (p: PG, opt: PrasiOpt) => {
  document.body.style.opacity = "1";
  p.site = w.site;
  p.baseUrl = new URL(trim(opt.baseUrl || location.href, "/ "));
  p.status = "loading";

  w.isEditor = false;
  w.isMobile = p.mode === "mobile";
  w.isDesktop = p.mode === "desktop";
  defineWindow();

  if (w.prasi_page) {
    p.page = w.prasi_page;
  }
  if (w.prasi_pages) {
    for (const page of w.prasi_pages) {
      p.pages[page.id] = page;
      p.route.insert(page.url, page);
    }
  }
  if (w.prasi_comps) {
    for (const comp of Object.values(w.prasi_comps)) {
      p.comps[comp.id] = comp;
    }
  }

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

  p.status = "ready";
};
