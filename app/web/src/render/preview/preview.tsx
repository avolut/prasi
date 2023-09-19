import { FC, useEffect } from "react";
import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { PreviewGlobal } from "./logic/global";
import { initPreview } from "./logic/init";
import { routePreview } from "./logic/route";
import { PPage } from "./elements/p-page";
import parseUA from "ua-parser-js";

export const Preview: FC<{
  domain: string;
  pathname: string;
  override?: {
    passprop?: any;
    local?: any;
    exports?: any;
  };
}> = ({ domain, pathname }) => {
  const p = useGlobal(PreviewGlobal, "PREVIEW");

  if (!p.mode && !!p.site.responsive) {
    if (p.site.responsive === "all") {
      const parsed = parseUA();
      p.mode = parsed.device.type === "mobile" ? "mobile" : "desktop";
      if (localStorage.getItem("prasi-editor-mode")) {
        p.mode = localStorage.getItem("prasi-editor-mode") as any;
      }
    } else if (p.site.responsive === "mobile-only") {
      p.mode = "mobile";
    } else if (p.site.responsive === "desktop-only") {
      p.mode = "desktop";
    }
  }

  useEffect(() => {
    if (p.site.responsive === "all") {
      window.addEventListener("resize", () => {
        let newmode = p.mode;
        if (window.innerWidth < 600) newmode = "mobile";
        else newmode = "desktop";

        if (newmode !== p.mode) {
          p.mode = newmode;
          p.render();
        }
      });
    }
  }, [p.site.responsive]);

  if (p.status === "init") {
    p.ui.loading = <Loading note="preview" />;
    p.ui.preload = <Loading note="preload" backdrop={false} />;
    p.ui.notfound = (
      <div className="flex-1 flex items-center justify-center">NOT FOUND</div>
    );
    p.ui.error = (
      <div className="flex-1 flex items-center justify-center">
        PREVIEW ERROR
      </div>
    );
    initPreview(p, domain);
    return p.ui.loading;
  }

  if (p.site.id) {
    routePreview(p, pathname);
  }

  return <PPage />;
};
