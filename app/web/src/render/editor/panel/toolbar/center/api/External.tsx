import get from "lodash.get";
import trim from "lodash.trim";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../../logic/global";

export const ExternalAPI = () => {
  const local = useLocal({
    status: "ready" as "ready" | "loading" | "valid" | "invalid",
  });

  const p = useGlobal(EditorGlobal, "EDITOR");
  const site = p.site;
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
        defaultValue={p.site.api_url || ""}
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
                id: p.site?.id,
              },
            });
            local.status = "valid";
          } else {
            try {
              const res = await fetch(trim(val, "/") + "/_prasi/_", {
                mode: "no-cors",
              });
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
                id: p.site?.id,
              },
            });
          }
          if (p.site) {
            p.site.api_url = val;
            // console.log("console", wsdoc.site.config);
          }

          local.render();
        }}
      />
    </div>
  );
};
