import { createRoot } from "react-dom/client";
import { w } from "./logic/window";
import { Prasi, PrasiOpt } from "./spa-raw";
export const renderPrasi = (el: HTMLElement, opt?: PrasiOpt) => {
  const root = createRoot(el);
  root.render(<Prasi {...opt} />);
};
w.renderPrasi = renderPrasi;
