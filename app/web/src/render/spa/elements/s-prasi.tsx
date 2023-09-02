import { useGlobal } from "web-utils";
import { SPAGlobal } from "../logic/global";

export const SPrasi = () => {
  const p = useGlobal(SPAGlobal, "SPA");
  if (!p.basePath) {
    
  }

  return <></>;
};
