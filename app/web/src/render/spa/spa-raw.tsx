import { FC, useState } from "react";
import { GlobalContext, useLocal } from "web-utils";
import { w } from "./logic/window";

export type PrasiOpt = {
  showLoading?: boolean;
  exports?: any;
};
export const Prasi: FC<{ exports?: any }> = () => {
  const [_, render] = useState({});
  w.ssrContext.render = () => render({});

  return (
    <GlobalContext.Provider value={w.ssrContext}>
      <>Hello ini bisa menjadi konten generator yang baik dan bagus </>
    </GlobalContext.Provider>
  );
};
