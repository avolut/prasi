import { FC } from "react";
import { FNDimension } from "../../../../types/meta-fn";
import { ISection } from "../../../../types/section";
import { IItem } from "../../../../types/item";
import { IText } from "../../../../types/text";
import { responsiveVal } from "../../../../page/tools/responsive-val";
import { FieldNumUnit } from "../ui/FieldNumUnit";
import { Button } from "../ui/Button";
import { useLocal } from "web-utils";
import { Tooltip } from "../../../../ui/tooltip";
import { Menu, MenuItem } from "../../../../ui/context-menu";

type DimensionUpdate = {
  dim: FNDimension;
};
export const PanelDimension: FC<{
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  activeEl?: HTMLElement | null;
  update: <T extends keyof DimensionUpdate>(
    key: T,
    val: DimensionUpdate[T]
  ) => void;
  w?: FNDimension["w"];
}> = ({ value, update, w, mode, activeEl }) => {
  const local = useLocal({ menuWidth: null as any, menuHeight: null as any });
  const dim = responsiveVal<FNDimension>(value, "dim", mode, {
    w: w || "fit",
    h: "fit",
  });
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
              if (typeof dim.w !== "number" && setVal) {
                const nval = activeEl?.offsetWidth || 0;
                val = nval + "";
                setVal(nval);
              }

              update("dim", {
                ...dim,
                w: parseInt(val),
              });
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
                update("dim", {
                  ...dim,
                  w: "fit",
                });
              }}
            />
            <MenuItem
              label="Full"
              onClick={() => {
                update("dim", {
                  ...dim,
                  w: "full",
                });
              }}
            />
            <MenuItem
              label="Custom"
              onClick={() => {
                update("dim", {
                  ...dim,
                  w: activeEl?.offsetWidth || 0,
                });
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
              if (typeof dim.h !== "number" && setVal) {
                const nval = activeEl?.offsetHeight || 0;
                val = nval + "";
                setVal(nval);
              }

              update("dim", {
                ...dim,
                h: parseInt(val),
              });
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
                update("dim", {
                  ...dim,
                  h: "fit",
                });
              }}
            />
            <MenuItem
              label="Full"
              onClick={() => {
                update("dim", {
                  ...dim,
                  h: "full",
                });
              }}
            />
            <MenuItem
              label="Custom"
              onClick={() => {
                update("dim", {
                  ...dim,
                  h: activeEl?.offsetHeight || 0,
                });
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
    </div>
  );
};
