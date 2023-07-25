import { FC, useTransition } from "react";
import { fetchSendApi } from "web-init/src/web/iframe-cors";
import { useLocal } from "web-utils";
import { Button } from "./Button";
import { Loading } from "../../../../ui/loading";
import { ToolbarBox } from "../../../../ui/box";
import { Icon } from "@iconify/react";
import get from "lodash.get";
import { format } from "date-fns";
export const Gallery: FC<{
  value?: string;
  update: (src: string) => void;
  onClose?: () => void;
  accept?: string;
  type?: string;
  meta?: any;
}> = ({
  meta,
  onClose,
  update,
  value,
  accept = "video/mp4, image/jpeg, image/png, image/jpg, image/x-icon, image/vnd.microsoft.icon",
  type = "image",
}) => {
  const local = useLocal(
    {
      value: value || "",
      load: true,
      mode: "upload",
      list: [
        "https://picsum.photos/200",
        "https://picsum.photos/200",
        "https://picsum.photos/200",
        "https://picsum.photos/200",
        "https://picsum.photos/200",
      ] as Array<any>,
      ready: false,
      isPreview: false,
      preview: {
        url: "" as string,
        dimension: {
          width: 0 as number,
          height: 0 as number,
        },
        details: null as any,
      },
    },
    async () => {
      local.isPreview = false;
      local.ready = false;
      local.render();
      let res = (await fetchSendApi(
        `${siteApiUrl}/get-gallery/${params.site}`,
        {}
      )) as any;
      local.list = res.data;
      local.ready = true;
      local.render();
    }
  );

  const [_, tx] = useTransition();
  const getSize = (size: number) => {
    let hz = "";
    if (size < 1024) hz = size + " B";
    else if (size < 1024 * 1024) hz = (size / 1024).toFixed(2) + " KB";
    else if (size < 1024 * 1024 * 1024)
      hz = (size / 1024 / 1024).toFixed(2) + " MB";
    else hz = (size / 1024 / 1024 / 1024).toFixed(2) + " GB";
    return hz;
  };
  const loadImage: any = (imageSrc: any) =>
    new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const height = image.height;
        const width = image.width;
        resolve({ image, width, height });
      };
      image.src = imageSrc;
    });
  const onUpload: React.ChangeEventHandler<HTMLInputElement> = async function (
    e
  ) {
    const files = e.currentTarget.files;
    if (files) {
    }
  };

  return (
    <>
      {local.ready ? (
        <>
          <div className="flex flex-row flex-grow w-full">
            <div className="flex flex-row flex-grow">
              <div className="flex-row flex p-2 relative flex-grow overflow-auto">
                <div
                  className={cx(
                    "flex items-start flex-wrap pl-[10px] absolute w-full h-full top-0 left-0"
                  )}
                >
                  {local.list.map((e, idx) => {
                    return (
                      <div
                        key={e.path}
                        className={cx(
                          "flex flex-col items-start w-[200px] h-[100px] p-2 text-sm  cursor-pointer hover:bg-blue-100 ml-1 mb-1",
                          "justify-between transition-all",
                          "hover:border-blue-500",
                          "bg-no-repeat	bg-cover bg-center",
                          local.preview.url === `${siteApiUrl}${get(e, "path")}`
                            ? "border-4 border-blue-500 shadow-xl"
                            : "border",
                          css`
                            background-image: url("${siteApiUrl}${get(
                              e,
                              "path"
                            )}");
                            .edit {
                              display: none;
                            }

                            &:hover {
                              .edit {
                                display: flex;
                              }
                            }
                          `
                        )}
                        onClick={async () => {
                          const { width, height } = await loadImage(
                            `${siteApiUrl}${get(e, "path")}`
                          );
                          local.preview = {
                            url: `${siteApiUrl}${get(e, "path")}`,
                            dimension: {
                              width,
                              height,
                            },
                            details: e,
                          };
                          local.isPreview = true;
                          meta.selectUrl = `${siteApiUrl}${get(e, "path")}`;
                          local.render();
                        }}
                      >
                        <div className="flex flex-col">
                          {/* <div>{"sdasdasd"}</div> */}
                        </div>
                        <div
                          className="flex justify-between self-stretch"
                          onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {local.isPreview ? (
              <>
                <div className="border-l-2 w-1/4 flex flex-col">
                  <div
                    className={cx(
                      "border-2 rounded m-2 flex flex-row items-center justify-center space-x-4 h-[200px]",
                      css`
                        background-image: linear-gradient(
                            45deg,
                            #d1d1d1 25%,
                            transparent 25%
                          ),
                          linear-gradient(-45deg, #d1d1d1 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, #d1d1d1 75%),
                          linear-gradient(-45deg, transparent 75%, #d1d1d1 75%);
                        background-size: 20px 20px;
                        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                      `
                    )}
                  >
                    <a
                      href={`#`}
                      className={cx(
                        "bg-no-repeat	bg-contain bg-center  rounded flex flex-row flex-grow h-full items-center justify-center space-x-4",
                        css`
                          background-image: url("${local.preview.url}");
                        `
                      )}
                    ></a>
                  </div>
                  <p className="text-lg px-1">
                    Dimension:{" "}
                    <span>{`${local.preview.dimension.width} x ${local.preview.dimension.height}`}</span>{" "}
                  </p>
                  <p className="text-lg px-1">
                    File Size:{" "}
                    <span>{getSize(local.preview.details.size)}</span>
                  </p>
                  <p className="text-lg px-1">
                    Last Modified:{" "}
                    <span>
                      {format(
                        new Date(local.preview.details.detail.mtime),
                        "d MMMM yyyy"
                      )}
                    </span>{" "}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full h-full items-center justify-center">
            <Loading backdrop={false} />
          </div>
        </>
      )}
    </>
  );
};
