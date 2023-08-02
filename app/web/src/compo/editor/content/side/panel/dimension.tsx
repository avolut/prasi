import { FC, useEffect } from "react";
import { FNDimension } from "../../../../types/meta-fn";
import { ISection } from "../../../../types/section";
import { IItem } from "../../../../types/item";
import { IText } from "../../../../types/text";
import { responsiveVal } from "../../../../page/tools/responsive-val";
import { FieldNumUnit } from "../ui/FieldNumUnit";
import { Button } from "../ui/Button";
import { useGlobal, useLocal } from "web-utils";
import { Tooltip } from "../../../../ui/tooltip";
import { Menu, MenuItem } from "../../../../ui/context-menu";
import { CEGlobal } from "../../../../../base/global/content-editor";

type DimensionUpdate = {
  dim: FNDimension;
};
export const PanelDimension: FC<{
  id: string;
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  update: <T extends keyof DimensionUpdate>(
    key: T,
    val: DimensionUpdate[T]
  ) => void;
}> = ({ value, update, mode, id }) => {
  const c = useGlobal(CEGlobal, id);
  const activeEl = c.editor.activeEl;
  const local = useLocal({
    menuWidth: null as any,
    menuHeight: null as any,
    activeWidth: 0,
    activeHeight: 0,
    dim: responsiveVal<FNDimension>(value, "dim", mode, {
      w: "fit",
      h: "fit",
    }),
  });

  if (activeEl) {
    local.activeWidth = activeEl.offsetWidth;
    local.activeHeight = activeEl.offsetHeight;
  }

  useEffect(() => {
    local.dim = responsiveVal<FNDimension>(value, "dim", mode, {
      w: "fit",
      h: "fit",
    });
    local.render();
  }, [value]);

  const dim = local.dim;

  const calculateAspectRatioFit = (props: {
    srcWidth: any;
    srcHeight: any;
    maxWidth: any;
    maxHeight: any;
  }) => {
    const { srcWidth, srcHeight, maxWidth, maxHeight } = props;
    var height = maxHeight;
    var width = maxWidth;
    if (
      typeof maxWidth === "number" &&
      typeof maxHeight === "number" &&
      typeof srcWidth === "number" &&
      typeof srcHeight === "number"
    ) {
      height =
        srcHeight === maxHeight ? (maxWidth * srcHeight) / srcWidth : maxHeight;
      width =
        srcWidth === maxWidth ? maxHeight * (srcWidth / srcHeight) : maxWidth;
      width = Number(width.toFixed(2));
      height = Number(height.toFixed(2));
    }
    return {
      width: width,
      height: height,
    };
  };
  return (
    <div
      className={cx(
        "flex items-stretch justify-between text-xs ",
        css`
          .field-num {
            width: 66px !important;
            border: 1px solid #d1d1d1;
          }
        `
      )}
    >
      <div className="flex">
        <Tooltip content="Width">
          <FieldNumUnit
            positiveOnly
            hideUnit
            icon={
              <div className="text-[10px] w-[24px] pr-[2px] mr-[3px] h-[14px] flex items-center justify-center border-r">
                W
              </div>
            }
            enableWhenDrag
            disabled={dim.w === "fit" || dim.w === "full" ? dim.w : false}
            value={dim.w + "px"}
            unit="px"
            update={(val, setVal) => {
              let _val = val;
              if (typeof dim.w !== "number" && setVal) {
                const nval = local.activeWidth || 0;
                _val = nval + "";
                setVal(nval);
              }

              if (dim.proportion) {
                let res: any = calculateAspectRatioFit({
                  srcWidth: dim.w,
                  srcHeight: dim.h,
                  maxWidth: parseInt(_val),
                  maxHeight: dim.h,
                });
                update("dim", {
                  ...dim,
                  h: res.height,
                  w: parseInt(_val),
                });
                local.dim.h = res.height;
                local.dim.w = parseInt(_val);
              } else {
                local.dim.w = parseInt(_val);
                update("dim", {
                  ...dim,
                  w: parseInt(_val),
                });
              }
            }}
          />
        </Tooltip>
        {local.menuWidth && (
          <Menu
            mouseEvent={local.menuWidth}
            onClose={() => {
              local.menuWidth = null;
              local.render();
            }}
          >
            <MenuItem
              label="Fit"
              onClick={() => {
                local.dim.w = "fit";
                if (dim.proportion) {
                  local.dim.h = "fit";
                  update("dim", {
                    ...dim,
                    w: "fit",
                    h: "fit",
                  });
                } else {
                  update("dim", {
                    ...dim,
                    h: "fit",
                  });
                }
              }}
            />
            <MenuItem
              label="Full"
              onClick={() => {
                local.dim.w = "full";
                if (dim.proportion) {
                  local.dim.h = "full";
                  update("dim", {
                    ...dim,
                    w: "full",
                    h: "full",
                  });
                } else {
                  update("dim", {
                    ...dim,
                    w: "full",
                  });
                }
              }}
            />
            <MenuItem
              label="Custom"
              onClick={() => {
                local.dim.w = local.activeWidth || 0;
                if (dim.proportion) {
                  local.dim.h = local.activeWidth || 0;
                  update("dim", {
                    ...dim,
                    w: local.activeWidth || 0,
                    h: local.activeWidth || 0,
                  });
                } else {
                  update("dim", {
                    ...dim,
                    w: local.activeWidth || 0,
                  });
                }
              }}
            />
          </Menu>
        )}

        <Button
          className={cx(
            "flex-1",
            css`
              width: 24px;
              max-width: 24px;
              border-left: 0px !important;
              padding: 0px !important;
              min-width: 0px !important;
            `
          )}
          onClick={(e) => {
            local.menuWidth = e;
            local.render();
          }}
        >
          {dim.w === "full" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M3.5 7.5v-2h-1v5h1v-2h9v2h1v-5h-1v2h-9z"
                fill="#000"
              ></path>
            </svg>
          )}
          {dim.w === "fit" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.354 4.646l-.708.708L5.293 8l-2.646 2.646.707.708L6.707 8 3.354 4.646zm10 .708L10.707 8l2.647 2.646-.708.708L9.293 8l3.354-3.354.707.708z"
                fill="#000"
              ></path>
            </svg>
          )}

          {dim.w !== "fit" && dim.w !== "full" && (
            <div className="w-[16px] h-[16px] flex items-center justify-center">
              px
            </div>
          )}
        </Button>
      </div>

      <div className="flex">
        <Tooltip content="Height">
          <FieldNumUnit
            positiveOnly
            hideUnit
            icon={
              <div className="text-[10px] w-[24px] pr-[2px] mr-[3px] h-[14px] flex items-center justify-center border-r">
                H
              </div>
            }
            disabled={dim.h === "fit" || dim.h === "full" ? dim.h : false}
            enableWhenDrag
            value={dim.h + "px"}
            unit="px"
            update={(val, setVal) => {
              let _val = val;
              if (typeof dim.h !== "number" && setVal) {
                const nval = local.activeHeight || 0;
                _val = nval + "";
                setVal(nval);
              }

              if (dim.proportion) {
                let res: any = calculateAspectRatioFit({
                  srcWidth: dim.w,
                  srcHeight: dim.h,
                  maxWidth: dim.w,
                  maxHeight: parseInt(_val),
                });
                update("dim", {
                  ...dim,
                  h: parseInt(_val),
                  w: res.width,
                });
                local.dim.h = parseInt(_val);
                local.dim.w = res.width;
              } else {
                update("dim", {
                  ...dim,
                  h: parseInt(_val),
                });
                local.dim.h = parseInt(_val);
              }
            }}
          />
        </Tooltip>
        {local.menuHeight && (
          <Menu
            mouseEvent={local.menuHeight}
            onClose={() => {
              local.menuHeight = null;
              local.render();
            }}
          >
            <MenuItem
              label="Fit"
              onClick={() => {
                local.dim.h = "fit";
                if (dim.proportion) {
                  local.dim.w = "fit";
                  update("dim", {
                    ...dim,
                    w: "fit",
                    h: "fit",
                  });
                } else {
                  update("dim", {
                    ...dim,
                    h: "fit",
                  });
                }
              }}
            />
            <MenuItem
              label="Full"
              onClick={() => {
                local.dim.h = "full";
                if (dim.proportion) {
                  local.dim.w = "full";
                  update("dim", {
                    ...dim,
                    w: "full",
                    h: "full",
                  });
                } else {
                  update("dim", {
                    ...dim,
                    h: "full",
                  });
                }
              }}
            />
            <MenuItem
              label="Custom"
              onClick={() => {
                local.dim.h = local.activeHeight || 0;
                if (dim.proportion) {
                  local.dim.w = local.activeHeight || 0;
                  update("dim", {
                    ...dim,
                    h: local.activeHeight || 0,
                    w: local.activeHeight || 0,
                  });
                } else {
                  update("dim", {
                    ...dim,
                    h: local.activeHeight || 0,
                  });
                }
              }}
            />
          </Menu>
        )}
        <Button
          className={cx(
            "flex-1",
            css`
              width: 24px;
              max-width: 24px;
              border-left: 0px !important;
              padding: 0px !important;
              min-width: 0px !important;
            `
          )}
          onClick={(e) => {
            local.menuHeight = e;
            local.render();
            // let val = dim.h;
            // if (dim.h === "fit") val = "full";
            // else if (dim.h === "full") val = activeEl?.offsetHeight || 0;
            // else val = "fit";

            // update("dim", {
            //   ...dim,
            //   h: val,
            // });
          }}
        >
          {dim.h === "full" && (
            <svg
              className="w-[16px] h-[16px]"
              xmlns="http://www.h3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8.5 3.5h2v-1h-5v1h2v9h-2v1h5v-1h-2v-9z"
                fill="#000"
              ></path>
            </svg>
          )}
          {dim.h === "fit" && (
            <svg
              xmlns="http://www.h3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.646 12.646l.708.708L8 10.707l2.646 2.646.708-.707L8 9.293l-3.354 3.354zm.708-10L8 5.294l2.646-2.647.708.708L8 6.707 4.646 3.354l.708-.707z"
                fill="#000"
              ></path>
            </svg>
          )}

          {dim.h !== "fit" && dim.h !== "full" && (
            <div className="w-[16px] h-[16px] flex items-center justify-center">
              px
            </div>
          )}
        </Button>
      </div>

      <div className="flex">
        <Tooltip content="Constrain proportions">
          <Button
            className={cx(
              "flex-1",
              css`
                width: 20px;
                max-width: 20px;
                padding: 0px !important;
                min-width: 0px !important;
              `
            )}
            onClick={(e) => {
              update("dim", {
                ...dim,
                proportion: !dim.proportion,
              });
            }}
          >
            <div className="w-[10px] h-[16px] flex items-center justify-center">
              {dim.proportion ? (
                <>
                  <svg
                    className="svg"
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 3.5V5h1V3.5C7 1.567 5.433 0 3.5 0 1.567 0 0 1.567 0 3.5V5h1V3.5C1 2.12 2.12 1 3.5 1 4.88 1 6 2.12 6 3.5zM6 9h1v1.5C7 12.433 5.433 14 3.5 14 1.567 14 0 12.433 0 10.5V9h1v1.5C1 11.88 2.12 13 3.5 13 4.88 13 6 11.88 6 10.5V9zM3 4v6h1V4H3z"
                      fillRule="evenodd"
                      fillOpacity="1"
                      fill="#000"
                      stroke="none"
                    ></path>
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    className="svg"
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 5V3.5C6 2.12 4.88 1 3.5 1 2.12 1 1 2.12 1 3.5V5H0V3.5C0 1.567 1.567 0 3.5 0 5.433 0 7 1.567 7 3.5V5H6zm1 4H6v1.5C6 11.88 4.88 13 3.5 13 2.12 13 1 11.88 1 10.5V9H0v1.5C0 12.433 1.567 14 3.5 14 5.433 14 7 12.433 7 10.5V9z"
                      fillRule="evenodd"
                      fillOpacity="1"
                      fill="#000"
                      stroke="none"
                    ></path>
                  </svg>
                </>
              )}
            </div>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
