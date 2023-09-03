import { useGlobal } from "web-utils";
import { PrasiOpt, SPAGlobal } from "../logic/global";
import { initSPA } from "../logic/init";
import { FC, useEffect } from "react";
import parseUA from "ua-parser-js";
import { Loading } from "../../../utils/ui/loading";

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

  if (p.status !== "ready") return <Loading />;

  return <>Hello fsa</>;
};
