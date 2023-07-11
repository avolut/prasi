import { FC, Fragment, ReactElement, ReactNode, isValidElement } from "react";
import { useLocal } from "web-utils";
import { Menu, MenuItem } from "./context-menu";
import { Tooltip } from "./tooltip";

type ItemBtn = {
  content: ReactNode;
  tooltip?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};
export const ToolbarBox: FC<{
  label?: ReactNode;
  labelMenu?: { label: ReactNode; onClick?: () => void | Promise<void> }[];
  items: (ReactElement | ItemBtn | undefined)[];
  className?: string;
}> = ({ label, items, className, labelMenu }) => {
  const local = useLocal({
    labelMouseEvent: null as null | React.MouseEvent<
      HTMLDivElement,
      MouseEvent
    >,
  });
  return (
    <div className={cx("toolbar-box", className, !label && "no-label")}>
      {local.labelMouseEvent && (
        <Menu
          mouseEvent={local.labelMouseEvent}
          onClose={() => {
            local.labelMouseEvent = null;
            local.render();
          }}
        >
          {labelMenu?.map((e, idx) => {
            return <MenuItem key={idx} label={e.label} onClick={e.onClick} />;
          })}
        </Menu>
      )}
      {label && (
        <div
          className={cx(
            "label",
            !!labelMenu &&
              "hover:bg-[#ececeb] transition-all cursor-pointer rounded-l-[2px] -mx-[5px] px-[5px]"
          )}
          onClick={(e) => {
            local.labelMouseEvent = e;
            local.render();
          }}
        >
          {label}
        </div>
      )}
      <div className={cx("items")}>
        {items.map((e, idx) => {
          if (!e) return;
          if (isValidElement(e)) {
            return <Fragment key={idx}>{e}</Fragment>;
          }
          const item = e as ItemBtn;
          return (
            <Tooltip
              content={item.tooltip}
              key={idx}
              className={cx(
                "item transition-all",
                item.className,
                item.disabled && "disabled"
              )}
              onClick={item.onClick}
            >
              {item.content}
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};
