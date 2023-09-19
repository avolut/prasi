import { useGlobal } from "web-utils";
import { PrasiOpt, SPAGlobal } from "../logic/global";
import { initSPA } from "../logic/init";
import { FC, useEffect } from "react";
import parseUA from "ua-parser-js";
import { Loading } from "../../../utils/ui/loading";
import { routeSPA } from "../logic/route";
import { SPage } from "./s-page";
import { w } from "../logic/window";

export const SPrasi: FC<PrasiOpt> = (opt) => {
  const p = useGlobal(SPAGlobal, "SPA");
  w.rootRender = p.render;

  if (!!p.site.responsive) {
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
      console.log("auo");
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
  }, []);

  if (p.status === "init") {
    initSPA(p, opt);
  }

  let basePath = p.baseUrl.pathname;
  if (basePath.endsWith("/")) {
    basePath = basePath.substring(0, basePath.length - 1);
  }

  routeSPA(p, location.pathname.substring(basePath.length));

  return <SPage />;
};
