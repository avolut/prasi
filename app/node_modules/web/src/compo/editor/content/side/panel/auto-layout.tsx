import { FC } from "react";
import { useLocal } from "web-utils";
import { responsiveVal } from "../../../../page/tools/responsive-val";
import { IItem } from "../../../../types/item";
import { FNLayout } from "../../../../types/meta-fn";
import { ISection } from "../../../../types/section";
import { IText } from "../../../../types/text";
import { Tooltip } from "../../../../ui/tooltip";
import { BoxSep } from "../ui/BoxSep";
import { Button } from "../ui/Button";
import { FieldBtnRadio } from "../ui/FieldBtnRadio";
import { FieldNumUnit } from "../ui/FieldNumUnit";
import { LayoutPacked } from "../ui/LayoutPacked";
import { LayoutSpaced } from "../ui/LayoutSpaced";

type AutoLayoutUpdate = {
  layout: FNLayout;
};

export const PanelAutoLayout: FC<{
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  update: <T extends keyof AutoLayoutUpdate>(
    key: T,
    val: AutoLayoutUpdate[T]
  ) => void;
}> = ({ value, update, mode }) => {
  const local = useLocal({ lastGap: 0 });

  const layout = responsiveVal<FNLayout>(value, "layout", mode, {
    dir: "col",
    align: "top-left",
    gap: 0,
  });

  return (
    <>
      <div className="flex items-stretch justify-between">
        <div className="flex flex-col items-stretch justify-around w-[125px] space-y-[5px]">
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
                col: (
                  <Tooltip content="Direction: Column">
                    <div>
                      <TapDown />
                    </div>
                  </Tooltip>
                ),
                "col-reverse": (
                  <Tooltip content="Direction: Column Reverse">
                    <div className="rotate-180">
                      <TapDown />
                    </div>
                  </Tooltip>
                ),
                row: (
                  <Tooltip content="Direction: Row">
                    <div>
                      <TapRight />
                    </div>
                  </Tooltip>
                ),
                "row-reverse": (
                  <Tooltip content="Direction: Row Reverse">
                    <div className="rotate-180">
                      <TapRight />
                    </div>
                  </Tooltip>
                ),
              }}
              value={layout.dir}
              disabled={false}
              update={(dir) => {
                let align = layout.align;
                if (layout.gap === "auto") {
                  if (dir.startsWith("col") && align === "top") align = "left";
                  if (dir.startsWith("col") && align === "bottom")
                    align = "right";
                  if (dir.startsWith("row") && align === "left") align = "top";
                  if (dir.startsWith("row") && align === "right")
                    align = "bottom";
                }

                update("layout", { ...layout, align, dir });
              }}
            />
          </BoxSep>

          <div className="flex items-stretch justify-between">
            <Tooltip content="Gap Size">
              <div className="border border-gray-300 max-w-[56px] h-[25px]">
                {layout.gap !== "auto" ? (
                  <FieldNumUnit
                    positiveOnly
                    hideUnit
                    icon={<GapIcon layout={layout} />}
                    value={layout.gap + "px"}
                    update={(val) => {
                      update("layout", {
                        ...layout,
                        gap: parseInt(val.replaceAll("px", "")),
                      });
                    }}
                  />
                ) : (
                  <BoxSep className="flex text-xs flex-1 bg-white">
                    <GapIcon layout={layout} />
                    <div
                      className={cx(
                        css`
                          width: 90px;
                          flex: 1;
                          font-size: 12px;
                          color: #999;
                        `
                      )}
                    >
                      Auto
                    </div>
                  </BoxSep>
                )}
              </div>
            </Tooltip>

            <Tooltip
              content={
                <>
                  Gap Mode:
                  <br /> Space Between / Packed
                </>
              }
            >
              <Button
                className={cx(
                  "flex-1",
                  css`
                    width: 30px;
                    min-width: 0px !important;
                    margin-left: 5px !important;
                    padding: 0 5px !important;
                    background: ${layout.gap === "auto"
                      ? "#3c82f6"
                      : "#fff"} !important;

                    border-color: ${layout.gap === "auto"
                      ? "#7baeff"
                      : "#d1d1d1"} !important;
                  `
                )}
                onClick={() => {
                  if (layout.gap !== "auto") {
                    local.lastGap = layout.gap;
                  }
                  const gap = layout.gap !== "auto" ? "auto" : local.lastGap;

                  let align = layout.align;
                  if (gap === "auto") {
                    if (align.includes("-")) {
                      align = "center";
                    }
                  } else {
                    if (align === "top" || align === "bottom") {
                      align = "top-left";
                    }
                  }

                  update("layout", {
                    ...layout,
                    align,
                    gap,
                  });
                }}
              >
                {layout.dir.startsWith("row") && (
                  <svg
                    width={14}
                    height={6}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.5 3a.375.375 0 0 1-.375.375H2.283l1.23 1.237a.36.36 0 0 1 0 .526.36.36 0 0 1-.526 0L1.112 3.263a.36.36 0 0 1 0-.526L2.987.863a.36.36 0 0 1 .526 0 .36.36 0 0 1 0 .524l-1.23 1.238h2.842A.375.375 0 0 1 5.5 3Zm7.387-.263L11.012.863a.36.36 0 0 0-.524 0 .359.359 0 0 0 0 .524l1.23 1.238H8.874a.375.375 0 0 0 0 .75h2.842l-1.23 1.237a.359.359 0 0 0 0 .526.36.36 0 0 0 .525 0l1.875-1.875a.359.359 0 0 0 0-.526Z"
                      fill={layout.gap === "auto" ? "#fff" : "#000"}
                    />
                  </svg>
                )}
                {layout.dir.startsWith("col") && (
                  <svg
                    width={6}
                    height={14}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8.5a.375.375 0 0 1 .375.375v2.842l1.237-1.23a.359.359 0 0 1 .526 0 .36.36 0 0 1 0 .525l-1.875 1.875a.359.359 0 0 1-.526 0L.863 11.012a.36.36 0 0 1 0-.524.359.359 0 0 1 .524 0l1.238 1.23V8.874A.375.375 0 0 1 3 8.5Zm-.263-7.387L.863 2.988a.36.36 0 0 0 0 .525.36.36 0 0 0 .524 0l1.238-1.23v2.842a.375.375 0 0 0 .75 0V2.283l1.237 1.23a.36.36 0 0 0 .526 0 .36.36 0 0 0 0-.525L3.263 1.113a.36.36 0 0 0-.526 0Z"
                      fill={layout.gap === "auto" ? "#fff" : "#000"}
                    />
                  </svg>
                )}
              </Button>
            </Tooltip>
            <Tooltip
              content={
                <>
                  Align Items:
                  <br /> Stretch / Normal
                </>
              }
            >
              <Button
                className={cx(
                  "flex-1",
                  css`
                    width: 30px;
                    min-width: 0px !important;
                    margin-left: 5px !important;
                    padding: 0 5px !important;
                    background: ${layout.align === "stretch"
                      ? "#3c82f6"
                      : "#fff"} !important;

                    border-color: ${layout.align === "stretch"
                      ? "#7baeff"
                      : "#d1d1d1"} !important;

                    color: ${layout.align === "stretch"
                      ? "white"
                      : "black"} !important;
                  `
                )}
                onClick={() => {
                  let align = layout.align;
                  if (layout.align !== "stretch") {
                    align = "stretch";
                  } else {
                    align = "center";
                  }

                  update("layout", {
                    ...layout,
                    align,
                  });
                }}
              >
                {layout.align === "stretch" && (
                  <>
                    {layout.dir.startsWith("row") ? (
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
                          d="M1 .5a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12A.5.5 0 011 .5zM9 14V1H6v13H1.5a.5.5 0 000 1h12a.5.5 0 000-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
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
                          d="M14.5 1a.5.5 0 00-.5.5V6H1V1.5a.5.5 0 10-1 0v12a.5.5 0 001 0V9h13v4.5a.5.5 0 101 0v-12a.5.5 0 00-.5-.5z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </>
                )}
                {layout.align !== "stretch" && (
                  <>
                    {layout.dir.startsWith("row") ? (
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
                          d="M7 1a1 1 0 00-1 1v5H1.5a.5.5 0 000 1H6v5a1 1 0 001 1h1a1 1 0 001-1V8h4.5a.5.5 0 000-1H9V2a1 1 0 00-1-1H7z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
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
                          d="M2 6a1 1 0 00-1 1v1a1 1 0 001 1h5v4.5a.5.5 0 001 0V9h5a1 1 0 001-1V7a1 1 0 00-1-1H8V1.5a.5.5 0 00-1 0V6H2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </>
                )}
              </Button>
            </Tooltip>
          </div>
        </div>
        {layout.gap === "auto" ? (
          <LayoutSpaced
            dir={layout.dir}
            align={layout.align}
            onChange={(align) => {
              update("layout", { ...layout, align });
            }}
          />
        ) : (
          <LayoutPacked
            dir={layout.dir}
            align={layout.align}
            onChange={(align) => {
              update("layout", { ...layout, align });
            }}
          />
        )}
      </div>
    </>
  );
};

const TapDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      d="M14 6a4 4 0 0 1-2.5 3.7V8.6a3 3 0 1 0-3 0v1.1A4 4 0 1 1 14 6ZM9.65 17.85c.2.2.5.2.7 0l3-3a.5.5 0 0 0-.7-.7l-2.15 2.14V5.5a.5.5 0 0 0-1 0v10.8l-2.15-2.15a.5.5 0 1 0-.7.7l3 3Z"
      fill="currentColor"
    ></path>
  </svg>
);

const TapRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      d="M6 6a4 4 0 0 1 3.7 2.5H8.6a3 3 0 1 0 0 3h1.1A4 4 0 1 1 6 6Zm8.85 7.35 3-3a.5.5 0 0 0 0-.7l-3-3a.5.5 0 1 0-.7.7l2.14 2.15H5.5a.5.5 0 0 0 0 1h10.8l-2.15 2.15a.5.5 0 0 0 .7.7Z"
      fill="currentColor"
    ></path>
  </svg>
);

const GapIcon: FC<{ layout: FNLayout }> = ({ layout }) => (
  <div
    className={cx(
      layout.gap !== "auto" ? "pr-2 border-r border-gray-300 mr-1" : "pr-1 pl-1"
    )}
  >
    {layout.dir === "col" ? (
      <svg
        className="svg"
        width={12}
        height={13}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 13v-2H1v2H0v-3h12v3h-1zm1-10H0V0h1v2h10V0h1v3zM9 7V6H3v1h6z" />
      </svg>
    ) : (
      <svg
        className="svg"
        width={13}
        height={12}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13 1h-2v10h2v1h-3V0h3v1zM3 0v12H0v-1h2V1H0V0h3zm4 3H6v6h1V3z" />
      </svg>
    )}
  </div>
);
