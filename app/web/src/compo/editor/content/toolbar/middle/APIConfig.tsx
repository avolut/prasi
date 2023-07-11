import { useLocal } from "web-utils";
import trim from "lodash.trim";
import get from "lodash.get";
import * as Y from "yjs";
import { syncronize } from "y-pojo";
import { wsdoc } from "../../../ws/wsdoc";

export const APIConfig = () => {
  const local = useLocal({
    status: "ready" as "ready" | "loading" | "valid" | "invalid",
  });
  const site = wsdoc.site;
  if (!site) return null;

  return (
    <div className="flex flex-col items-stretch py-2 space-y-1">
      <div className="flex justify-between">
        <div>API URL:</div>
        {local.status === "loading" && (
          <div className="text-blue-600">Checking...</div>
        )}

        {local.status === "valid" && (
          <div className="text-green-600">Saved</div>
        )}

        {local.status === "invalid" && (
          <div className="text-red-600">Invalid URL</div>
        )}
      </div>
      <input
        type="text"
        className="p-1 border min-w-[350px] font-mono text-[11px]"
        disabled={local.status === "loading"}
        defaultValue={site.config?.api_url || ""}
        onKeyDown={(e) => {
          local.status = "ready";
          local.render();
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        onBlur={async (e) => {
          const val = e.currentTarget.value;
          local.status = "loading";
          local.render();

          try {
            const res = await fetch(trim(val, "/") + "/_prasi/_");
            const json = await res.json();
            if (!!get(json, "prasi")) {
              local.status = "valid";

              await db.site.update({
                data: {
                  config: {
                    api_url: val,
                  },
                },
                where: {
                  id: wsdoc.site?.id,
                },
              });
            }
          } catch (e) {
            local.status = "invalid";
          }
          local.render();
        }}
      />
    </div>
  );
};
