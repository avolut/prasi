import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../logic/global";
import { ESection } from "./e-section";
import { JS_DEBUG } from "../logic/tree-scope";

export const EPage = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({});
  p.softRender.page = () => {
    if (!p.focused) local.render();
  };

  if (JS_DEBUG) {
    console.clear();
  }
  if (!p.page) return null;
  const mode = p.mode;

  let childs = Object.values(p.page?.content_tree.childs || []);
  if (p.layout.section && p.layout.content) {
    childs = [p.layout.section];
  }

  const rootChilds: string[] | undefined = Object.values(childs).map(
    (e) => e.id
  );

  return (
    <div
      className={cx(
        "w-full h-full relative flex items-center justify-center",
        mode === "mobile" ? mobileCSS : "bg-white"
      )}
    >
      <div
        className={cx(
          "absolute flex flex-col items-stretch flex-1 bg-white ",
          mode === "mobile"
            ? css`
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
                width: 375px;
                top: 0px;
                overflow-x: hidden;
                overflow-y: auto;
                bottom: 0px;
              `
            : "inset-0  overflow-auto",

          css`
            contain: content;
          `
        )}
      >
        {rootChilds.map((id) => (
          <ESection key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export const mobileCSS = css`
  background-color: white;
  background-image: linear-gradient(45deg, #fafafa 25%, transparent 25%),
    linear-gradient(-45deg, #fafafa 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #fafafa 75%),
    linear-gradient(-45deg, transparent 75%, #fafafa 75%);

  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
`;
