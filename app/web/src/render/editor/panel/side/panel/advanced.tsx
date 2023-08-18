import { FC } from "react";
import { useGlobal } from "web-utils";
import { IItem } from "../../../../../utils/types/item";
import { FNAdv } from "../../../../../utils/types/meta-fn";
import { ISection } from "../../../../../utils/types/section";
import { IText } from "../../../../../utils/types/text";
import { EditorGlobal } from "../../../logic/global";
import { Button } from "../ui/Button";

type AdvUpdate = {
  adv?: FNAdv;
};

export const PanelAdv: FC<{
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  update: <T extends keyof AdvUpdate>(key: T, val: AdvUpdate[T]) => void;
}> = ({ value, update }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const adv = p.mpage?.get("adv")?.toJSON() || ({} as any);

  return (
    <>
      <div
        className={cx(
          "flex items-stretch justify-between space-x-2",
          css`
            button {
              min-width: 0px;
            }
          `
        )}
      >
        <div
          className={cx(
            "bg-white p-[2px] border flex flex-1 border-gray-300",
            css`
              > * {
                flex: 1;
              }
            `,
            !!adv.css &&
              css`
                button {
                  background: #e8ffe8;
                  border-bottom: solid green !important;
                }
              `
          )}
        >
          <Button
            onClick={() => {
              p.script.active = true;
              p.script.type = "css";
              p.render();
            }}
            appearance="subtle"
          >
            CSS
          </Button>
        </div>
        <div
          className={cx(
            "bg-white p-[2px] border flex flex-1 border-gray-300",
            css`
              > * {
                flex: 1;
              }
            `,
            !!adv.html && [
              css`
                button {
                  background: #e8f5ff;
                  border-bottom: 2px solid blue !important;
                }
              `,
            ]
          )}
        >
          <Button
            onClick={() => {
              p.script.active = true;
              p.script.type = "html";
              p.render();
            }}
            appearance="subtle"
          >
            HTML
          </Button>
        </div>
        <div
          className={cx(
            "bg-white p-[2px] border flex flex-1 border-gray-300",
            css`
              > * {
                flex: 1;
              }
            `,
            !!adv.js && [
              css`
                button {
                  background: #fff4e8;
                  border-bottom: 2px solid orange !important;
                }
              `,
            ]
          )}
        >
          <Button
            appearance="subtle"
            className="js"
            onClick={() => {
              p.script.active = true;
              p.script.type = "js";
              p.render();
            }}
          >
            JS
          </Button>
        </div>
      </div>
    </>
  );
};
