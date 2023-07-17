import { FC, useEffect } from "react";
import { useLocal } from "web-utils";
import { wsdoc } from "../../../../ws/wsdoc";
import { AutoHeightTextarea } from "../../../side/panel/link";
import { Loading } from "../../../../../ui/loading";
import trim from "lodash.trim";
import { w } from "../../../../../types/general";

export const InternalAPI: FC<{ close: () => void }> = ({ close }) => {
  const local = useLocal({ status: "...", loading: false });
  const config = wsdoc.site?.config;

  const reloadStatus = () => {
    if (wsdoc.site)
      api.srvapi_check(wsdoc.site.id).then((e) => {
        local.status = e;
        local.render();
      });
  };
  useEffect(() => {
    reloadStatus();
  }, []);

  if (local.status === "installing") {
    setTimeout(() => {
      reloadStatus();
    }, 1000);
  }

  if (local.loading || local.status === "installing")
    return (
      <div className="flex flex-1 self-stretch">
        <Loading backdrop={false} />
      </div>
    );

  return (
    <div className="flex flex-col self-stretch flex-1 items-stretch space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="space-x-1 flex items-center">
            {local.status === "started" && (
              <span className="text-green-700 text-[6px]">●</span>
            )}{" "}
            {local.status === "stopped" && (
              <span className="text-red-700 text-[6px]">●</span>
            )}
            <span className="capitalize">{local.status}</span>
          </div>
          {local.status === "started" && (
            <a
              href={`https://${config?.prasi?.port}.prasi.world`}
              target="_blank"
              className="text-blue-500 hover:underline border px-1"
            >
              https://${config?.prasi?.port}.prasi.world
            </a>
          )}
        </div>
        {local.status === "started" && (
          <div className="flex space-x-1">
            <div
              className="border border-slate-500 hover:bg-red-100 hover:border-red-500 px-2 rounded cursor-pointer"
              onClick={async () => {
                if (wsdoc.site) {
                  await api.srvapi_op(wsdoc.site.id, "stop");
                }
                reloadStatus();
              }}
            >
              Stop
            </div>

            <div
              className="border border-slate-500 hover:bg-purple-100 hover:border-purple-500 px-2 rounded cursor-pointer"
              onClick={async () => {
                if (wsdoc.site) {
                  await api.srvapi_op(wsdoc.site.id, "start");
                }
                local.loading = true;
                local.render();
                setTimeout(() => {
                  local.loading = false;
                  local.render();
                  reloadStatus();
                }, 500);
              }}
            >
              Restart
            </div>
          </div>
        )}
        {local.status === "stopped" && (
          <div className="flex space-x-1">
            <div
              className="border border-slate-500 hover:bg-green-100 hover:border-green-500 px-2 rounded cursor-pointer"
              onClick={async () => {
                if (wsdoc.site) {
                  await api.srvapi_op(wsdoc.site.id, "start");
                }
                reloadStatus();
              }}
            >
              Start
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col border-t space-y-2 -mx-2 px-2 pt-2">
        <AutoHeightTextarea
          placeholder="DATABASE_URL"
          className="p-2 border"
          value={config?.prasi?.dburl || ""}
          spellCheck={false}
          onChange={(e) => {
            if (config?.prasi) {
              config.prasi.dburl = e.currentTarget.value;
            }
            local.render();
          }}
        />

        <div className="flex justify-between">
          <div className="flex space-x-1 items-center">
            {w.prasiApiDbPull ? (
              "Pullling..."
            ) : (
              <div
                className="border border-slate-500 hover:bg-purple-100 hover:border-purple-500 px-2 rounded cursor-pointer"
                onClick={async () => {
                  if (wsdoc.site) {
                    w.prasiApiDbPull = true;
                    local.render();
                    await api.srvapi_dbpull(
                      wsdoc.site.id,
                      wsdoc.site.config.prasi?.dburl || ""
                    );

                    w.prasiApiDbPull = false;
                    local.render();

                    try {
                      if (config) {
                        config.api_url = `https://${config?.prasi?.port}.prasi.world`;

                        const base = trim(config.api_url, "/");
                        const apiTypes = await fetch(
                          base + "/_prasi/api-types"
                        );
                        const apiEntry = await fetch(
                          base + "/_prasi/api-entry"
                        );
                        w.prasiApi[config.api_url] = {
                          apiEntry: (await apiEntry.json()).srv,
                          prismaTypes: {
                            "prisma.d.ts": await loadText(
                              `${base}/_prasi/prisma/index.d.ts`
                            ),
                            "runtime/index.d.ts": await loadText(
                              `${base}/_prasi/prisma/runtime/index.d.ts`
                            ),
                            "runtime/library.d.ts": await loadText(
                              `${base}/_prasi/prisma/runtime/library.d.ts`
                            ),
                          },
                          apiTypes: await apiTypes.text(),
                        };
                        wsdoc.apiDef = w.prasiApi[config.api_url];
                      }
                    } catch (e) {
                      console.log(e);
                    }

                    alert("DB PULL SUCCESS");
                  }
                }}
              >
                DB Pull
              </div>
            )}
          </div>
          <div
            className="border border-slate-500 hover:bg-red-100 hover:border-red-500 px-2 rounded cursor-pointer"
            onClick={async () => {
              if (wsdoc.site) {
                if (confirm("Are you sure ?")) {
                  local.loading = true;
                  local.render();
                  await api.srvapi_destroy(wsdoc.site.id);
                  wsdoc.site.config = {};
                  local.loading = false;
                  local.render();
                  close();
                }
              }
            }}
          >
            Destroy
          </div>
        </div>
      </div>
    </div>
  );
};

const loadText = async (url: string) => {
  const res = await fetch(url);
  return await res.text();
};
