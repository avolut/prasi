import { FC, useEffect } from "react";
import { useGlobal } from "web-utils";
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
      execSiteJS(p);
      p.render();
    }
  }, [page_id]);

  if (!p.mode) {
    p.mode = (localStorage.getItem("editor-mode") || "desktop") as any;
  }

  if (p.status === "init") {
    p.ui.loading = (
      <Loading
        note="editor-root"
        alt={
          <div
            className="bg-gray-200 cursor-pointer pointer-events-auto transition-all hover:bg-gray-500 text-white m-1 text-xs px-2 py-[1px] rounded"
            onClick={async () => {
              await api.page_reload(page_id);
              location.reload();
            }}
          >
            Force Reload
          </div>
        }
      />
    );
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
