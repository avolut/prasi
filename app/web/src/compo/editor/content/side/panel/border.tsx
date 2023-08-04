import get from "lodash.get";
import transform from "lodash.transform";
import uniq from "lodash.uniq";
import { FC } from "react";
import { useLocal } from "web-utils";
import { responsiveVal } from "../../../../page/tools/responsive-val";
import { IItem } from "../../../../types/item";
import { FNBorder } from "../../../../types/meta-fn";
import { ISection } from "../../../../types/section";
import { IText } from "../../../../types/text";
import { Dropdown } from "../../../../ui/dropdown";
import { Tooltip } from "../../../../ui/tooltip";
import { Button } from "../ui/Button";
import { FieldColor } from "../ui/FieldColor";
import { FieldNumUnit } from "../ui/FieldNumUnit";
import { dropdownProp } from "../ui/style";

type BorderUpdate = {
  border: FNBorder;
};
export const PanelBorder: FC<{
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  update: <T extends keyof BorderUpdate>(key: T, val: BorderUpdate[T]) => void;
}> = ({ value, update, mode }) => {
  const params = responsiveVal<FNBorder>(value, "border", mode, {
    style: "solid",
  });
  const detectMixed = (round: any) => {
    let rounded: any = round;
    let corner: any = [];
    transform(rounded, (r, v, k) => {
      corner.push(v);
    });
    let uniqueCorner = uniq(corner);
    if (uniqueCorner.length > 1 && corner.length === 4) {
      return true;
    }
    return false;
  };
  const detectMixedCorner = (round: any) => {
    let rounded: any = round;
    let corner: any = [];
    transform(rounded, (r, v, k) => {
      corner.push(v);
    });
    let uniqueCorner = uniq(corner);
    if (uniqueCorner.length > 1 && corner.length === 4) {
      return {
        isMix: true,
        value: "Mixed",
      };
    }
    return {
      isMix: false,
      value: uniqueCorner[0] + "",
    };
  };
  const updateAllCorner = (props: { value: number }) => {
    const { value } = props;
    update("border", {
      ...params,
      rounded: {
        tr: value,
        tl: value,
        bl: value,
        br: value,
      } as any,
    });
    return {
      tr: value,
      tl: value,
      bl: value,
      br: value,
    };
  };
  const local = useLocal(
    {
      colorOpen: false,
      isMix: false,
      isBorderMix: false,
      open: false,
      corner: null as any,
      borderVal: null as any,
      ready: false,
      border: false,
    },
    () => {
      let isMixed = detectMixedCorner(params.rounded);
      local.isMix = isMixed.isMix;

      if (isMixed.isMix) local.open = true;
      let mixStroke = detectMixedCorner(params.stroke);
      local.isBorderMix = mixStroke.isMix;

      if (mixStroke.isMix) local.border = true;
      local.render();
    }
  );

  return (
    <div className="flex flex-col space-y-2">
      <div className={cx("flex flex-row justify-between text-xs ")}>
        <Tooltip content={"Background Size"}>
          <div
            className={cx(
              "bg-white p-[2px] border border-gray-300 flex items-stretch",
              css`
                .border {
                  width: 70px !important;
                }
                input {
                  width: 100%;
                }
              `
            )}
          >
            <Dropdown
              {...dropdownProp}
              value={params.style}
              items={[
                { value: "solid", label: "Solid" },
                { value: "dash", label: "Dash" },
              ]}
              onChange={(val) => {
                update("border", { ...params, style: val as any });
              }}
            />
          </div>
        </Tooltip>
        <Tooltip content={"Stroke"} asChild>
          <div
            className={cx(
              "bg-white p-[2px] border border-gray-300 flex items-stretch",
              css`
                input {
                  width: 100% !important;
                }
                .field-num {
                  width: 60px !important;
                }
              `
            )}
          >
            <FieldNumUnit
              positiveOnly
              hideUnit
              icon={
                <div className="text-lg text-gray-700">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M20 15H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zm0-5H4c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1zm0-6H4c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm.5 15h-17c-.28 0-.5.22-.5.5s.22.5.5.5h17c.28 0 .5-.22.5-.5s-.22-.5-.5-.5z"
                    />
                  </svg>
                </div>
              }
              value={
                get(detectMixedCorner(params.stroke), "isMix")
                  ? ""
                  : get(detectMixedCorner(params.stroke), "value") + ""
              }
              disabled={
                get(detectMixedCorner(params.stroke), "isMix") ? "Mixed" : false
              }
              update={(val) => {
                let value = parseInt(val.replaceAll("px", ""));
                let data = {
                  t: value,
                  b: value,
                  l: value,
                  r: value,
                };
                update("border", {
                  ...params,
                  stroke: data,
                });
                let mixStroke = detectMixedCorner(data);
                local.isBorderMix = mixStroke.isMix;

                local.render();
              }}
            />
          </div>
        </Tooltip>
        <Tooltip asChild content="Toggle Border" placement="top-end">
          <div>
            <Button
              className={cx(
                "flex-1",
                css`
                  width: 30px;
                  max-width: 30px;
                  height: 35px;
                  min-width: 0px !important;
                  background: ${local.border ? "#3c82f6" : "#fff"} !important;
                  border-color: ${local.border
                    ? "#7baeff"
                    : "#d1d1d1"} !important;
                `
              )}
              onClick={() => {
                local.border = !local.border;
                local.render();
              }}
            >
              <div className="text-lg text-gray-700">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 8v8m16 0V8M8 4h8M8 20h8"
                  />
                </svg>
              </div>
            </Button>
          </div>
        </Tooltip>
      </div>
      {local.border ? (
        <>
          <div
            className={cx(
              "flex flex-row text-xs ",
              css`
                .field-num {
                  height: 25px;
                  border: 1px solid #d1d1d1;
                }
              `,
              css`
                .field-num {
                  width: 45px !important;
                  border-right: 0px !important;
                }
              `
            )}
          >
            <Tooltip asChild content="Border Left">
              <div>
                <FieldNumUnit
                  positiveOnly
                  hideUnit
                  icon={
                    <div className="text-lg text-gray-700">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="currentColor"
                          d="M3.5 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v16a1 1 0 0 1-1 1Z"
                        />
                        <circle
                          cx="7.5"
                          cy="12"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="11.5"
                          cy="12"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="15.5"
                          cy="12"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="19.5"
                          cy="12"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="7.5"
                          cy="4"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="11.5"
                          cy="4"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="15.5"
                          cy="4"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="19.5"
                          cy="4"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="19.5"
                          cy="8"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="19.5"
                          cy="16"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="11.5"
                          cy="8"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="11.5"
                          cy="16"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="7.5"
                          cy="20"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="11.5"
                          cy="20"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="15.5"
                          cy="20"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="19.5"
                          cy="20"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                      </svg>
                    </div>
                  }
                  value={get(params, "stroke.l") + "px"}
                  update={(val) => {
                    let data = {
                      ...params.stroke,
                      l: parseInt(val.replaceAll("px", "")),
                    };
                    update("border", {
                      ...params,
                      stroke: data as any,
                    });
                    let isMixed = detectMixedCorner(data);
                    local.isBorderMix = isMixed.isMix;
                    local.borderVal = isMixed.value;
                    local.render();
                  }}
                />
              </div>
            </Tooltip>

            <Tooltip asChild content="Border Top">
              <div>
                <FieldNumUnit
                  positiveOnly
                  hideUnit
                  icon={
                    <div className="text-lg text-gray-700">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="currentColor"
                          d="M20 4.5H4a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2Z"
                        />
                        <circle
                          cx="12"
                          cy="7.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="12"
                          cy="11.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="12"
                          cy="15.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="12"
                          cy="19.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="20"
                          cy="7.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="20"
                          cy="11.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="20"
                          cy="15.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="20"
                          cy="19.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="16"
                          cy="19.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="8"
                          cy="19.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="16"
                          cy="11.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="8"
                          cy="11.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4"
                          cy="7.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4"
                          cy="11.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4"
                          cy="15.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4"
                          cy="19.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                      </svg>
                    </div>
                  }
                  value={get(params, "stroke.t") + "px"}
                  update={(val) => {
                    let data = {
                      ...params.stroke,
                      t: parseInt(val.replaceAll("px", "")),
                    };
                    update("border", {
                      ...params,
                      stroke: data as any,
                    });
                    let isMixed = detectMixedCorner(data);
                    local.isBorderMix = isMixed.isMix;
                    local.borderVal = isMixed.value;
                    local.render();
                  }}
                />
              </div>
            </Tooltip>
            <Tooltip asChild content="Border Right">
              <div>
                <FieldNumUnit
                  positiveOnly
                  hideUnit
                  icon={
                    <div className="text-lg text-gray-700">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="currentColor"
                          d="M20.5 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v16a1 1 0 0 1-1 1Z"
                        />
                        <circle
                          cx="16.5"
                          cy="12"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="12.5"
                          cy="12"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="8.5"
                          cy="12"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4.5"
                          cy="12"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="16.5"
                          cy="20"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="12.5"
                          cy="20"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="8.5"
                          cy="20"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4.5"
                          cy="20"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4.5"
                          cy="16"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4.5"
                          cy="8"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="12.5"
                          cy="16"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="12.5"
                          cy="8"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="16.5"
                          cy="4"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="12.5"
                          cy="4"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="8.5"
                          cy="4"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4.5"
                          cy="4"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                      </svg>
                    </div>
                  }
                  value={get(params, "stroke.r") + "px"}
                  update={(val) => {
                    let data = {
                      ...params.stroke,
                      r: parseInt(val.replaceAll("px", "")),
                    };
                    update("border", {
                      ...params,
                      stroke: data as any,
                    });
                    let isMixed = detectMixedCorner(data);
                    local.isBorderMix = isMixed.isMix;
                    local.borderVal = isMixed.value;
                    local.render();
                  }}
                />
              </div>
            </Tooltip>
            <Tooltip asChild content="Border Bottom">
              <div>
                <FieldNumUnit
                  positiveOnly
                  hideUnit
                  icon={
                    <div className="text-lg text-gray-700">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="currentColor"
                          d="M20 21.5H4a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2Z"
                        />
                        <circle
                          cx="12"
                          cy="16.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="12"
                          cy="12.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="12"
                          cy="8.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="12"
                          cy="4.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4"
                          cy="16.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4"
                          cy="12.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4"
                          cy="8.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="4"
                          cy="4.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="8"
                          cy="4.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="16"
                          cy="4.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="8"
                          cy="12.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="16"
                          cy="12.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="20"
                          cy="16.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="20"
                          cy="12.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="20"
                          cy="8.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                        <circle
                          cx="20"
                          cy="4.5"
                          r="1"
                          fill="currentColor"
                          opacity=".5"
                        />
                      </svg>
                    </div>
                  }
                  value={get(params, "stroke.b") + "px"}
                  update={(val) => {
                    let data = {
                      ...params.stroke,
                      b: parseInt(val.replaceAll("px", "")),
                    };
                    update("border", {
                      ...params,
                      stroke: data as any,
                    });
                    let isMixed = detectMixedCorner(data);
                    local.isBorderMix = isMixed.isMix;
                    local.borderVal = isMixed.value;
                    local.render();
                  }}
                />
              </div>
            </Tooltip>
          </div>
        </>
      ) : (
        <></>
      )}
      <div
        className={cx(
          "flex flex-row items-stretch justify-between text-xs ",
          css`
            .field-num {
              border: 1px solid #d1d1d1;
            }
          `
        )}
      >
        <Tooltip asChild content={"Border Color"}>
          <div
            className={cx(
              "bg-white p-[2px] border border-gray-300 flex items-stretch",
              css`
                .color-box {
                  height: 25px !important;
                  width: 50px;
                }
              `
            )}
          >
            <FieldColor
              popupID="border-color"
              value={params.color}
              update={(color) => {
                update("border", { ...params, color });
              }}
            />
          </div>
        </Tooltip>
        <Tooltip content="Corner">
          <div
            className={cx(
              "",
              css`
                .field-num {
                  width: 85px;
                  height: 30px;
                }
              `
            )}
          >
            <FieldNumUnit
              positiveOnly
              hideUnit
              icon={
                <div className="text-lg text-gray-700">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z"
                    />
                  </svg>
                </div>
              }
              width={"100%"}
              enableWhenDrag
              value={
                get(detectMixedCorner(params.rounded), "isMix")
                  ? ""
                  : get(detectMixedCorner(params.rounded), "value") + ""
              }
              disabled={
                get(detectMixedCorner(params.rounded), "isMix")
                  ? "Mixed"
                  : false
              }
              update={(val, setVal) => {
                let result = updateAllCorner({
                  value: parseInt(val.replaceAll("px", "")),
                });
                let isMixed = detectMixedCorner(result);
                local.isMix = isMixed.isMix;

                local.render();
              }}
            />
          </div>
        </Tooltip>
        <Tooltip
          asChild
          content="Independent Rounded Corner"
          placement="top-end"
        >
          <div>
            <Button
              className={cx(
                "flex-1 flex flex-row items-center justify-center",
                css`
                  width: 30px;
                  max-width: 30px;
                  height: 30px;
                  background: ${local.open
                    ? "rgb(229,231,235)"
                    : "#fff"} !important;
                  border-color: #d1d1d1 !important;
                `
              )}
              onClick={() => {
                local.open = !local.open;
                local.render();
              }}
            >
              <div className="text-lg text-gray-700">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 4h2a2 2 0 0 1 2 2v2m0 8v2a2 2 0 0 1-2 2h-2m-8 0H6a2 2 0 0 1-2-2v-2m0-8V6a2 2 0 0 1 2-2h2"
                  />
                </svg>
              </div>
            </Button>
          </div>
        </Tooltip>
      </div>
      {local.open ? (
        <>
          <div
            className={cx(
              "flex flex-row text-xs ",
              css`
                .field-num {
                  height: 25px;
                  border: 1px solid #d1d1d1;
                }
              `,
              css`
                .field-num {
                  width: 45px !important;
                  border-right: 0px !important;
                }
              `
            )}
          >
            <Tooltip asChild content="Corner Top Right">
              <div>
                <FieldNumUnit
                  positiveOnly
                  hideUnit
                  icon={
                    <div className="text-lg text-gray-700">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="m20.01 16.01l-.01-.011m.01 4.011l-.01-.011m-3.99.011l-.01-.011m-3.99.011l-.01-.011m-3.99.011L8 19.999m-3.99.011L4 19.999m.01-3.989L4 15.999m.01-3.989L4 11.999m.01-3.989L4 7.999m.01-3.989L4 3.999m4.01.011L8 3.999M20.01 12V4h-8v8h8Z"
                        />
                      </svg>
                    </div>
                  }
                  value={get(params, "rounded.tr") + "px"}
                  update={(val) => {
                    update("border", {
                      ...params,
                      rounded: {
                        ...params.rounded,
                        tr: parseInt(val.replaceAll("px", "")),
                      } as any,
                    });
                    let isMixed = detectMixedCorner({
                      ...params.rounded,
                      tr: parseInt(val.replaceAll("px", "")),
                    });
                    local.isMix = isMixed.isMix;

                    local.render();
                  }}
                />
              </div>
            </Tooltip>

            <Tooltip asChild content="Corner Top Left">
              <div>
                <FieldNumUnit
                  positiveOnly
                  hideUnit
                  icon={
                    <div className="text-lg text-gray-700">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="m4 16.01l.01-.011M4 20.01l.01-.011M8 20.01l.01-.011m3.99.011l.01-.011m3.99.011l.01-.011m3.99.011l.01-.011M20 16.01l.01-.011M20 12.01l.01-.011M20 8.01l.01-.011M20 4.01l.01-.011M16 4.01l.01-.011M4 12V4h8v8H4Z"
                        />
                      </svg>
                    </div>
                  }
                  value={get(params, "rounded.tl") + "px"}
                  update={(val) => {
                    update("border", {
                      ...params,
                      rounded: {
                        ...params.rounded,
                        tl: parseInt(val.replaceAll("px", "")),
                      } as any,
                    });
                    let isMixed = detectMixedCorner({
                      ...params.rounded,
                      tl: parseInt(val.replaceAll("px", "")),
                    });
                    local.isMix = isMixed.isMix;

                    local.render();
                  }}
                />
              </div>
            </Tooltip>
            <Tooltip asChild content="Corner Bottom Left">
              <div>
                <FieldNumUnit
                  positiveOnly
                  hideUnit
                  icon={
                    <div className="text-lg text-gray-700">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="m4 8l.01.011M4 4l.01.011M8 4l.01.011M12 4l.01.011M16 4l.01.011M20 4l.01.011M20 8l.01.011M20 12l.01.011M20 16l.01.011M20 20l.01.011M16 20l.01.011M4 12.01v8h8v-8H4Z"
                        />
                      </svg>
                    </div>
                  }
                  value={get(params, "rounded.bl") + "px"}
                  update={(val) => {
                    update("border", {
                      ...params,
                      rounded: {
                        ...params.rounded,
                        bl: parseInt(val.replaceAll("px", "")),
                      } as any,
                    });
                    let isMixed = detectMixedCorner({
                      ...params.rounded,
                      bl: parseInt(val.replaceAll("px", "")),
                    });
                    local.isMix = isMixed.isMix;

                    local.render();
                  }}
                />
              </div>
            </Tooltip>
            <Tooltip asChild content="Corner Bottom Right">
              <div>
                <FieldNumUnit
                  positiveOnly
                  hideUnit
                  icon={
                    <div className="text-lg text-gray-700">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="m20.01 8l-.01.011M20.01 4l-.01.011M16.01 4l-.01.011M12.01 4l-.01.011M8.01 4L8 4.011M4.01 4L4 4.011M4.01 8L4 8.011M4.01 12l-.01.011M4.01 16l-.01.011M4.01 20l-.01.011M8.01 20l-.01.011m12.01-8.001v8h-8v-8h8Z"
                        />
                      </svg>
                    </div>
                  }
                  value={get(params, "rounded.br") + "px"}
                  update={(val) => {
                    update("border", {
                      ...params,
                      rounded: {
                        ...params.rounded,
                        br: parseInt(val.replaceAll("px", "")),
                      } as any,
                    });
                    let isMixed = detectMixedCorner({
                      ...params.rounded,
                      br: parseInt(val.replaceAll("px", "")),
                    });
                    local.isMix = isMixed.isMix;

                    local.render();
                  }}
                />
              </div>
            </Tooltip>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
