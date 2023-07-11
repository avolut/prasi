import { FC, useTransition } from "react";
import { fetchSendApi } from "web-init/src/web/iframe-cors";
import { useLocal } from "web-utils";
import { Button } from "./Button";
export const FilePicker: FC<{
  value?: string;
  update: (src: string) => void;
  onClose: () => void;
  accept?: string;
  type?: string;
}> = ({
  onClose,
  update,
  value,
  accept = "video/mp4, image/jpeg, image/png, image/jpg, image/x-icon, image/vnd.microsoft.icon",
  type = "image",
}) => {
  const local = useLocal({
    value: value || "",
    load: true,
  });

  const [_, tx] = useTransition();
  const onUpload: React.ChangeEventHandler<HTMLInputElement> = async function (
    e
  ) {
    const files = e.currentTarget.files;
    if (files) {
      // const res: string[] = (await fetchSendApi(
      //   `${siteApiUrl}/_upload${site ? `/${site.id}` : ""}`,
      //   files[0]
      // )) as any;
      // if (res) {
      //   const val = res[0];
      //   local.value = val;
      //   local.render();
      //   update(val);
      // }
      // onClose();
    }
  };

  return null;

  return (
    <>
      <div className="flex flex-col items-stretch space-y-2 flex-1">
        <div className="flex-1 flex flex-col  relative">
          <div className="absolute inset-0 flex overflow-hidden pointer-events-none items-center text-center justify-center">
            {local.load && local.value && (
              <div className={cx("self-center")}>Loading</div>
            )}
            {!!local.value ? (
              <>
                {type === "image" && (
                  <img
                    src={
                      local.value.startsWith("http")
                        ? local.value
                        : `${siteApiUrl}${local.value}?w=500&h=500&fit=contain`
                    }
                    className={cx(
                      css`
                        visibility: "visible";
                        max-height: 100%;
                        max-width: 100%;
                      `,
                      "self-center"
                    )}
                    onLoad={() => {
                      local.load = false;
                      local.render();
                    }}
                  />
                )}
                {type === "pdf" && (
                  <div className=" text-9xl text-green-600 pb-8">
                    <PdfDocument />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center">
                <span>Please Upload Image</span>
                <i className="italic"> &mdash; or &mdash;</i>
                <span>Fill Image URL</span>
              </div>
            )}
          </div>

          <input
            type="file"
            name="file"
            className={cx("absolute inset-0 opacity-0")}
            accept={accept}
            onChange={onUpload}
          />
        </div>
        <input
          value={local.value}
          spellCheck={false}
          placeholder="Image URL"
          onChange={(e) => {
            local.value = e.currentTarget.value;
            local.render();

            tx(() => {
              update(local.value);
            });
          }}
        />
        <div className="flex justify-between">
          <input type="file" name="file" accept={accept} onChange={onUpload} />
          <Button
            onClick={() => {
              local.value = "";
              local.render();

              tx(() => {
                update(local.value);
              });
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </>
  );
};

const PdfDocument = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    fill="none"
    viewBox="0 0 100 125"
  >
    {" "}
    <path
      fill="#000"
      fillRule="evenodd"
      d="M58.993 32A2.992 2.992 0 0156 29.007V4H19.666A3.665 3.665 0 0016 7.668v82.664A3.674 3.674 0 0019.68 94h60.64A3.683 3.683 0 0084 90.322V32H58.993zm6.919 35.403c-.544.274-1.36.549-2.448.549-2.176 0-5.44-.549-8.16-1.92-4.624.549-8.16 1.097-10.88 2.194-.272 0-.272 0-.544.274-3.264 5.758-5.984 8.5-8.16 8.5-.544 0-.816 0-1.088-.274l-1.36-.823v-.274C33 75.081 33 74.806 33 74.259c.272-1.372 1.904-3.84 5.168-5.759.544-.274 1.36-.823 2.448-1.371.816-1.37 1.632-3.016 2.72-4.935 1.36-2.742 2.176-5.484 2.992-7.952-1.088-3.29-1.632-5.21-.544-9.048C46.056 44.097 46.872 43 47.96 43h.544c.544 0 1.088.274 1.632.548 1.904 1.92 1.088 6.307 0 9.871v.275c1.088 3.016 2.72 5.483 4.352 7.129.816.548 1.36 1.096 2.448 1.645 1.36 0 2.448-.274 3.536-.274 3.264 0 5.44.548 6.256 1.919.272.548.272 1.097.272 1.645-.272.274-.544 1.097-1.088 1.645zM48.232 56.71c-.544 1.919-1.632 4.113-2.72 6.58-.544 1.097-1.088 1.92-1.632 3.016h.544c3.536-1.37 6.8-2.193 8.976-2.467-.544-.274-.816-.549-1.088-.823-1.36-1.645-2.992-3.839-4.08-6.306zm16.592 8.5c-.272-.275-1.36-1.097-5.168-1.097h-.544v.274c1.904.823 3.808 1.371 5.168 1.371H65.096v-.274s-.272 0-.272-.274zM39.8 69.323c-.544.274-1.088.548-1.36.822-1.904 1.645-3.264 3.565-3.536 4.387 1.632-.274 3.264-1.92 4.896-5.21zm8.16-18.92c.272-1.097.544-1.645.544-2.468v-.548c.272-1.37.272-2.468 0-2.742v-.274l-.272-.274s0 .274-.272.274c-.544 1.645-.544 3.564 0 6.032zM84 28H62.005A2.005 2.005 0 0160 25.995V4l24 24z"
    ></path>
  </svg>
);
