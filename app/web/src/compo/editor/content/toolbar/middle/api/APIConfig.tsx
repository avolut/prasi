import { FC } from "react";
import { useLocal } from "web-utils";
import { Loading } from "../../../../../ui/loading";
import { wsdoc } from "../../../../ws/wsdoc";
import { ExternalAPI } from "./External";
import { InternalAPI } from "./Internal";

export const APIConfig: FC<{ close: () => void }> = ({ close }) => {
  const local = useLocal({
    mode: "" as "external" | "internal" | "",
    creating: false,
  });

  const config = wsdoc.site?.config;

  if (config?.api_url) {
    local.mode = "external";
  }
  if (config?.prasi?.port) {
    local.mode = "internal";
  }

  return (
    <div className="flex flex-col py-2 space-y-2 min-w-[350px] min-h-[100px] items-center justify-center">
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
              if (wsdoc.site) {
                local.creating = true;
                local.render();

                const config = await api.srvapi_new(wsdoc.site.id);
                wsdoc.site.config = config;
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
          <Loading backdrop={false} />
        </div>
      )}
      {local.mode === "external" && <ExternalAPI />}
      {local.mode === "internal" && <InternalAPI close={close} />}
    </div>
  );
};
