import { createRoot } from "react-dom/client";
import { defineWindow } from "web-init/src/web/define-window";
import { SiteLoader } from "./site-loader";

(async () => {
  const div = document.getElementById("root");
  if (div) {
    const root = createRoot(div);
    const url = new URL(location.href);
    await defineWindow(false);
    const { Live } = await import("../live/live");
    root.render(
      <Live domain={url.host} pathname={url.pathname} loader={SiteLoader} />
    );
  }
})();
