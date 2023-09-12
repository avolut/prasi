import { useGlobal } from "web-utils";
import { PreviewGlobal } from "../logic/global";
import { PSection } from "./p-section";

export const PPage = () => {
  const p = useGlobal(PreviewGlobal, "PREVIEW");

  return (
    <div
      className={cx(
        "flex flex-col items-stretch flex-1 bg-white",
        window.innerWidth > 800 &&
          p.mode === "mobile" &&
          css`
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            max-width: 375px;
            margin: 0px auto;
            top: 0px;
            overflow-x: hidden;
            overflow-y: auto;
            bottom: 0px;
            contain: content;
          `
      )}
    >
      {p.status !== "ready" ? (
        <>
          {p.status === "error"
            ? p.ui.error
            : p.status === "not-found"
            ? p.ui.notfound
            : p.ui.loading}
        </>
      ) : (
        <>
          {p.page ? (
            <>
              {p.page.content_tree.childs.map((e) => (
                <PSection key={e.id} item={e} />
              ))}
            </>
          ) : (
            p.ui.loading
          )}
        </>
      )}
    </div>
  );
};
