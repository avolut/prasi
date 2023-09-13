import { FC, useEffect } from "react";
import { useGlobal, deepClone } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { EMainEditor } from "./panel/e-main-editor";
import { EditorGlobal } from "./logic/global";
import { execSiteJS, initEditor } from "./logic/init";
import { routeEditor } from "./logic/route";
import { undoManager } from "./logic/undo";
import { w } from "../../utils/types/general";

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

      if (
        (evt.key === "Y" || evt.key === "y") &&
        (evt.ctrlKey || evt.metaKey) &&
        !evt.shiftKey
      ) {
        undoManager.redo(p);
        return;
      }

      if (
        (evt.key === "Z" || evt.key === "z") &&
        (evt.ctrlKey || evt.metaKey) &&
        evt.shiftKey
      ) {
        undoManager.redo(p);
        return;
      }

      if (
        (evt.key === "Z" || evt.key === "z") &&
        (evt.ctrlKey || evt.metaKey) &&
        !evt.shiftKey
      ) {
        undoManager.undo(p);
      }
    };
    window.addEventListener("keydown", keyDown, true);
    return () => {
      window.removeEventListener("keydown", keyDown, true);
    };
  }, []);

  useEffect(() => {
    if (p.status !== "init" && w.prasiApi) {
      for (const [k, v] of Object.entries(deepClone(EditorGlobal))) {
        if (k === "session" || k === "site") continue;
        (p as any)[k] = v;
      }

      execSiteJS(p);
      p.render();
    }
  }, [page_id]);

  if (!p.mode) {
    if (p.site.responsive === "mobile-only") {
      p.mode = "mobile";
    } else if (p.site.responsive === "desktop-only") {
      p.mode = "desktop";
    } else {
      p.mode = (localStorage.getItem("editor-mode") || "desktop") as any;
    }
  }

  if (p.status === "init") {
    p.ui.loading = <Loading note="load-page" />;
    p.ui.preload = <Loading note="preload-root" backdrop={false} />;
    p.ui.notfound = (
      <div className="flex-1 flex items-center justify-center">NOT FOUND</div>
    );
    p.ui.error = (
      <div className="flex-1 flex items-center justify-center">
        PREVIEW ERROR
      </div>
    );
    initEditor(p, site_id);
  }

  routeEditor(p, page_id);

  if (p.status !== "ready") {
    if (p.status === "not-found") {
      return p.ui.notfound;
    }
    if (p.status === "error") {
      return p.ui.error;
    }
    if (!p.site.id) {
      return <Loading note="load-site" />;
    }
  }

  return <EMainEditor />;
};
