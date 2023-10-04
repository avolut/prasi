import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../../logic/global";
import { createAPI } from "../../../../../../utils/script/init-api";

export const ExternalAPI = ({
  status,
  checkApi,
}: {
  status: "" | "started" | "starting" | "stopped";
  checkApi: (status?: boolean) => void;
}) => {
  const local = useLocal({}, async () => {
    const api = await createAPI(p.site.api_url);
    const res = await api._deploy({ type: "check" });
    if (res && res.deployed) {
    
    }
  });

  const p = useGlobal(EditorGlobal, "EDITOR");
  const site = p.site;

  if (!site) return null;
  return (
    <div className="flex flex-col flex-1 items-stretch space-y-1">
      <div className="flex justify-between">
        <div>Existing API URL:</div>
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
        className="p-1 border min-w-[350px] font-mono text-[11px]"
        disabled={status === "starting"}
        defaultValue={p.site.api_url || ""}
        onInput={(e) => {
          const val = e.currentTarget.value;
          p.site.api_url = val;
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
  );
};
