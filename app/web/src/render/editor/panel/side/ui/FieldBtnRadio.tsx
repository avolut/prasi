import { FC, ReactElement } from "react";
import { Button } from "./Button";

export const FieldBtnRadio: FC<{
  value: any;
  update: (value: any) => void;
  disabled?: boolean;
  items: Record<string, ReactElement | String>;
}> = ({ items, update, value, disabled }) => {
  return (
    <>
      {Object.entries(items).map(([name, content], idx) => {
        return (
          <Button
            disabled={disabled}
            key={idx}
            className={cx(
              "btn-hover",
              value === name &&
                name.toUpperCase() === "ON" &&
                css`
                  color: white !important;
                  font-weight: bold !important;
                  background-color: green !important;
                  border: 0px !important;
                `
            )}
            onClick={() => {
              update(name);
            }}
            appearance={value === name ? "secondary" : "subtle"}
          >
            {content}
          </Button>
        );
      })}
    </>
  );
};
