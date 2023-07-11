import { FC } from "react";
import { useLocal } from "web-utils";
import { responsiveVal } from "../../../../page/tools/responsive-val";
import { IItem } from "../../../../types/item";
import { FNPadding } from "../../../../types/meta-fn";
import { ISection } from "../../../../types/section";
import { IText } from "../../../../types/text";
import { Tooltip } from "../../../../ui/tooltip";
import { Button } from "../ui/Button";
import { FieldNumUnit } from "../ui/FieldNumUnit";

type PaddingUpdate = {
  padding: FNPadding;
};

export const PanelPadding: FC<{
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  update: <T extends keyof PaddingUpdate>(
    key: T,
    val: PaddingUpdate[T]
  ) => void;
}> = ({ value, update, mode }) => {
  const local = useLocal({ all: false });

  const padding = responsiveVal<FNPadding>(value, "padding", mode, {
    l: 0,
    b: 0,
    t: 0,
    r: 0,
  });

  return (
    <div
      className={cx(
        "flex items-stretch justify-between text-xs ",
        css`
          .field-num {
            height: 25px;
            border: 1px solid #d1d1d1;
          }
        `,
        local.all
          ? css`
              .field-num {
                width: 43px !important;
                border-right: 0px !important;
              }
            `
          : css`
              .field-num {
                width: 66px !important;
              }
            `
      )}
    >
      {!local.all && (
        <>
          <Tooltip asChild content="Horizontal Padding">
            <div>
              <FieldNumUnit
                positiveOnly
                hideUnit
                icon={
                  <div className="w-[22px] h-[14px] flex items-center justify-center pr-2 border-r border-gray-300 mr-1">
                    <svg
                      width={12}
                      height={12}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 12V0h1v12H0zm3-9h6v6H3V3zm1 1v4h4V4H4zm7 8V0h1v12h-1z"
                        fillRule="evenodd"
                        fill="#000"
                      />
                    </svg>
                  </div>
                }
                value={padding.l + "px"}
                update={(val) => {
                  update("padding", {
                    ...padding,
                    l: parseInt(val.replaceAll("px", "")),
                    r: parseInt(val.replaceAll("px", "")),
                  });
                }}
              />
            </div>
          </Tooltip>
          <Tooltip asChild content="Vertical Padding">
            <div>
              <FieldNumUnit
                positiveOnly
                hideUnit
                icon={
                  <div className="w-[22px] h-[14px] flex items-center justify-center pr-2 border-r border-gray-300 mr-1">
                    <svg
                      width={12}
                      height={12}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3h6v6H3V3zm1 1v4h4V4H4zm8 8H0v-1h12v1zm0-11H0V0h12v1z"
                        fillRule="evenodd"
                        fill="#000"
                      />
                    </svg>
                  </div>
                }
                value={padding.t + "px"}
                update={(val) => {
                  update("padding", {
                    ...padding,
                    t: parseInt(val.replaceAll("px", "")),
                    b: parseInt(val.replaceAll("px", "")),
                  });
                }}
              />
            </div>
          </Tooltip>
        </>
      )}

      {local.all && (
        <>
          <Tooltip asChild content="Left Padding">
            <div>
              <FieldNumUnit
                positiveOnly
                hideUnit
                icon={<ArrowLeft />}
                value={padding.l + "px"}
                update={(val) => {
                  update("padding", {
                    ...padding,
                    l: parseInt(val.replaceAll("px", "")),
                  });
                }}
              />
            </div>
          </Tooltip>

          <Tooltip asChild content="Right Padding">
            <div>
              <FieldNumUnit
                positiveOnly
                hideUnit
                icon={<ArrowRight />}
                value={padding.r + "px"}
                update={(val) => {
                  update("padding", {
                    ...padding,
                    r: parseInt(val.replaceAll("px", "")),
                  });
                }}
              />
            </div>
          </Tooltip>
          <Tooltip asChild content="Top Padding">
            <div>
              <FieldNumUnit
                positiveOnly
                hideUnit
                icon={<ArrowUp />}
                value={padding.t + "px"}
                update={(val) => {
                  update("padding", {
                    ...padding,
                    t: parseInt(val.replaceAll("px", "")),
                  });
                }}
              />
            </div>
          </Tooltip>
          <Tooltip asChild content="Bottom Padding">
            <div>
              <FieldNumUnit
                positiveOnly
                hideUnit
                icon={<ArrowDown />}
                value={padding.b + "px"}
                update={(val) => {
                  update("padding", {
                    ...padding,
                    b: parseInt(val.replaceAll("px", "")),
                  });
                }}
              />
            </div>
          </Tooltip>
        </>
      )}

      <Tooltip asChild content="Toggle Padding" placement="top-end">
        <div>
          <Button
            className={cx(
              "flex-1",
              css`
                width: 30px;
                max-width: 30px;
                min-width: 0px !important;
                background: ${local.all ? "#3c82f6" : "#fff"} !important;
                border-color: ${local.all ? "#7baeff" : "#d1d1d1"} !important;
              `
            )}
            onClick={() => {
              local.all = !local.all;
              local.render();
            }}
          >
            <svg width={12} height={12} xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 0h6v1H3V0zM0 3v6h1V3H0zm11 0v6h1V3h-1zm-8 9h6v-1H3v1z"
                fillRule="evenodd"
                fillOpacity={0.8}
                fill={local.all ? "#fff" : "#000"}
              />
            </svg>
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

const ArrowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.854 3.146a.5.5 0 010 .708L3.707 7H12.5a.5.5 0 010 1H3.707l3.147 3.146a.5.5 0 01-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 01.708 0z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.146 3.146a.5.5 0 01.708 0l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L11.293 8H2.5a.5.5 0 010-1h8.793L8.146 3.854a.5.5 0 010-.708z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const ArrowDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.5 2a.5.5 0 01.5.5v8.793l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 11.708-.708L7 11.293V2.5a.5.5 0 01.5-.5z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const ArrowUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.146 2.146a.5.5 0 01.708 0l4 4a.5.5 0 01-.708.708L8 3.707V12.5a.5.5 0 01-1 0V3.707L3.854 6.854a.5.5 0 11-.708-.708l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);
