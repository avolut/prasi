import { FC, useEffect } from "react";
import { useLocal } from "web-utils";
import { FilePicker } from "./FilePicker";
import { Button } from "./Button";
import { FileImageGallery } from "./FileImageGallery";

export const FieldImg: FC<{
  value?: string;
  update: (value: string) => void;
}> = ({ value, update }) => {
  const local = useLocal({ val: "", open: false });

  useEffect(() => {
    local.val = value || "";
    local.render();
  }, [value]);

  return (
    <>
      <Button
        className="btn-hover h-[22px]"
        appearance="subtle"
        onClick={() => {
          local.open = true;
          local.render();
        }}
      >
        Image
      </Button>
      {local.open && (
        <FileImageGallery
          value={value}
          update={update}
          meta={local}
          onClose={() => {
            local.open = false;
            local.render();
          }}
        />
      )}
    </>
  );
};
