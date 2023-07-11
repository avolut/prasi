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
        <Tooltip content={"Background Position"}>
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
