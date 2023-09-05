import { PrasiOpt } from "./global";

export const w = window as unknown as {
  renderPrasi: (el: HTMLElement, opt?: PrasiOpt) => void;
  ssrContext: {
    global: any;
    render: () => void;
  };
  site: { id: string; js: string; npm: string };
  params: any;
};

w.ssrContext = {
  global: {},
  render() {},
};
