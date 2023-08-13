import { createId as cuid } from "@paralleldrive/cuid2";
import { FC, useEffect } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import tinycolor from "tinycolor2";
import { useLocal } from "web-utils";

export const FieldPickColor: FC<{
  value?: string;
  onChangePicker: (value: string) => void;
  onClose?: () => void;
  showHistory?: boolean;
}> = ({ value, onChangePicker, onClose, showHistory }) => {
  const meta = useLocal({
    originalValue: "",
    inputValue: value,
    rgbValue: "",
    selectedEd: "" as string,
  });

  useEffect(() => {
    meta.inputValue = value || "";
    const convertColor = tinycolor(meta.inputValue);
    meta.rgbValue = convertColor.toRgbString();
    meta.render();
  }, [value]);

  const colors: { id: string; value: string }[] = [];
  const tin = tinycolor(meta.inputValue);

  return (
    <div className="flex p-3 space-x-4 items-start">
      <div
        className={cx(
          "flex flex-col items-center",
          css`
            .react-colorful__pointer {
              border-radius: 4px;
              width: 20px;
              height: 20px;
            }
          `
        )}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <HexAlphaColorPicker
          color={meta.inputValue}
          onChange={(color) => {
            if (color) {
              meta.inputValue = color;
              onChangePicker(color);
              const convertColor = tinycolor(meta.inputValue);
              meta.rgbValue = convertColor.toRgbString();
            }
          }}
        />
      </div>
      <div
        className={cx(
          "grid grid-cols-1 gap-y-0.5",
          css`
            width: 78px;
          `
        )}
      >
        <div
          className="p-[1px] border rounded flex items-center justify-center"
          style={{
            marginBottom: "4px",
          }}
        >
          <input
            value={meta.inputValue || "#FFFFFFFF"}
            className={cx(
              `rounded cursor-text bg-[${meta.inputValue}] min-w-[0px] text-[13px] px-[8px] py-[1px] uppercase`,
              tin.isValid() &&
                css`
                  color: ${!tin.isLight() ? "#FFF" : "#000"};
                  background-color: ${meta.inputValue};
                `
            )}
            onClick={() => {
              // height: "18px",
              // minWidth: "0px",
              // fontSize: "13px",
              // meta.selectedEd = -1;
              // meta.render();
            }}
            spellCheck={false}
            onChange={(e) => {
              const color = e.currentTarget.value;
              meta.inputValue = color;

              // if (meta.selectedEd >= 0) {
              //   ed.colors[meta.selectedEd] = color;
              // }

              onChangePicker(color);
            }}
          />
        </div>
        {showHistory &&
          colors.map((e, key) => (
            <div
              key={key}
              className={cx(
                "flex space-x-1 items-center border p-0.5 rounded",
                meta.selectedEd === e.id && "border-black"
              )}
            >
              <div
                className={cx(
                  `w-12 h-4 rounded cursor-pointer border bg-[${e}]`,
                  css`
                    background-color: ${e.value};
                  `
                )}
                style={{
                  backgroundColor: e.value,
                }}
                onClick={() => {
                  meta.inputValue = e.value;
                  meta.selectedEd = e.id;
                  onChangePicker(e.value);

                  const convertColor = tinycolor(meta.inputValue);
                  meta.rgbValue = convertColor.toRgbString();
                }}
              />
              {/* <Delete16Regular
                className={`cursor-pointer hover:text-[${e}]`}
                css={css`
                  :hover {
                    color: ${e.value};
                  }
                `}
                onClick={() => {
                  meta.selectedEd = "";
                  const index = colors.indexOf(e);
                  const color = colors.find((_, i) => i === index);
                  if (color) onChangePicker(color?.value);
                  if (index > -1) {
                    colors.splice(index, 1);
                    ed.render();
                  }
                }}
              /> */}
            </div>
          ))}

        <div className="">
          {meta.inputValue !== "" && (
            <>
              {/* <div
                className="cursor-pointer text-center border border-gray-200  hover:bg-gray-100 rounded-t"
                onClick={() => {
                  if (meta.inputValue) {
                    const id = cuid();
                    const color = { id, value: meta.inputValue };
                    colors.push(color);
                    meta.selectedEd = id;
                    meta.render();
                    onChangePicker(meta.inputValue);
                  }
                }}
              >
                + Add
              </div> */}
              <div
                className="cursor-pointer text-center border border-gray-200 rounded hover:bg-gray-100"
                onClick={() => {
                  meta.inputValue = "";
                  onChangePicker("");
                }}
              >
                Reset
              </div>
            </>
          )}

          {onClose && (
            <div
              className="cursor-pointer text-center border border-gray-200 rounded hover:bg-gray-100 mt-[4px]"
              onClick={onClose}
            >
              Close
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
