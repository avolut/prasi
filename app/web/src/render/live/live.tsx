import { FC, useCallback, useEffect } from "react";
import parseUA from "ua-parser-js";
import { useGlobal } from "web-utils";
import { LPage } from "./elements/l-page";
import { LiveGlobal, Loader } from "./logic/global";
import { initLive } from "./logic/init";
import { routeLive } from "./logic/route";

export const Live: FC<{
  domain: string;
  pathname: string;
  loader: Loader;
  mode: "dev" | "prod";
}> = ({ domain, pathname, loader, mode = "dev" }) => {
  const p = useGlobal(LiveGlobal, "LIVE");
  p.loader = loader;

  if (mode === "prod") p.prod = true;

  if (p.site.id) {
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
  }
  const onResize = useCallback(() => {
    let newmode = p.mode;
    if (window.innerWidth < 600) newmode = "mobile";
    else newmode = "desktop";

    if (newmode !== p.mode) {
      p.mode = newmode;
      p.render();
    }
  }, [p]);

  useEffect(() => {
    if (p.site.id) {
      window.removeEventListener("resize", onResize);

      if (p.site.responsive === "all") {
        window.addEventListener("resize", onResize);
      }
    }
  }, [p.site.responsive]);

  if (p.status === "init") {
    initLive(p, domain);
  }

  if (p.site.id) {
    routeLive(p, pathname);
  }
  return <LPage />;
};
