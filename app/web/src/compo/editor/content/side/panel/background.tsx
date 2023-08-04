import { FC } from "react";
import { useLocal } from "web-utils";
import { responsiveVal } from "../../../../page/tools/responsive-val";
import { IItem } from "../../../../types/item";
import { FNBackground } from "../../../../types/meta-fn";
import { ISection } from "../../../../types/section";
import { IText } from "../../../../types/text";
import { Dropdown } from "../../../../ui/dropdown";
import { Tooltip } from "../../../../ui/tooltip";
import { FieldColor } from "../ui/FieldColor";
import { FieldImg } from "../ui/FieldImg";
import { dropdownProp } from "../ui/style";
import { Button } from "../ui/Button";

type BackgroundUpdate = {
  bg: FNBackground;
};
export const PanelBackground: FC<{
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  update: <T extends keyof BackgroundUpdate>(
    key: T,
    val: BackgroundUpdate[T]
  ) => void;
}> = ({ value, update, mode }) => {
  const local = useLocal({ colorOpen: false });

  const bg = responsiveVal<FNBackground>(value, "bg", mode, {
    size: "cover",
    pos: "center",
  });

  return (
    <div className="flex flex-col space-y-2">
      <div className={cx("flex items-stretch space-x-2 text-xs ")}>
        <Tooltip asChild content={"Background Color"}>
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
              value={bg.color}
              update={(color) => {
                update("bg", { ...bg, color });
              }}
            />
          </div>
        </Tooltip>

        <Tooltip asChild content={"Background Image"}>
          <div
            className={cx(
              "bg-white p-[2px] border flex flex-1 border-gray-300",
              css`
                > * {
                  flex: 1;
                }
              `
            )}
          >
            <FieldImg
              value={bg.url}
              update={async (url) => {
                update("bg", { ...bg, url });

                if (
                  value.type === "item" &&
                  (!value.dim ||
                    (value.dim && (!value.dim.w || value.dim.w === "fit")))
                ) {
                  const img = await getImgMeta(`${siteApiUrl}${url}`);
                  (update as any)("dim", {
                    w: Math.min(500, img?.width || 100),
                    h: Math.min(500, img?.height || 100),
                  });
                }
              }}
            />
          </div>
        </Tooltip>
        {bg.url ? (
          <>
            <Tooltip asChild content={"Unlink Image"}>
              <div className={"flex flex-row bg-white"}>
                <Button
                  className={cx(
                    "flex-1 flex-grow",
                    css`
                      height: 30px;
                      width: 20px;
                      max-width: 20px;
                      padding: 0px !important;
                      min-width: 0px !important;
                    `
                  )}
                  onClick={(e) => {
                    update("bg", { ...bg, url: "" });
                  }}
                >
                  <div className="w-[10px]  flex items-center justify-center">
                    <>
                      <div className="text-lg text-gray-700">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="currentColor"
                            d="M16.949 14.121L19.071 12a5.008 5.008 0 0 0 0-7.071a5.006 5.006 0 0 0-7.071 0l-.707.707l1.414 1.414l.707-.707a3.007 3.007 0 0 1 4.243 0a3.005 3.005 0 0 1 0 4.243l-2.122 2.121a2.723 2.723 0 0 1-.844.57L13.414 12l1.414-1.414l-.707-.707a4.965 4.965 0 0 0-3.535-1.465c-.235 0-.464.032-.691.066L3.707 2.293L2.293 3.707l18 18l1.414-1.414l-5.536-5.536c.277-.184.538-.396.778-.636zm-6.363 3.536a3.007 3.007 0 0 1-4.243 0a3.005 3.005 0 0 1 0-4.243l1.476-1.475l-1.414-1.414L4.929 12a5.008 5.008 0 0 0 0 7.071a4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707l-1.414-1.414l-.707.707z"
                          />
                        </svg>
                      </div>
                    </>
                  </div>
                </Button>
              </div>
            </Tooltip>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="flex items-stretch space-x-2">
        <Tooltip content={"Background Size"}>
          <Dropdown
            {...dropdownProp}
            value={bg.size}
            items={[
              { value: "cover", label: "Cover" },
              { value: "contain", label: "Contain" },
              { value: "full", label: "Full" },
              { value: "auto", label: "Auto" },
            ]}
            onChange={(val) => {
              update("bg", { ...bg, size: val as any });
            }}
          />
        </Tooltip>
        <Tooltip
          content={"Background Position"}
          className={css`
            .dropdown {
              max-width: 90px;
              overflow: hidden;
            }
          `}
        >
          <Dropdown
            {...dropdownProp}
            value={bg.pos}
            items={[
              { value: "top", label: "Top" },
              { value: "center", label: "Center" },
              { value: "bottom", label: "Bottom" },
              { value: "right", label: "Right" },
              { value: "left", label: "Left" },
            ]}
            onChange={(val) => {
              update("bg", { ...bg, pos: val as any });
            }}
          />
        </Tooltip>
      </div>
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
