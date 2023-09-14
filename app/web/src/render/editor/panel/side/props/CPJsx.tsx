import { FC, useEffect } from "react";
import { useLocal } from "web-utils";
import { CPCoded } from "./CPCoded";
import { CPArgs } from "./types";

export const CPJsx: FC<CPArgs> = ({
  name,
  prop,
  onChange,
  editCode,
  reset,
}) => {
  const local = useLocal({ value: "", codeEditing: false });

  useEffect(() => {
    if (prop.value) {
      try {
        eval(`local.value = ${prop.valueBuilt}`);
      } catch (e) {}
    } else {
      local.value = "";
    }
    local.render();
  }, [prop.value, prop.valueBuilt]);

  return (
    <CPCoded
      editCode={() => {
        local.codeEditing = true;
        local.render();
        editCode(() => {
          local.codeEditing = false;
          local.render();
        });
      }}
      reset={reset}
    />
  );
};
