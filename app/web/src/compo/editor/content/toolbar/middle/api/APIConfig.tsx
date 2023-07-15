import { useLocal } from "web-utils";
import { ExternalAPI } from "./External";
import { InternalAPI } from "./Internal";
import { wsdoc } from "../../../../ws/wsdoc";

export const APIConfig = () => {
  const local = useLocal({
    mode: "" as "external" | "internal" | "",
  });

  const config = wsdoc.site?.config;

  if (config?.api_url) {
    local.mode = "external";
  }
  if (config?.prasi?.port) {
    local.mode = "internal";
  }

  return (
    <div className="flex flex-col py-5 space-y-2 min-w-[350px] items-center">
      {local.mode === "" && (
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
            onClick={() => {
              local.mode = "internal";
              local.render();
            }}
          >
            Create New API Server
          </div>
        </>
      )}

      {local.mode === "external" && <ExternalAPI />}
      {local.mode === "internal" && <InternalAPI />}
    </div>
  );
};
