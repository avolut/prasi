import trim from "lodash.trim";
import { PG, PrasiOpt } from "./global";
import { defineWindow } from "web-init/src/web/define-window";
import { IItem } from "../../../utils/types/item";
import { Loading } from "../../../utils/ui/loading";
import { initApi } from "../../../utils/script/init-api";

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

export const initSPA = async (p: PG, opt: PrasiOpt) => {
  document.body.style.opacity = "1";
  p.site = w.site;
  p.site.js = w.site.js_compiled || "";
  p.site.api_url = await initApi(w.site.config);

  p.baseUrl = new URL(trim(opt.baseUrl || location.href, "/ "));
  p.status = "loading";

  if (window.innerWidth < 600) p.mode = "mobile";
  else p.mode = "desktop";

  p.ui.loading = <Loading note="editor-root" />;
  p.ui.preload = <Loading note="preload-root" backdrop={false} />;
  p.ui.notfound = (
    <div className="flex-1 flex items-center justify-center">NOT FOUND</div>
  );
  p.ui.error = (
    <div className="flex-1 flex items-center justify-center text-red-500">
      PAGE ERROR
    </div>
  );

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
  p.render();
};
