import { FC } from "react";
import { useGlobal } from "web-utils";
import { Loading } from "../../compo/ui/loading";
import { PreviewGlobal } from "./logic/global";
import { initPreview } from "./logic/init";
import { routePreview } from "./logic/route";
import { PPage } from "./elements/p-page";
import parseUA from "ua-parser-js";

export const Preview: FC<{ domain: string; pathname: string }> = ({
  domain,
  pathname,
}) => {
  const p = useGlobal(PreviewGlobal, "PREVIEW");

  if (!p.mode) {
    const parsed = parseUA();
    p.mode = parsed.device.type === "mobile" ? "mobile" : "desktop";
  }

  if (p.status === "init") {
    p.ui.loading = <Loading />;
    p.ui.preload = <Loading backdrop={false} />;
    p.ui.notfound = (
      <div className="flex-1 flex items-center justify-center">NOT FOUND</div>
    );
    p.ui.error = (
      <div className="flex-1 flex items-center justify-center">
        PREVIEW ERROR
      </div>
    );
    initPreview(p, domain);
  }

  routePreview(p, pathname);

  if (p.status !== "ready") {
    if (p.status === "not-found") {
      return p.ui.notfound;
    }
    if (p.status === "error") {
      return p.ui.error;
    }
    return p.ui.loading;
  }

  return <PPage />;
};
