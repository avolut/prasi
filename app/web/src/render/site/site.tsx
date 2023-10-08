import { FC, useState } from "react";
import { createRoot } from "react-dom/client";
import { defineReact } from "web-init/src/web/define-react";
import { defineWindow } from "web-init/src/web/define-window";
import { GlobalContext } from "web-utils";
import { SiteLoader } from "./site-loader";

const w = window as unknown as {
  prasiContext: any;
  rootRender: any;
};

w.prasiContext = {
  global: {},
  render() {},
};

const Root: FC<{ url: URL; Live: any }> = ({ url, Live }) => {
  const [_, render] = useState({});
  w.prasiContext.render = () => {
    render({});
  };
  w.rootRender = w.prasiContext.render;

  return (
    <GlobalContext.Provider value={w.prasiContext}>
      <Live
        domain={url.host}
        pathname={location.pathname}
        loader={SiteLoader}
        mode="prod"
      />
    </GlobalContext.Provider>
  );
};

(async () => {
  const div = document.getElementById("root");
  if (div) {
    const root = createRoot(div);
    const url = new URL(location.href);
    await defineWindow(false);
    defineReact();
    const { Live } = await import("../live/live");
    root.render(<Root url={url} Live={Live} />);
    if (document.body.classList.contains("opacity-0")) {
      document.body.classList.remove("opacity-0");
    }
  }
})();
