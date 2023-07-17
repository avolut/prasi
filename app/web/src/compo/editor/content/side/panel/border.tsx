import { FC, useEffect } from "react";
import { useLocal } from "web-utils";
import { responsiveVal } from "../../../../page/tools/responsive-val";
import { IItem } from "../../../../types/item";
import { FNBackground, FNBorder } from "../../../../types/meta-fn";
import { ISection } from "../../../../types/section";
import { IText } from "../../../../types/text";
import { Dropdown } from "../../../../ui/dropdown";
import { Tooltip } from "../../../../ui/tooltip";
import { FieldColor } from "../ui/FieldColor";
import { FieldImg } from "../ui/FieldImg";
import { dropdownProp } from "../ui/style";
import { FieldNumUnit } from "../ui/FieldNumUnit";
import { Icon } from "@iconify/react";
import { Button } from "../ui/Button";
import get from "lodash.get";
import transform from "lodash.transform";
import uniq from "lodash.uniq";

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
                <Icon
                  icon="ic:round-line-weight"
                  className="text-lg text-gray-700"
                />
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
              <Icon
                icon="tabler:border-sides"
                className="text-lg text-gray-700"
              />
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
                    <Icon
                      icon="uim:border-left"
                      className="text-lg text-gray-700"
                    />
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
                    <Icon
                      icon="uim:border-top"
                      className="text-lg text-gray-700"
                    />
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
                    <Icon
                      icon="uim:border-right"
                      className="text-lg text-gray-700"
                    />
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
                    <Icon
                      icon="uim:border-bottom"
                      className="text-lg text-gray-700"
                    />
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
              popupID="bg-color"
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
                <Icon
                  icon="ic:baseline-rounded-corner"
                  className="text-lg text-gray-700"
                />
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
              <Icon
                icon="tabler:border-corners"
                className="text-lg text-gray-700"
              />
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
                    <Icon
                      icon="iconoir:corner-top-left"
                      className="text-lg text-gray-700"
                    />
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
                    <Icon
                      icon="iconoir:corner-top-right"
                      className="text-lg text-gray-700"
                    />
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
                    <Icon
                      icon="iconoir:corner-bottom-right"
                      className="text-lg text-gray-700"
                    />
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
                    <Icon
                      icon="iconoir:corner-bottom-left"
                      className="text-lg text-gray-700"
                    />
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
