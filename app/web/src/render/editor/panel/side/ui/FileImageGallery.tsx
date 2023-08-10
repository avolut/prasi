import { FC } from "react";
import { fetchSendApi } from "web-init/src/web/iframe-cors";
import { useLocal } from "web-utils";
import { Gallery } from "./Gallery";
import { Loading } from "../../../../../utils/ui/loading";
import { ToolbarBox } from "../../../../../utils/ui/box";
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
                              <div className="text-lg text-gray-700">
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill="currentColor"
                                    d="m19.21 12.04l-1.53-.11l-.3-1.5A5.484 5.484 0 0 0 12 6C9.94 6 8.08 7.14 7.12 8.96l-.5.95l-1.07.11A3.99 3.99 0 0 0 2 14c0 2.21 1.79 4 4 4h13c1.65 0 3-1.35 3-3c0-1.55-1.22-2.86-2.79-2.96zm-5.76.96v3h-2.91v-3H8l4-4l4 4h-2.55z"
                                    opacity=".3"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"
                                  />
                                </svg>
                              </div>
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
                              <div className="text-lg text-gray-700">
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g fill="currentColor">
                                    <path d="M18.512 10.077c0 .738-.625 1.337-1.396 1.337c-.77 0-1.395-.599-1.395-1.337c0-.739.625-1.338 1.395-1.338s1.396.599 1.396 1.338Z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M18.036 5.532c-1.06-.137-2.414-.137-4.123-.136h-3.826c-1.71 0-3.064 0-4.123.136c-1.09.14-1.974.437-2.67 1.104S2.29 8.149 2.142 9.195C2 10.21 2 11.508 2 13.147v.1c0 1.64 0 2.937.142 3.953c.147 1.046.456 1.892 1.152 2.559c.696.667 1.58.963 2.67 1.104c1.06.136 2.414.136 4.123.136h3.826c1.71 0 3.064 0 4.123-.136c1.09-.14 1.974-.437 2.67-1.104s1.005-1.514 1.152-2.559C22 16.184 22 14.886 22 13.248v-.1c0-1.64 0-2.937-.142-3.953c-.147-1.046-.456-1.892-1.152-2.559c-.696-.667-1.58-.963-2.67-1.104ZM6.15 6.858c-.936.12-1.475.346-1.87.724c-.393.377-.629.894-.755 1.791c-.1.72-.123 1.619-.128 2.795l.47-.395c1.125-.942 2.819-.888 3.875.124l3.99 3.825a1.2 1.2 0 0 0 1.491.124l.278-.187a3.606 3.606 0 0 1 4.34.25l2.407 2.077c.098-.264.173-.579.227-.964c.128-.916.13-2.124.13-3.824c0-1.7-.002-2.909-.13-3.825c-.126-.897-.362-1.414-.756-1.791c-.393-.378-.933-.604-1.869-.724c-.956-.124-2.216-.125-3.99-.125h-3.72c-1.774 0-3.034.001-3.99.125Z"
                                      clipRule="evenodd"
                                    />
                                    <path
                                      d="M17.087 2.61c-.86-.11-1.955-.11-3.32-.11h-3.09c-1.364 0-2.459 0-3.318.11c-.89.115-1.633.358-2.222.92a2.9 2.9 0 0 0-.724 1.12c.504-.23 1.074-.366 1.714-.45c1.085-.14 2.47-.14 4.22-.14h3.915c1.749 0 3.134 0 4.219.14c.559.073 1.064.186 1.52.366a2.875 2.875 0 0 0-.693-1.035c-.589-.563-1.331-.806-2.221-.92Z"
                                      opacity=".5"
                                    />
                                  </g>
                                </svg>
                              </div>
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
                                <div className="text-lg text-gray-700">
                                  <svg
                                    width="150"
                                    height="150"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <mask id="lineMdCloudUploadOutlineLoop0">
                                      <g fill="#fff">
                                        <circle cx="12" cy="10" r="6" />
                                        <rect
                                          width="9"
                                          height="8"
                                          x="8"
                                          y="12"
                                        />
                                        <rect
                                          width="17"
                                          height="12"
                                          x="1"
                                          y="8"
                                          rx="6"
                                        >
                                          <animate
                                            attributeName="x"
                                            dur="24s"
                                            repeatCount="indefinite"
                                            values="1;0;1;2;1"
                                          />
                                        </rect>
                                        <rect
                                          width="17"
                                          height="10"
                                          x="6"
                                          y="10"
                                          rx="5"
                                        >
                                          <animate
                                            attributeName="x"
                                            dur="15s"
                                            repeatCount="indefinite"
                                            values="6;5;6;7;6"
                                          />
                                        </rect>
                                      </g>
                                      <circle cx="12" cy="10" r="4" />
                                      <rect width="8" height="8" x="8" y="10" />
                                      <rect
                                        width="11"
                                        height="8"
                                        x="3"
                                        y="10"
                                        rx="4"
                                      >
                                        <animate
                                          attributeName="x"
                                          dur="24s"
                                          repeatCount="indefinite"
                                          values="3;2;3;4;3"
                                        />
                                      </rect>
                                      <rect
                                        width="13"
                                        height="6"
                                        x="8"
                                        y="12"
                                        rx="3"
                                      >
                                        <animate
                                          attributeName="x"
                                          dur="15s"
                                          repeatCount="indefinite"
                                          values="8;7;8;9;8"
                                        />
                                      </rect>
                                      <g fill="#fff">
                                        <rect
                                          width="3"
                                          height="4"
                                          x="10.5"
                                          y="12"
                                        />
                                        <path d="M12 9L16 13H8L12 9Z">
                                          <animateMotion
                                            calcMode="linear"
                                            dur="1.5s"
                                            keyPoints="0;0.25;0.5;0.75;1"
                                            keyTimes="0;0.1;0.5;0.8;1"
                                            path="M0 0v-1v2z"
                                            repeatCount="indefinite"
                                          />
                                        </path>
                                      </g>
                                    </mask>
                                    <rect
                                      width="24"
                                      height="24"
                                      fill="currentColor"
                                      mask="url(#lineMdCloudUploadOutlineLoop0)"
                                    />
                                  </svg>
                                </div>
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
