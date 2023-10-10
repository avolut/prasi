import { Suspense, lazy } from "react";
import { useGlobal } from "web-utils";
import { Loading } from "../../../utils/ui/loading";
import { mobileCSS } from "../elements/e-page";
import { editorStyle } from "../elements/style";
import { EditorGlobal } from "../logic/global";
import { Toolbar } from "./toolbar/Toolbar";

const ETree = lazy(async () => ({
  default: (await import("./tree/tree")).ETree,
}));

const EPage = lazy(async () => ({
  default: (await import("../elements/e-page")).EPage,
}));

const ESide = lazy(async () => ({
  default: (await import("./side/Side")).ESide,
}));

const PageManager = lazy(async () => ({
  default: (await import("./manager/page/page-mgr")).PageManager,
}));

const EScriptElement = lazy(async () => ({
  default: (await import("./script/script-element")).EScriptElement,
}));

const SiteManager = lazy(async () => ({
  default: (await import("./manager/site/site-mgr")).SiteManager,
}));

const CompManager = lazy(async () => ({
  default: (await import("./manager/comp/comp-mgr")).CompManager,
}));

export const EMainEditor = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  return (
    <div
      className={cx("editor flex-1 flex flex-col items-stretch", editorStyle)}
    >
      <Toolbar />
      <div className={cx("editor-box flex flex-row flex-1")}>
        {p.status !== "ready" ? (
          <Loading note={`editor-${p.status}`} />
        ) : (
          <>
            <Suspense fallback={<Loading note={`editor-lazy`} />}>
              <ETree />
              {location.search === "?norender" ? (
                <div className={cx("flex-1", mobileCSS)}></div>
              ) : (
                <EPage />
              )}
              <ESide />
            </Suspense>
          </>
        )}
      </div>
      {p.status === "ready" && (
        <Suspense fallback={<Loading note={`toolbar`} />}>
          {p.manager.site && <SiteManager />}
          {p.manager.page && <PageManager />}
          {p.manager.comp && <CompManager />}
          {p.script.active && !p.script.siteActive && <EScriptElement />}
        </Suspense>
      )}
    </div>
  );
};
