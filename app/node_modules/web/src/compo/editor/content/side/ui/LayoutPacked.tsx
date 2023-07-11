import { FC } from "react";
import { FNAlign, FNLayout } from "../../../../types/meta-fn";
import { Tooltip } from "../../../../ui/tooltip";
import { AlignIcon } from "./LayoutIcon";

export const LayoutPacked: FC<{
  dir: FNLayout["dir"];
  align: FNAlign;
  onChange: (align: FNAlign) => void;
}> = ({ dir, align, onChange }) => {
  return (
    <div className="w-[68px] h-[68px] p-[2px] border grid grid-cols-3 bg-white">
      <AlignItem
        dir={dir}
        active={align}
        onChange={onChange}
        align="top-left"
      />
      <AlignItem
        dir={dir}
        active={align}
        onChange={onChange}
        align="top-center"
      />
      <AlignItem
        dir={dir}
        active={align}
        onChange={onChange}
        align="top-right"
      />

      <AlignItem dir={dir} active={align} onChange={onChange} align="left" />
      <AlignItem dir={dir} active={align} onChange={onChange} align="center" />
      <AlignItem dir={dir} active={align} onChange={onChange} align="right" />

      <AlignItem
        dir={dir}
        active={align}
        onChange={onChange}
        align="bottom-left"
      />
      <AlignItem
        dir={dir}
        active={align}
        onChange={onChange}
        align="bottom-center"
      />
      <AlignItem
        dir={dir}
        active={align}
        onChange={onChange}
        align="bottom-right"
      />
    </div>
  );
};

const AlignItem: FC<{
  dir: FNLayout["dir"];
  align: FNAlign;
  active: string;
  onChange: (align: FNAlign) => void;
}> = ({ dir, align, active, onChange }) => {
  let pos = "start";

  if (dir.startsWith("col")) {
    if (align.endsWith("left")) pos = "start";
    if (align.endsWith("center")) pos = "center";
    if (align.endsWith("right")) pos = "end";
  } else {
    if (align.startsWith("top")) pos = "start";
    else if (align.startsWith("bottom")) pos = "end";
    else pos = "center";
  }

  return (
    <Tooltip content={`Align: ${align}`}>
      <div
        className={cx(
          "w-[21px] h-[21px] flex items-center justify-center cursor-pointer",
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
            &:hover {
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
        onClick={() => {
          onChange(align);
        }}
      >
        <AlignIcon dir={dir} pos={pos as any} className={"icon hidden"} />
        <div className="w-[2px] h-[2px] bg-slate-400 point"></div>
      </div>
    </Tooltip>
  );
};
