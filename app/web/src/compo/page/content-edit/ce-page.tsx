import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../../base/global/content-editor";
import { getArray } from "../../editor/tools/yjs-tools";
import { MItem } from "../../types/item";
import { responsiveMode } from "../tools/responsive-mode";
import { CEItem } from "./ce-item";
import { CESection } from "./ce-section";
import { Loading } from "../../ui/loading";

export const CEPage: FC<{ ceid: string }> = ({ ceid }) => {
  const c = useGlobal(CEGlobal, ceid);
  const mode = responsiveMode();

  useEffect(() => {
    const scope = c.scope[c.editor.activeScopeName || "root"];

    if (scope) {
      Object.entries(scope.effect).map(([k, v]) => {
        if (scope.value[k]) {
          if (scope.value[k][v.name]) {
            v.effect(scope.value[k][v.name]);
          }
        }
      });
    }
  }, []);

  return (
    <div
      className={cx(
        "w-full h-full relative flex items-center justify-center",
        mode === "mobile"
          ? css`
              background-color: white;
              background-image: linear-gradient(
                  45deg,
                  #fafafa 25%,
                  transparent 25%
                ),
                linear-gradient(-45deg, #fafafa 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #fafafa 75%),
                linear-gradient(-45deg, transparent 75%, #fafafa 75%);

              background-size: 20px 20px;
              background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
            `
          : "bg-white"
      )}
    >
      <div
        className={cx(
          "absolute flex flex-col items-stretch flex-1 bg-white  overflow-auto",
          mode === "mobile"
            ? css`
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
                width: 480px;
                top: 0px;
                bottom: 0px;
                contain: content;
              `
            : "inset-0",

          css`
            ${c.global.scss}
          `
        )}
      >
        {ceid.startsWith("COMP") ? (
          <CEItem ceid={ceid} item={c.root as MItem} preventRenderComponent />
        ) : (
          getArray(c.root, "childs")?.map((e) => {
            return <CESection ceid={ceid} item={e} key={e.get("id")} />;
          })
        )}
      </div>
    </div>
  );
};
