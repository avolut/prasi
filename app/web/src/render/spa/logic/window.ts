import { PrasiOpt } from "../spa-raw";

export const w = window as unknown as {
  renderPrasi: (el: HTMLElement, opt?: PrasiOpt) => void;
  ssrContext: {
    global: any;
    render: () => void;
  };
};

w.ssrContext = {
  global: {},
  render() {},
};
