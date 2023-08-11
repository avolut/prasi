import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useTransition,
} from "react";
import { useLocal } from "web-utils";

export const FieldNumUnit: FC<{
  label?: string;
  icon?: ReactElement;
  value: string;
  unit?: string;
  hideUnit?: boolean;
  update: (value: string, setDragVal?: (val: number) => void) => void;
  width?: string;
  positiveOnly?: boolean;
  disabled?: boolean | string;
  enableWhenDrag?: boolean;
  dashIfEmpty?: boolean;
}> = ({
  icon,
  value,
  label,
  update,
  unit,
  hideUnit,
  width,
  disabled,
  positiveOnly,
  enableWhenDrag,
}) => {
  const local = useLocal({
    val: 0,
    unit: "",
    drag: { clientX: 0, old: 0 },
    dragging: false,
  });

  const parseVal = useCallback(() => {
    let val = "";
    let unt = "";
    if (value.length >= 1) {
      let fillMode = "val" as "val" | "unit";
      for (let idx = 0; idx < value.length; idx++) {
        const c = value[idx];
        if (idx > 0 && isNaN(parseInt(c))) {
          fillMode = "unit";
        }

        if (fillMode === "val") {
          val += c;
        } else {
          unt += c || "";
        }
      }
      if (!parseInt(val)) unt = "";
    }
    local.val = parseInt(val) || 0;
    if (positiveOnly && local.val < 0) {
      local.val = Math.max(0, local.val);
    }
    local.unit = unit || unt || "px";
    local.render();
  }, [value, unit]);

  useEffect(() => {
    parseVal();
    local.render();
  }, [value, unit]);

  const [txPending, tx] = useTransition();

  useEffect(() => {
    // Only change the value if the drag was actually started.
    const onUpdate = (event: any) => {
      if (local.drag.clientX) {
        local.val = Math.round(
          local.drag.old + (event.clientX - local.drag.clientX)
        );

        if (positiveOnly && local.val < 0) {
          local.val = Math.max(0, local.val);
        }

        local.render();

        tx(() => {
          update(local.val + local.unit);
        });
      }
    };

    // Stop the drag operation now.
    const onEnd = () => {
      local.drag.clientX = 0;
      local.dragging = false;
      local.render();
    };

    document.addEventListener("pointermove", onUpdate);
    document.addEventListener("pointerup", onEnd);
    return () => {
      document.removeEventListener("pointermove", onUpdate);
      document.removeEventListener("pointerup", onEnd);
    };
  }, [local.drag.clientX, local.drag.old, local.val]);

  const onStart = useCallback(
    (event: React.MouseEvent) => {
      let _disabled = disabled;
      if (enableWhenDrag && _disabled) {
        update(local.val + local.unit, (val) => {
          local.val = val;
        });
        _disabled = false;
      }
      if (!_disabled) {
        local.dragging = true;
        local.render();

        local.drag.clientX = event.clientX;
        local.drag.old = local.val;
      }
    },
    [local.val, disabled]
  );

  return (
    <>
      <div className="field-num flex flex-row items-stretch justify-between bg-white border border-transparent btn-hover h-full">
        <div className="flex cursor-ew-resize" onPointerDown={onStart}>
          {icon && (
            <div
              className="flex items-center justify-center opacity-50 ml-1"
              onPointerDown={onStart}
            >
              {icon}
            </div>
          )}
          {label && (
            <div className="flex items-center justify-center text-[11px] opacity-50 w-[14px] ml-1">
              {label}
            </div>
          )}
        </div>
        <div className="flex justify-between flex-1 items-center flex-grow overflow-hidden">
          <input
            type="text"
            className={cx(
              css`
                width: ${width ? width : "23px"};
                background: transparent;
                outline: none;
                font-size: 11px;
              `,
              !!disabled && "text-center text-gray-400"
            )}
            disabled={!!disabled}
            value={typeof disabled === "string" ? disabled : local.val}
            onChange={(e) => {
              local.val = parseInt(e.currentTarget.value) || 0;
              update(local.val + local.unit);
            }}
          />
          {hideUnit !== true && (
            <div
              className="text-[11px] mx-1 flex cursor-ew-resize"
              onPointerDown={onStart}
            >
              {local.unit}
            </div>
          )}
        </div>
      </div>
      {local.dragging && (
        <div className="fixed z-50 inset-0 cursor-ew-resize"></div>
      )}
    </>
  );
};
