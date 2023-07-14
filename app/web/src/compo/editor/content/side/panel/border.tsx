import { FC } from "react";
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
      open: false,
      corner: null as any,
      ready: false,
    },
    () => {
      let isMixed = detectMixedCorner(params.rounded);
      local.isMix = isMixed.isMix;
      local.corner = isMixed.value;
      if (isMixed.isMix) local.open = true;
      local.render();
    }
  );

  return (
    <div className="flex flex-col space-y-2">
      <div className={cx("flex flex-row items-stretch space-x-2 text-xs ")}>
        <Tooltip content={"Background Size"}>
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
        </Tooltip>
        <Tooltip content={"Stroke"} asChild>
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
                <Icon
                  icon="ic:round-line-weight"
                  className="text-lg text-gray-700"
                />
              }
              value={params.stroke + "px"}
              update={(val) => {
                update("border", {
                  ...params,
                  stroke: parseInt(val.replaceAll("px", "")) as any,
                });
              }}
            />
          </div>
        </Tooltip>
      </div>
      <div
        className={cx(
          "flex flex-row items-stretch space-x-2 text-xs ",
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
              disabled={local.isMix ? "Mixed" : false}
              enableWhenDrag
              value={local.corner + ""}
              update={(val, setVal) => {
                let result = updateAllCorner({
                  value: parseInt(val.replaceAll("px", "")),
                });
                let isMixed = detectMixedCorner(result);
                local.isMix = isMixed.isMix;
                local.corner = isMixed.value;
                local.render();
              }}
            />
          </div>
        </Tooltip>
        <Tooltip asChild content="Independect Padding" placement="top-end">
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
                    local.corner = isMixed.value;
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
                    local.corner = isMixed.value;
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
                    local.corner = isMixed.value;
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
                    local.corner = isMixed.value;
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

const getImgMeta = (url: string) => {
  return new Promise<null | HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      console.error(err, url);
      resolve(null);
    };
    img.src = url;
  });
};
