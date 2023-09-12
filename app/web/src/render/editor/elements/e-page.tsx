import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../logic/global";
import { ESection } from "./e-section";
import { useEffect } from "react";

export const EPage = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({});
  p.softRender.page = () => {
    if (!p.focused) local.render();
  };

  useEffect(() => {
    if (
      p.item.active &&
      localStorage.getItem("prasi-item-active-id") !== p.item.active
    ) {
      localStorage.setItem("prasi-item-active-id", p.item.active);
    }
  }, [p.item.active]);

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
          "absolute flex flex-col items-stretch flex-1 bg-white ",
          mode === "mobile"
            ? css`
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
