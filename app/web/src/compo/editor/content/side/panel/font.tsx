import { FC } from "react";
import { useLocal } from "web-utils";
import { responsiveVal } from "../../../../page/tools/responsive-val";
import { IItem } from "../../../../types/item";
import { FNFont } from "../../../../types/meta-fn";
import { ISection } from "../../../../types/section";
import { IText } from "../../../../types/text";
import { FieldColor } from "../ui/FieldColor";
import fontlist from "./font.json";
import { FieldNumUnit } from "../ui/FieldNumUnit";
import { Button } from "../ui/Button";
import { dropdownProp } from "../ui/style";
import { w } from "../../../../types/general";
import { Tooltip } from "../../../../ui/tooltip";
import { Dropdown } from "../../../../ui/dropdown";

type FontUpdate = {
  font: FNFont;
};

const EmptyFont = {
  name: "DEFAULT",
  weight: ["200", "300", "400", "600", "700", "900"],
};

const fflist = [EmptyFont, ...fontlist];

export const PanelFont: FC<{
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  update: <T extends keyof FontUpdate>(key: T, val: FontUpdate[T]) => void;
}> = ({ value, update, mode }) => {
  const local = useLocal({ font: EmptyFont });
  const font = responsiveVal<FNFont>(value, "font", mode, {
    size: 15,
    height: "auto",
  });

  if (font.height === 0) font.height = "auto";

  if (font.family) {
    const ffont = fontlist.find((f: any) => f.name === font.family);
    if (ffont) {
      local.font = ffont;
    }
  } else {
    local.font = EmptyFont;
  }

  return (
    <div className="flex flex-col items-stretch space-y-2">
      <div
        className={cx("flex items-stretch space-x-2 text-xs justify-between")}
      >
        <Tooltip content={"Text Color"} asChild>
          <div
            className={cx(
              "bg-white p-[2px] border border-gray-300 flex items-stretch",
              css`
                .color-box {
                  height: 25px !important;
                }
              `
            )}
          >
            <FieldColor
              popupID="font-color"
              value={font.color}
              update={(color) => {
                update("font", { ...font, color });
              }}
            />
          </div>
        </Tooltip>
        <Tooltip content={"Font Size"} asChild>
          <div
            className={cx(
              "bg-white p-[2px] border border-gray-300 flex items-stretch",
              css`
                input {
                  width: 20px !important;
                }
                .field-num {
                  width: 55px !important;
                }
              `
            )}
          >
            <FieldNumUnit
              positiveOnly
              hideUnit
              icon={
                <div className="w-[22px] h-[14px] flex items-center justify-center pr-2 border-r border-gray-300 mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="11"
                    fill="none"
                    viewBox="0 0 15 11"
                  >
                    <path
                      fill="#000"
                      fillRule="evenodd"
                      d="M14.125 5.167c.387 0 .7.28.7.625v3.75c0 .345-.313.624-.7.624a.708.708 0 01-.638-.367 3.04 3.04 0 01-1.462.367c-1.546 0-2.8-1.119-2.8-2.5 0-1.38 1.254-2.5 2.8-2.5a3.04 3.04 0 011.462.368.709.709 0 01.638-.367zm-9.1-5c.513 0 .967.295 1.124.73L9.192 9.35c.118.329-.084.68-.452.787-.369.105-.763-.076-.881-.404L6.89 7.042H3.16l-.968 2.69c-.118.33-.513.51-.88.405C.942 10.03.74 9.678.858 9.35L3.902.898c.157-.436.61-.731 1.123-.731zm7 6.25c-.773 0-1.4.56-1.4 1.25s.627 1.25 1.4 1.25c.774 0 1.4-.56 1.4-1.25s-.627-1.25-1.4-1.25zm-7-4.555l-1.414 3.93h2.83l-1.416-3.93z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              }
              value={(font.size === 0 ? 15 : font.size) + "px"}
              update={(size) => {
                update("font", {
                  ...font,
                  size: parseInt(size.replaceAll("px", "")),
                });
              }}
            />
          </div>
        </Tooltip>
        <div
          className={cx(
            "bg-white p-[2px] border border-gray-300 flex items-stretch",
            css`
              input {
                width: 24px !important;
              }
              .field-num {
                width: 60px !important;
              }
            `
          )}
        >
          <Tooltip content={"Font Height"} asChild>
            <div className="flex-1 flex items-center">
              <FieldNumUnit
                positiveOnly
                icon={
                  <div
                    className={cx(
                      "w-[22px] h-[14px] flex items-center justify-center pr-2 border-r border-gray-300 mr-1"
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      className="svg"
                      viewBox="0 0 14 14"
                    >
                      <path d="M14 1H0V0h14v1zm0 13H0v-1h14v1z"></path>
                      <path
                        fillRule="evenodd"
                        d="M3.548 11l2.8-8h1.304l2.8 8h-.954l-.7-2H5.202l-.7 2h-.954zM7 3.862L8.448 8H5.552L7 3.862z"
                      ></path>
                    </svg>
                  </div>
                }
                hideUnit
                disabled={font.height === "auto" ? "Auto" : false}
                value={(font.height || 100) + "%"}
                update={(size) => {
                  update("font", {
                    ...font,
                    height: parseInt(size.replaceAll("px", "")),
                  });
                }}
              />
            </div>
          </Tooltip>
          <Tooltip placement="top-end" content={"Toggle: Auto font height"}>
            <Button
              className={cx(
                "flex-1",
                css`
                  width: 4px;
                  min-width: 0px !important;
                  margin-left: 5px !important;
                  padding: 0 3px !important;
                  background: ${font.height === "auto"
                    ? "#70a3f4"
                    : "#fff"} !important;
                  border: ${font.height === "auto"
                    ? "2px solid transparent"
                    : "2px solid #708dcb"} !important;
                `
              )}
              onClick={() => {
                if (font.height !== "auto") {
                  update("font", {
                    ...font,
                    height: "auto",
                  });
                } else {
                  update("font", {
                    ...font,
                    height: 100,
                  });
                }
              }}
            ></Button>
          </Tooltip>
        </div>
      </div>

      <Tooltip
        content={
          <>
            Font Family
            <br />
            Changing font family for current element.
          </>
        }
        asChild
      >
        <div
          className={cx(
            "bg-white p-[2px] border border-gray-300 flex items-stretch",
            css`
              > * {
                flex: 1;
              }

              .fui-Combobox {
                flex: 1;
              }
            `
          )}
        >
          <Dropdown
            {...dropdownProp}
            value={local.font.name || "DEFAULT"}
            items={Object.entries(fflist).map((e, idx) => {
              return {
                label: e[1].name,
                value: e[1].name,
              };
            })}
            popover={{
              ...dropdownProp.popover,
              renderItem(item, idx) {
                if (typeof item === "string") return null;
                if (!w.loadedFonts) w.loadedFonts = [];
                if (
                  !isSSR &&
                  w.loadedFonts.indexOf(item.value) < 0 &&
                  item.value !== "DEFAULT"
                ) {
                  w.loadedFonts.push(item.value);
                  const doc = document;
                  let weight = `:wght@${[300, 400, 500, 600].join(";")}`;
                  let fontName = item.value.replace(/ /g, "+");
                  const _href = `https://fonts.googleapis.com/css2?family=${fontName}${weight}&display=block`;
                  if (!doc.querySelector(`link[href="${_href}]`)) {
                    const link = doc.createElement("link");
                    link.type = "text/css";
                    link.rel = "stylesheet";
                    link.href = _href;
                    doc.head.appendChild(link);
                  }
                }
                return (
                  <div
                    className={cx(
                      item.value !== "DEFAULT" &&
                        css`
                          font-family: "${item.value}", "Inter";
                        `
                    )}
                  >
                    {item.label}
                  </div>
                );
              },
            }}
            onChange={(val) => {
              if (val) {
                if (val === EmptyFont.name) {
                  update("font", { ...font, family: undefined });
                } else {
                  update("font", { ...font, family: val });
                }
              }
            }}
          />
        </div>
      </Tooltip>
    </div>
  );
};
