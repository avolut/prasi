import { FC } from "react";
import { CPArgs } from "./types";
import { CPCoded } from "./CPCoded";

export const CPOption: FC<CPArgs> = ({ prop, onChange, editCode, reset }) => {
  let metaOptions: { label: string; value: any }[] = [];
  if (prop.meta?.options) {
    try {
      eval(`metaOptions = ${prop.meta.options}`);
    } catch (e) {}
  }

  let evalue: any = null;
  try {
    eval(`evalue = ${prop.value}`);
  } catch (e) {}

  if (
    !metaOptions.find((e) => {
      return e.value === evalue;
    })
  ) {
    return <CPCoded editCode={editCode} reset={reset} />;
  }

  return (
    <div className="flex items-center flex-wrap pt-1 space-x-1 justify-end px-2 flex-1">
      {Array.isArray(metaOptions) &&
        metaOptions.map((item, idx) => {
          return (
            <div
              key={idx}
              className={cx(
                "flex px-2 text-xs mb-1 border rounded-sm cursor-pointer  justify-center ",
                item.value !== evalue
                  ? "bg-white  text-blue-700 hover:bg-blue-50 hover:border-blue-500"
                  : "bg-blue-700 text-white border-blue-700"
              )}
              onClick={() => {
                const val = JSON.stringify(item.value);
                onChange(val);
              }}
            >
              {item.label}
            </div>
          );
        })}
    </div>
  );
};
