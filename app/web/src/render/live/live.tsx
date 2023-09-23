import { FC, useCallback, useEffect } from "react";
import { useGlobal } from "web-utils";
import { LiveGlobal } from "./logic/global";
import parseUA from "ua-parser-js";
import { Loading } from "../../utils/ui/loading";
import { initLive } from "./logic/init";
import { routeLive } from "./logic/route";
import { LPage } from "./elements/l-page";

export const Live: FC<{ domain: string; pathname: string }> = ({
  domain,
  pathname,
}) => {
  const p = useGlobal(LiveGlobal, "LIVE");

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
    window.removeEventListener("resize", onResize);

    if (p.site.responsive === "all") {
      window.addEventListener("resize", onResize);
    }
  }, [p.site.responsive]);

  if (p.status === "init") {
    initLive(p, domain);
    return <Loading />;
  }

  if (p.site.id) {
    routeLive(p, pathname);
  }

  return <LPage />;
};
