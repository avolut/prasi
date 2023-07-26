import { Icon } from "@iconify/react";
import { FC } from "react";
import { fetchSendApi } from "web-init/src/web/iframe-cors";
import { useLocal } from "web-utils";
import { ToolbarBox } from "../../../../ui/box";
import { Loading } from "../../../../ui/loading";
import { Gallery } from "./Gallery";
export const FileImageGallery: FC<{
  value?: string;
  update: (src: string) => void;
  onClose: () => void;
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
      preview: false as boolean,
      previewUrl: "" as string,
      isUpload: false as boolean,
      selectUrl: "" as string,
    },
    async () => {
      local.mode = "gallery";
      if (local.previewUrl) {
        local.selectUrl = local.previewUrl;
      }
      local.render();
    }
  );
  const onUpload: React.ChangeEventHandler<HTMLInputElement> = async function (
    e
  ) {
    local.isUpload = true;
    local.render();
    const files = e.currentTarget.files;
    if (files) {
      const res: string[] = await fetchSendApi(
        `${siteApiUrl}/_upload/${params.site}`,
        files[0]
      );
      local.previewUrl = res[0];
      local.preview = true;
      local.selectUrl = local.previewUrl;
      local.render();
    }
  };

  return (
    <>
      <div
        className="fixed  inset-0 bg-black bg-opacity-10 cursor-pointer"
        onClick={() => {
          meta.open = false;
          meta.render();
        }}
      ></div>
      <div className="fixed inset-[50px] bg-white shadow-2xl  z-50	">
        {false ? (
          <div className="flex w-full h-full items-center justify-center">
            <Loading backdrop={false} />
          </div>
        ) : (
          <div
            className={cx(
              "relative w-full h-full flex flex-col items-stretch",
              css`
                contain: content;
                overflow: auto;

                > ul {
                  width: 100%;
                }

                .row {
                  display: flex;
                  flex-direction: column;
                  align-items: stretch;
                }

                .dropping {
                  background: #efefff;
                }
              `
            )}
          >
            <div className="w-full flex flex-row">
              <div
                className={cx(
                  "toolbar",
                  "flex flex-row flex-grow px-2 justify-center items-center"
                )}
              >
                <div
                  className={cx(
                    "toolbar-right",
                    "flex mr-2 ",
                    css`
                      align-items: center !important;
                      border-bottom: 0px !important;
                      height: auto !important;

                      .toolbar-box {
                        height: 22px;
                        // margin: 0px !important;
                      }
                    `
                  )}
                >
                  <ToolbarBox
                    items={[
                      {
                        onClick() {
                          local.mode = "upload";
                          local.render();
                        },
                        className: cx(
                          local.mode === "upload" &&
                            "border-b-2 border-blue-500 bg-blue-50"
                        ),
                        content: (
                          <>
                            <div className="flex flex-row items-center justify-center space-x-2">
                              <Icon
                                icon="ic:twotone-cloud-upload"
                                className="text-lg text-gray-700"
                              />
                              <span>Upload File</span>
                            </div>
                          </>
                        ),
                      },
                      {
                        onClick() {
                          local.mode = "gallery";
                          local.render();
                        },
                        className: cx(
                          local.mode === "gallery" &&
                            "border-b-2 border-blue-500 bg-blue-50"
                        ),
                        content: (
                          <>
                            <div className="flex flex-row items-center justify-center space-x-2">
                              <Icon
                                icon="solar:gallery-wide-bold-duotone"
                                className="text-lg text-gray-700"
                              />
                              <span>Gallery</span>
                            </div>
                          </>
                        ),
                      },
                    ]}
                  />

                  {/* <ResponsiveToggle /> */}
                </div>
              </div>
            </div>

            <div className="flex-grow flex flex-col">
              {local.mode === "gallery" ? (
                <>
                  <Gallery value={value} update={update} meta={local} />
                </>
              ) : (
                <>
                  <div className="flex flex-row items-center relative px-2 py-4 space-x-4 justify-center flex-1">
                    <div className="relative flex flex-row p-2 cursor-pointer bg-blue-500 text-white">
                      <span>Upload Image</span>
                      <input
                        type="file"
                        name="file"
                        className={cx(
                          "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        )}
                        accept={accept}
                        onChange={onUpload}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row flex-grow items-center justify-center px-2 py-4 space-x-4">
                    {local.preview ? (
                      <>
                        <div
                          className={cx(
                            "border-2 rounded mx-2 flex flex-row flex-grow h-full items-center justify-center px-2 py-4 space-x-4",
                            css`
                              background-image: linear-gradient(
                                  45deg,
                                  #d1d1d1 25%,
                                  transparent 25%
                                ),
                                linear-gradient(
                                  -45deg,
                                  #d1d1d1 25%,
                                  transparent 25%
                                ),
                                linear-gradient(
                                  45deg,
                                  transparent 75%,
                                  #d1d1d1 75%
                                ),
                                linear-gradient(
                                  -45deg,
                                  transparent 75%,
                                  #d1d1d1 75%
                                );
                              background-size: 20px 20px;
                              background-position: 0 0, 0 10px, 10px -10px,
                                -10px 0px;
                            `
                          )}
                        >
                          <a
                            href={`${siteApiUrl}${local.previewUrl}`}
                            className={cx(
                              "bg-no-repeat	bg-contain bg-center  rounded mx-2 flex flex-row flex-grow h-full items-center justify-center px-2 py-4 space-x-4",
                              css`
                                background-image: url("${siteApiUrl}${local.previewUrl}");
                              `
                            )}
                          ></a>
                        </div>
                      </>
                    ) : (
                      <>
                        {local.isUpload ? (
                          <>
                            <div
                              className={cx(
                                "border-2 rounded mx-2 flex flex-row flex-grow h-full items-center justify-center px-2 py-4 space-x-4"
                              )}
                            >
                              <div className="flex flex-col space-y-2">
                                <Icon
                                  icon="line-md:cloud-upload-outline-loop"
                                  className="text-9xl text-gray-700"
                                />
                                <div className="flex flex-row space-x-2 items-center justify-center text-xl">
                                  <span className="flex flex-row space-x-2">
                                    Uploading...
                                  </span>
                                  {/* <span className="flex flex-row space-x-2 font-medium">
                                    10%
                                  </span> */}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            {local.selectUrl && (
              <div className="border-t-2  flex flex-row items-center justify-end p-4">
                <div
                  onClick={() => {
                    // FieldImg;
                    update(local.selectUrl);
                    meta.open = false;
                    meta.render();
                  }}
                  className="relative flex flex-row p-2 cursor-pointer bg-blue-500 text-white font-medium px-6"
                >
                  <span>Choose Image</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
