import { FC } from "react";
import { useLocal } from "web-utils";
import { FNAlign, FNLayout } from "../../../../../utils/types/meta-fn";

export const LayoutSpaced: FC<{
  dir: FNLayout["dir"];
  align: FNAlign;
  onChange: (align: FNAlign) => void;
}> = ({ dir, align, onChange }) => {
  return (
    <div
      className={cx(
        "w-[68px] h-[68px] border flex bg-white items-stretch p-[2px]",
        (
          {
            col: "flex-row",
            row: "flex-col",
            "col-reverse": "flex-row-reverse",
            "row-reverse": "flex-col-reverse",
          } as any
        )[dir]
      )}
    >
      {dir === "col" && (
        <>
          <AlignItemCol active={align} onChange={onChange} align="left" />
          <AlignItemCol active={align} onChange={onChange} align="center" />
          <AlignItemCol active={align} onChange={onChange} align="right" />
        </>
      )}
      {dir === "col-reverse" && (
        <>
          <AlignItemCol active={align} onChange={onChange} align="left" />
          <AlignItemCol
            active={align}
            onChange={onChange}
            align="center"
            reverse
          />
          <AlignItemCol active={align} onChange={onChange} align="right" />
        </>
      )}

      {dir === "row" && (
        <>
          <AlignItemRow active={align} onChange={onChange} align="top" />
          <AlignItemRow active={align} onChange={onChange} align="center" />
          <AlignItemRow active={align} onChange={onChange} align="bottom" />
        </>
      )}
      {dir === "row-reverse" && (
        <>
          <AlignItemRow active={align} onChange={onChange} align="bottom" />
          <AlignItemRow
            active={align}
            onChange={onChange}
            align="center"
            reverse
          />
          <AlignItemRow active={align} onChange={onChange} align="top" />
        </>
      )}
    </div>
  );
};

const AlignItemRow: FC<{
  align: "top" | "center" | "bottom";
  active: string;
  onChange: (align: FNAlign) => void;
  reverse?: boolean;
}> = ({ align, active, onChange, reverse }) => {
  const local = useLocal({ hover: false });
  let justify = "justify-start";
  if (align === "center") justify = `justify-center`;
  if (align === "bottom") justify = `justify-end`;

  return (
    <div
      className={cx(
        "flex flex-row cursor-pointer justify-between flex-1 items-stretch",
        local.hover && "hover",
        active === align &&
          css`
            .icon {
              display: flex;
            }
            .point {
              display: none;
            }
          `,
        css`
          &.hover {
            .icon {
              display: flex;
              opacity: 0.5;
            }
            .point {
              display: none;
            }
          }
        `
      )}
      onMouseOver={() => {
        local.hover = true;
        local.render();
      }}
      onMouseOut={() => {
        local.hover = false;
        local.render();
      }}
      onClick={() => {
        onChange(align);
      }}
    >
      {active === align || local.hover ? (
        <>
          <div
            className={cx("icon flex-1 flex flex-col items-center", justify)}
          >
            <div
              className={cx(
                "bg-blue-500",
                reverse
                  ? "py-[2px] w-[4px] h-[8px]"
                  : "py-[2px] w-[4px] h-[10px]"
              )}
            ></div>
          </div>
          <div
            className={cx("icon flex-1 flex flex-col  items-center", justify)}
          >
            <div
              className={cx("bg-blue-500", "py-[2px] w-[4px] h-[16px]")}
            ></div>
          </div>
          <div
            className={cx("icon flex-1 flex flex-col items-center", justify)}
          >
            <div
              className={cx(
                "bg-blue-500",
                !reverse
                  ? "py-[2px] w-[4px] h-[8px]"
                  : "py-[2px] w-[4px] h-[10px]"
              )}
            ></div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[2px] h-[2px] bg-slate-400 point"></div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-[2px] h-[2px] bg-slate-400 point"></div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[2px] h-[2px] bg-slate-400 point"></div>
          </div>
        </>
      )}
    </div>
  );
};

const AlignItemCol: FC<{
  align: "left" | "center" | "right";
  active: string;
  onChange: (align: FNAlign) => void;
  reverse?: boolean;
}> = ({ align, active, onChange, reverse }) => {
  const local = useLocal({ hover: false });
  let justify = "justify-start";
  if (align === "center") justify = `justify-center`;
  if (align === "right") justify = `justify-end`;

  return (
    <div
      className={cx(
        "flex flex-col cursor-pointer justify-between flex-1 items-stretch",
        local.hover && "hover",
        active === align &&
          css`
            .icon {
              display: flex;
            }
            .point {
              display: none;
            }
          `,
        css`
          &.hover {
            .icon {
              display: flex;
              opacity: 0.5;
            }
            .point {
              display: none;
            }
          }
        `
      )}
      onMouseOver={() => {
        local.hover = true;
        local.render();
      }}
      onMouseOut={() => {
        local.hover = false;
        local.render();
      }}
      onClick={() => {
        onChange(align);
      }}
    >
      {active === align || local.hover ? (
        <>
          <div className={cx("icon flex-1 flex items-center", justify)}>
            <div
              className={cx(
                "bg-blue-500",
                reverse
                  ? "px-[2px] w-[8px] h-[4px]"
                  : "px-[2px] w-[10px] h-[4px]"
              )}
            ></div>
          </div>
          <div className={cx("icon flex-1 flex items-center", justify)}>
            <div
              className={cx("bg-blue-500", "px-[2px] w-[16px] h-[4px]")}
            ></div>
          </div>
          <div className={cx("icon flex-1 flex items-center", justify)}>
            <div
              className={cx(
                "bg-blue-500",
                !reverse
                  ? "px-[2px] w-[8px] h-[4px]"
                  : "px-[2px] w-[10px] h-[4px]"
              )}
            ></div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[2px] h-[2px] bg-slate-400 point"></div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-[2px] h-[2px] bg-slate-400 point"></div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[2px] h-[2px] bg-slate-400 point"></div>
          </div>
        </>
      )}
    </div>
  );
};
