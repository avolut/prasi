import get from "lodash.get";
import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { initApi } from "../../../../../../utils/script/init-api";
import { Loading } from "../../../../../../utils/ui/loading";
import { EditorGlobal } from "../../../../logic/global";
import { ExternalAPI } from "./External";
import { InternalAPI } from "./Internal";

export const APIConfig: FC<{
  close: () => void;
  status: "" | "started" | "starting" | "stopped";
  checkApi: (status?: boolean) => void;
}> = ({ close, checkApi, status }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    mode: "" as "external" | "internal" | "",
    creating: false,
  });

  if (
    p.site.api_prasi.db === "" &&
    p.site.api_prasi.port === "" &&
    p.site.api_url
  ) {
    local.mode = "external";
  }
  if (
    p.site.api_prasi.db !== "" &&
    p.site.api_prasi.port !== "" &&
    p.site.api_url
  ) {
    local.mode = "internal";
  }
  return (
    <div className="flex flex-col py-2 space-y-2 min-w-[350px] min-h-[60px] items-center justify-center">
      {local.mode === "" && !local.creating && (
        <>
          <div
            className="border-2 border-slate-500 text-blue-5 px-2 py-1 rounded cursor-pointer hover:bg-blue-100 hover:border-blue-500"
            onClick={() => {
              local.mode = "external";
              local.render();
            }}
          >
            Use Existing API Server
          </div>
          <div>&mdash; OR &mdash;</div>
          <div
            className="border-2 border-slate-500 text-blue-5 px-2 py-1 rounded cursor-pointer hover:bg-blue-100 hover:border-blue-500"
            onClick={async () => {
              if (p.site.id) {
                local.creating = true;
                local.render();
                const config = await api.srvapi_new(p.site.id);
                p.site.api_url = await initApi(config);
                const configLocal: any = get(config, "prasi");
                if (configLocal) {
                  p.site.api_prasi.db = configLocal.dburl
                    ? configLocal.dburl
                    : "";
                  p.site.api_prasi.port = configLocal.port
                    ? configLocal.port
                    : "";
                }
                local.creating = false;
                local.render();
              }
            }}
          >
            Create New API Server
          </div>
        </>
      )}
      {local.creating && (
        <div className="flex flex-1 self-stretch">
          <Loading note="api-conf" backdrop={false} />
        </div>
      )}
      {local.mode === "external" && (
        <ExternalAPI status={status} checkApi={checkApi} />
      )}
      {local.mode === "internal" && (
        <InternalAPI checkApi={checkApi} close={close} />
      )}
    </div>
  );
};
