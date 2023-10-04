import { useGlobal, useLocal } from "web-utils";
import { reloadDBAPI } from "../../../../../../utils/script/init-api";
import { EditorGlobal } from "../../../../logic/global";

export const ExternalAPI = ({
  status,
  checkApi,
}: {
  status: "" | "started" | "starting" | "stopped";
  checkApi: (status?: boolean) => void;
}) => {
  const local = useLocal({
    clearingCache: false,
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
      {/* 
      <div
        className={cx(
          "cursor-pointer hover:underline",
          css`
            padding: 10px 0px 0px 0px;
          `
        )}
        onClick={async () => {
          local.clearingCache = true;
          local.render();
          try {
            await reloadDBAPI(p.site.api_url, false);
          } catch (e) {}
          local.clearingCache = false;
          local.render();
          alert("API Cache Cleared");
        }}
      >
        {local.clearingCache ? "Clearing Cache..." : "Clear API Cache"}
      </div> */}
    </div>
  );
};
