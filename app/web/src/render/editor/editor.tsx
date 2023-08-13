import { FC, useEffect } from "react";
import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { EMainEditor } from "./panel/e-main-editor";
import { EditorGlobal } from "./logic/global";
import { initEditor } from "./logic/init";
import { routeEditor } from "./logic/route";

export const Editor: FC<{ site_id: string; page_id: string; session: any }> = ({
  session,
  site_id,
  page_id,
}) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  p.session = session;

  useEffect(() => {
    const keyDown = async (evt: KeyboardEvent) => {
      if (
        (evt.key === "s" || evt.key === "s") &&
        (evt.ctrlKey || evt.metaKey)
      ) {
        evt.preventDefault();
        evt.stopPropagation();
      }
    };
    window.addEventListener("keydown", keyDown, true);
    return () => {
      window.removeEventListener("keydown", keyDown, true);
    };
  }, []);

  if (!p.mode) {
    p.mode = (localStorage.getItem("editor-mode") || "desktop") as any;
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
    initEditor(p, site_id);

    return p.ui.loading;
  }

  routeEditor(p, page_id);

  if (p.status !== "ready") {
    if (p.status === "not-found") {
      return p.ui.notfound;
    }
    if (p.status === "error") {
      return p.ui.error;
    }

    return p.ui.loading;
  }

  return <EMainEditor />;
};
