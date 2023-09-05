import { useGlobal } from "web-utils";
import { PrasiOpt, SPAGlobal } from "../logic/global";
import { initSPA } from "../logic/init";
import { FC, useEffect } from "react";
import parseUA from "ua-parser-js";
import { Loading } from "../../../utils/ui/loading";
import { routeSPA } from "../logic/route";
import { SPage } from "./s-page";

export const SPrasi: FC<PrasiOpt> = (opt) => {
  const p = useGlobal(SPAGlobal, "SPA");

  if (!p.mode) {
    const parsed = parseUA();
    p.mode = parsed.device.type === "mobile" ? "mobile" : "desktop";
    if (localStorage.getItem("editor-mode")) {
      p.mode = localStorage.getItem("editor-mode") as any;
    }
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      let newmode = p.mode;
      if (window.innerWidth < 600) newmode = "mobile";
      else newmode = "desktop";

      if (newmode !== p.mode) {
        p.mode = newmode;
        p.render();
      }
    });
  }, []);

  if (p.status === "init") {
    initSPA(p, opt);
  }

  let basePath = p.baseUrl.pathname;
  if (basePath.endsWith("/")) {
    basePath = basePath.substring(0, basePath.length - 1);
  }

  routeSPA(p, location.pathname.substring(basePath.length));

  if (p.status === "not-found")
    return (
      <div className="flex-1 flex items-center justify-center">
        404 Not Found
      </div>
    );
  if (p.status !== "ready") return <Loading />;
 
  return <SPage />;
};
