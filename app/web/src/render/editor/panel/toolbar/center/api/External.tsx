import { useGlobal } from "web-utils";
import { EditorGlobal } from "../../../../logic/global";
import { ExternalDeploy } from "./ExternalDeploy";
import { w } from "../../../../logic/init";
import { reloadDBAPI } from "../../../../../../utils/script/init-api";

export const ExternalAPI = ({
  status,
  checkApi,
}: {
  status: "" | "started" | "starting" | "stopped";
  checkApi: (status?: boolean) => void;
}) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const site = p.site;

  if (!site) return null;
  return (
    <div className="flex flex-col flex-1 items-stretch space-y-1">
      <div className="flex justify-between">
        <div>API URL:</div>
        {status === "starting" && (
          <div className="text-blue-600">Checking...</div>
        )}
        {status === "started" && <div className="text-green-600">Saved</div>}

        {status === "stopped" && (
          <div className="text-red-600">Invalid Server</div>
        )}
      </div>
      <input
        type="text"
        autoFocus
        className={cx(
          "p-1 border min-w-[350px] font-mono text-[11px]",
          w.externalAPI.mode === "prod" ? "border-blue-700 bg-blue-50" : ""
        )}
        disabled={status === "starting"}
        defaultValue={w.externalAPI.prodUrl || ""}
        onInput={(e) => {
          const val = e.currentTarget.value;
          w.externalAPI.prodUrl = val;
          p.site.api_url = val;
          localStorage.setItem(`prasi-ext-prod-url-${p.site.id}`, val);
          p.render();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        onBlur={async () => {
          await db.site.update({
            where: { id: p.site.id },
            data: {
              config: {
                api_url: w.externalAPI.prodUrl,
              },
            },
          });
          const site = JSON.parse(
            localStorage.getItem(`prasi-site-${p.site.id}`) || "null"
          );
          site.config.api_url = w.externalAPI.prodUrl;
          localStorage.setItem(`prasi-site-${p.site.id}`, JSON.stringify(site));
          checkApi();
        }}
      />
      <div
        className={cx(
          "flex items-stretch h-[30px] border",
          w.externalAPI.mode === "dev" ? "border-green-700 bg-green-50" : ""
        )}
      >
        <div
          className={cx(
            "border cursor-pointer m-1 flex items-center px-2 space-x-1 w-[70px] justify-center",
            w.externalAPI.mode === "prod"
              ? "hover:bg-green-50 hover:border-green-700 hover:text-green-700 text-slate-500 "
              : "bg-green-700 text-white border-green-700"
          )}
          onClick={async () => {
            w.externalAPI.mode = w.externalAPI.mode === "dev" ? "prod" : "dev";
            localStorage.setItem(
              `prasi-ext-api-mode-${p.site.id}`,
              w.externalAPI.mode
            );

            if (w.externalAPI.mode === "dev") {
              p.site.api_url = w.externalAPI.devUrl;
              checkApi();
              await reloadDBAPI(w.externalAPI.devUrl, "dev");
            } else {
              p.site.api_url = w.externalAPI.prodUrl;
              checkApi();
              await reloadDBAPI(w.externalAPI.prodUrl, "dev");
            }
          }}
        >
          <span>DEV</span>{" "}
          {w.externalAPI.mode === "dev" && (
            <span className="text-white">ON</span>
          )}
          {w.externalAPI.mode === "prod" && (
            <span className="text-slate-300">OFF</span>
          )}
        </div>

        <input
          type="text"
          className="px-1 m-1 border flex-1 font-mono text-[11px]"
          disabled={status === "starting"}
          value={w.externalAPI.devUrl}
          onInput={(e) => {
            if (w.externalAPI.mode === "dev") {
              w.externalAPI.mode = "prod";
            }

            const val = e.currentTarget.value;
            w.externalAPI.devUrl = val;
            localStorage.setItem(`prasi-ext-dev-url-${p.site.id}`, val);
            p.render();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
          onBlur={() => {
            checkApi();
          }}
        />
      </div>

      <ExternalDeploy />
    </div>
  );
};
