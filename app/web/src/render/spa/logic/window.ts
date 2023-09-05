import { FC } from "react";
import { PrasiOpt } from "./global";

export const w = window as unknown as {
  renderPrasi: (el: HTMLElement, opt?: PrasiOpt) => void;
  prasiContext: {
    global: any;
    render: () => void;
  };
  PrasiBaseComponent: FC<PrasiOpt>;
  site: { id: string; js: string; npm: string };
  params: any;
};

w.prasiContext = {
  global: {},
  render() {},
};
