import get from "lodash.get";
import trim from "lodash.trim";
import { useLocal } from "web-utils";
import { wsdoc } from "../../../../ws/wsdoc";

export const ExternalAPI = () => {
  const local = useLocal({
    status: "ready" as "ready" | "loading" | "valid" | "invalid",
  });

  const site = wsdoc.site;
  if (!site) return null;
  return (
    <div className="flex flex-col flex-1 items-stretch space-y-1">
      <div className="flex justify-between">
        <div>Existing API URL:</div>
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
        autoFocus
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

          if (val === "") {
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
            local.status = "valid";
            local.render();
            return;
          }

          try {
            const res = await fetch(trim(val, "/") + "/_prasi/_");
            const json = await res.json();
            if (!!get(json, "prasi")) {
              local.status = "valid";
            }
          } catch (e) {
            local.status = "invalid";
          }

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
          local.render();
        }}
      />
    </div>
  );
};
