import { useGlobal } from "web-utils";
import { EditorGlobal } from "../logic/global";
import { ESection } from "./e-section";

export const EPage = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  if (!p.page) return null;
  const mode = p.mode;
  return (
    <div
      className={cx(
        "w-full h-full relative flex items-center justify-center",
        mode === "mobile" ? mobileCSS : "bg-white"
      )}
    >
      <div
        className={cx(
          "absolute flex flex-col items-stretch flex-1 bg-white  overflow-auto",
          mode === "mobile"
            ? css`
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
                width: 420px;
                top: 0px;
                bottom: 0px;
              `
            : "inset-0",

          css`
            contain: content;
          `
        )}
        // ref={(e) => {
        //   if (!w.prasiEditorPage[c.id]) {
        //     w.prasiEditorPage[c.id] = { el: null, scroll: null };
        //   }
        //   const p = w.prasiEditorPage[c.id];
        //   if (p) {
        //     p.el = e;
        //     if (p.scroll && e) {
        //       e.scrollTop = p.scroll.t;
        //       e.scrollLeft = p.scroll.l;
        //       p.scroll = null;
        //     }
        //   }
        // }}
      >
        {p.page.content_tree.childs.map((e) => (
          <ESection key={e.id} item={e} />
        ))}
      </div>
    </div>
  );
};

const mobileCSS = css`
  background-color: white;
  background-image: linear-gradient(45deg, #fafafa 25%, transparent 25%),
    linear-gradient(-45deg, #fafafa 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #fafafa 75%),
    linear-gradient(-45deg, transparent 75%, #fafafa 75%);

  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
`;