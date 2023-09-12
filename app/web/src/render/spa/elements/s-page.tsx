import { useGlobal } from "web-utils";
import { SPAGlobal } from "../logic/global";
import { SSection } from "./s-section";

export const SPage = () => {
  const p = useGlobal(SPAGlobal, "SPA");

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
          `
      )}
    >
      {p.status !== "ready" ? (
        <>
          {p.status === "not-found" ? (
            <>
              <div className="flex-1 flex items-center justify-center">
                404 Not Found
              </div>
            </>
          ) : (
            p.ui.loading
          )}
        </>
      ) : (
        <>
          {p.page
            ? p.page.content_tree.childs.map((e) => (
                <SSection key={e.id} item={e} />
              ))
            : p.ui.loading}
        </>
      )}
    </div>
  );
};
