import { useGlobal } from "web-utils";
import { PrasiOpt, SPAGlobal } from "../logic/global";
import { initSPA } from "../logic/init";
import { FC } from "react";

export const SPrasi: FC<PrasiOpt> = (opt) => {
  const p = useGlobal(SPAGlobal, "SPA");
  if (!p.baseUrl) {
    initSPA(p, opt);
  } 

  return <>Hello fsa</>;
};
