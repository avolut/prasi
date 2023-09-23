import { useGlobal } from "web-utils";
import { LiveGlobal } from "../logic/global";
import { LSection } from "./l-section";

export const LPage = () => {
  const p = useGlobal(LiveGlobal, "LIVE");
  if (!p.mpage) return null;
  const mode = p.mode;

  const rootChilds: string[] | undefined = p.mpage
    .getMap("map")
    .get("content_tree")
    ?.get("childs")
    ?.map((e) => e.get("id"));
    
  return (
    <div
      className={cx(
        "w-full relative flex flex-1 items-center justify-center",
        mode === "mobile" ? "h-screen" : "h-full"
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
        {rootChilds?.map((id) => (
          <LSection key={id} id={id} />
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
