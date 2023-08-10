import { FC } from "react";
import { useLocal } from "web-utils";
import { FieldColor } from "../ui/FieldColor";
import fontlist from "./font.json";
import { FieldNumUnit } from "../ui/FieldNumUnit";
import { Button } from "../ui/Button";
import { dropdownProp } from "../ui/style";
import { w } from "../../../../../utils/types/general";
import { BoxSep } from "../ui/BoxSep";
import { FieldBtnRadio } from "../ui/FieldBtnRadio";
import { FNFont } from "../../../../../utils/types/meta-fn";
import { responsiveVal } from "../../../tools/responsive-val";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { Dropdown } from "../../../../../utils/ui/dropdown";
import { ISection } from "../../../../../utils/types/section";
import { IItem } from "../../../../../utils/types/item";
import { IText } from "../../../../../utils/types/text";

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
    align: "left",
    whitespace: "whitespace-normal",
    wordBreak: "break-normal",
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
      </Tooltip>
      <div className={cx("flex flex-row justify-between text-xs ")}>
        <BoxSep
          className={cx(
            "justify-between",
            css`
              padding: 0px;
              & > button {
                min-width: 0px;
                flex: 1;
                padding: 2px 4px;
              }
            `
          )}
        >
          <FieldBtnRadio
            items={{
              left: (
                <Tooltip content="Direction: Column">
                  <div className="text-lg text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path d="M24 0v24H0V0h24zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018zm.265-.113l-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022zm-.715.002a.023.023 0 00-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092z"></path>
                        <path
                          fill="currentColor"
                          d="M14 18a1 1 0 01.117 1.993L14 20H4a1 1 0 01-.117-1.993L4 18h10zm6-5a1 1 0 110 2H4a1 1 0 110-2h16zm-6-5a1 1 0 01.117 1.993L14 10H4a1 1 0 01-.117-1.993L4 8h10zm6-5a1 1 0 01.117 1.993L20 5H4a1 1 0 01-.117-1.993L4 3h16z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </Tooltip>
              ),
              center: (
                <Tooltip content="Direction: Column Reverse">
                  <div className="text-lg text-gray-700">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none">
                        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                        <path
                          fill="currentColor"
                          d="M17 18a1 1 0 0 1 .117 1.993L17 20H7a1 1 0 0 1-.117-1.993L7 18h10Zm3-5a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h16Zm-3-5a1 1 0 0 1 .117 1.993L17 10H7a1 1 0 0 1-.117-1.993L7 8h10Zm3-5a1 1 0 0 1 .117 1.993L20 5H4a1 1 0 0 1-.117-1.993L4 3h16Z"
                        />
                      </g>
                    </svg>
                  </div>
                </Tooltip>
              ),
              right: (
                <Tooltip content="Direction: Row">
                  <div className="text-lg text-gray-700">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none">
                        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                        <path
                          fill="currentColor"
                          d="M20 18a1 1 0 0 1 .117 1.993L20 20H10a1 1 0 0 1-.117-1.993L10 18h10Zm0-5a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h16Zm0-5a1 1 0 0 1 .117 1.993L20 10H10a1 1 0 0 1-.117-1.993L10 8h10Zm0-5a1 1 0 0 1 .117 1.993L20 5H4a1 1 0 0 1-.117-1.993L4 3h16Z"
                        />
                      </g>
                    </svg>
                  </div>
                </Tooltip>
              ),
            }}
            value={font.align}
            disabled={false}
            update={(dir) => {
              update("font", { ...font, align: dir as any });
            }}
          />
        </BoxSep>
        <BoxSep
          className={cx(
            "justify-between",
            css`
              padding: 0px;
              & > button {
                min-width: 0px;
                flex: 1;
                padding: 2px 4px;
              }
            `
          )}
        >
          <FieldBtnRadio
            items={{
              "whitespace-normal": (
                <Tooltip content="Whitespace Normal">
                  <div className="text-lg text-gray-700">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M4 20V4h2v16H4Zm14 0V4h2v16h-2Zm-7.4-2.45L7.05 14l3.55-3.525l1.4 1.4L10.875 13H13q.825 0 1.413-.588T15 11q0-.825-.588-1.413T13 9H7V7h6q1.65 0 2.825 1.175T17 11q0 1.65-1.175 2.825T13 15h-2.125L12 16.125l-1.4 1.425Z"
                      />
                    </svg>
                  </div>
                </Tooltip>
              ),
              "whitespace-nowrap": (
                <Tooltip content="Whitespace no wrap">
                  <div className="text-lg text-gray-700">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeWidth="4"
                      >
                        <path d="M8 10V38" />
                        <path d="M24 4V16" />
                        <path d="M16 24H42" />
                        <path
                          strokeLinejoin="round"
                          d="M37.0561 19.0113L42.0929 24.0255L37.0561 29.123"
                        />
                        <path d="M24 32V44" />
                      </g>
                    </svg>
                  </div>
                </Tooltip>
              ),
            }}
            value={font.whitespace}
            disabled={false}
            update={(dir) => {
              update("font", { ...font, whitespace: dir as any });
            }}
          />
        </BoxSep>
      </div>
    </div>
  );
};
