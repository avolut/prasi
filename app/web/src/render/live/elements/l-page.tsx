import { useGlobal } from "web-utils";
import { LiveGlobal } from "../logic/global";
import { LSection } from "./l-section";
import { Loading } from "../../../utils/ui/loading";

export const LPage = () => {
  const p = useGlobal(LiveGlobal, "LIVE");
  const mode = p.mode;

  let childs = Object.values(p.page?.content_tree.childs || []);
  if (p.layout.section && p.layout.content) {
    childs = [p.layout.section];
  }

  const rootChilds: string[] | undefined = Object.values(childs).map(
    (e) => e.id
  );

  return (
    <div className={cx("relative flex flex-1 items-center justify-center")}>
      <div
        className={cx(
          "absolute flex flex-col items-stretch flex-1 bg-white ",
          mode === "mobile"
            ? css`
                @media (min-width: 768px) {
                  border-left: 1px solid #ccc;
                  border-right: 1px solid #ccc;
                  width: 375px;
                  top: 0px;
                  overflow-x: hidden;
                  overflow-y: auto;
                  bottom: 0px;
                }
                @media (max-width: 767px) {
                  left: 0px;
                  right: 0px;
                  top: 0px;
                  bottom: 0px;
                  overflow-y: auto;
                }
              `
            : "inset-0 overflow-auto",

          css`
            contain: content;
          `
        )}
      >
        {p.status === "ready" || p.status === "tree-rebuild" ? (
          rootChilds?.map((id) => <LSection key={id} id={id} />)
        ) : (
          <Loading />
        )}
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
