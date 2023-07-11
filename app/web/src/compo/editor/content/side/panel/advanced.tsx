import { FC } from "react";
import { IItem } from "../../../../types/item";
import { FMAdv, FNAdv } from "../../../../types/meta-fn";
import { ISection } from "../../../../types/section";
import { IText } from "../../../../types/text";
import { Button } from "../ui/Button";
import { useGlobal } from "web-utils";
import { CEGlobal } from "../../../../../base/global/content-editor";
import { getMText, getMap } from "../../../tools/yjs-tools";

type AdvUpdate = {
  adv?: FNAdv;
};

export const PanelAdv: FC<{
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  id: string;
  update: <T extends keyof AdvUpdate>(key: T, val: AdvUpdate[T]) => void;
}> = ({ value, update, id }) => {
  const c = useGlobal(CEGlobal, id);
  const adv = c.editor.active?.get("adv")?.toJSON() || ({} as any);

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
              if (c.editor.active) {
                const map = getMap<FMAdv>(c.editor.active, "adv");
                c.editor.script.active = {
                  src: getMText(map, "css"),
                  type: "css",
                  default: `\
& {
  display: flex;
  
  &:hover {
    display: flex;
  }
}`,
                };
                c.render();
              }
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
              if (c.editor.active) {
                const map = getMap<FMAdv>(c.editor.active, "adv");
                c.editor.script.active = {
                  src: getMText(map, "html"),
                  type: "html",
                };
                c.render();
              }
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
              if (c.editor.active) {
                const map = getMap<FMAdv>(c.editor.active, "adv");
                c.editor.script.active = {
                  src: getMText(map, "js"),
                  type: "js",
                  default: `\
<div {...props}>
  {children}
</div>`,
                };
                c.render();
              }
            }}
          >
            JS
          </Button>
        </div>
      </div>
    </>
  );
};
