import { FC, useState } from "react";
import { GlobalContext } from "web-utils";
import { SPrasi } from "./elements/s-prasi";
import { w } from "./logic/window";

export type PrasiOpt = {
  showLoading?: boolean;
  exports?: any;
};
export const Prasi: FC<PrasiOpt> = () => {
  const [_, render] = useState({});
  w.ssrContext.render = () => render({});

  return (
    <GlobalContext.Provider value={w.ssrContext}>
      <SPrasi />
    </GlobalContext.Provider>
  );
};
