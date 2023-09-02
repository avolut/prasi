import { FC, useState } from "react";
import { GlobalContext } from "web-utils";
import { SPrasi } from "./elements/s-prasi";
import { PrasiOpt } from "./logic/global";
import { w } from "./logic/window";

export const Prasi: FC<PrasiOpt> = (opt) => {
  const [_, render] = useState({});
  w.ssrContext.render = () => render({});

  return (
    <GlobalContext.Provider value={w.ssrContext}>
      <SPrasi {...opt} />
    </GlobalContext.Provider>
  );
};
