import { useGlobal, useLocal } from "web-utils";
import { createAPI } from "../../../../../../utils/script/init-api";
import { EditorGlobal, PG } from "../../../../logic/global";
import { AutoHeightTextarea } from "../../../../../../utils/ui/auto-textarea";
import { useEffect } from "react";
import trim from "lodash.trim";

const server = {
  status: "ready" as "ready" | "saving" | "pulling" | "restarting",
};

export const ExternalDeploy = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal(
    {
      api: null as any,
      db: { url: "" },
      domains: [],
      current: 0,
      deploys: [] as number[],
    },
    async () => {
      try {
        local.api = await createAPI(p.site.api_url);
        let res = await local.api._deploy({
          type: "check",
          id_site: p.site.id,
        });
        if (res) {
          local.db.url = res.db.url;
          local.domains = res.domains;
          local.deploys = res.deploys;
        }
        local.render();
      } catch (e) {}
    }
  );

  return (
    <div
      className={cx(
        "flex flex-col items-stretch -mx-2",
        css`
          margin-bottom: -10px !important;

          .boxed {
            position: relative;
          }
          .boxed:hover {
            &::before {
              position: absolute;
              content: " ";
              top: 0px;
              left: 0px;
              bottom: 0px;
              border-left: 4px solid #3c82f6;
            }
          }
        `
      )}
    >
      {local.db.url && (
        <>
          <ExternalDeployDB api={local.api} url={local.db.url} />
          <ExternalDomainList api={local.api} domains={local.domains} />
          <ExternalDeployList
            api={local.api}
            deploys={local.deploys}
            current={local.current}
          />
        </>
      )}
    </div>
  );
};

const ExternalDeployDB = ({ url, api }: { url: string; api: any }) => {
  const local = useLocal({
    url,
  });
  const p = useGlobal(EditorGlobal, "EDITOR");
  useEffect(() => {
    local.url = url;
    local.render();
  }, [url]);

  return (
    <div className="flex border-y mt-1 py-2 px-2 border-slate-200 boxed  flex flex-col items-stretch">
      <AutoHeightTextarea
        value={local.url}
        className="text-[12px] border p-2 mb-2 "
        onChange={(e) => {
          local.url = e.currentTarget.value;
          local.render();
        }}
        onBlur={async () => {
          server.status = "saving";
          local.render();
          await api._deploy({
            type: "db-update",
            id_site: p.site.id,
            url: local.url,
          });
          server.status = "ready";
          local.render();
        }}
      />
      {server.status === "saving" ? (
        <div className="flex justify-between">
          <div className="px-2 text-[12px] text-blue-500">Saving...</div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div>
            {server.status !== "pulling" && (
              <div
                className="border rounded-sm px-2 text-[12px] hover:bg-blue-100 cursor-pointer"
                onClick={async () => {
                  server.status = "pulling";
                  local.render();
                  await api._deploy({
                    type: "db-pull",
                    id_site: p.site.id,
                  });
                  server.status = "ready";
                  local.render();
                  alert("DB PULL & GENERATE: OK\nRESTART: OK");
                }}
              >
                DB Pull
              </div>
            )}
            {server.status === "pulling" && (
              <div className="px-2 text-[12px] text-blue-500">
                Pulling DB...
              </div>
            )}
          </div>
          <div>
            {server.status !== "restarting" && (
              <div
                className="border rounded-sm px-2 text-[12px] hover:bg-blue-100 cursor-pointer"
                onClick={async () => {
                  server.status = "restarting";
                  local.render();

                  await api._deploy({
                    type: "restart",
                    id_site: p.site.id,
                  });
                  server.status = "ready";
                  local.render();
                  alert("RESTART: OK");
                }}
              >
                Restart Server
              </div>
            )}
            {server.status === "restarting" && (
              <div className="px-2 text-[12px] text-blue-500">
                Restarting...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ExternalDomainList = ({
  api,
  domains,
}: {
  api: any;
  domains: string[];
}) => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  return (
    <div className="flex border-b py-2 px-2 border-slate-200 boxed  flex items-center space-x-1">
      <div>Domains:</div>
      {domains.map((e) => {
        return (
          <div className="border flex items-stretch ">
            <div className="border-r flex items-center px-1">{e}</div>
            <div
              className="flex items-center px-1 cursor-pointer hover:bg-red-500 hover:text-white text-red-500"
              onClick={async () => {
                if (confirm("Remove this domain ?")) {
                  server.status = "saving";
                  p.render();

                  await api._deploy({
                    type: "domain-del",
                    id_site: p.site.id,
                    domain: e,
                  });
                  const idx = domains.indexOf(e);
                  domains.splice(idx, 1);
                  server.status = "ready";
                  p.render();
                  alert("DOMAIN REMOVED");
                }
              }}
            >
              &times;
            </div>
          </div>
        );
      })}
      <div
        className="px-1 border cursor-pointer hover:bg-blue-100"
        onClick={async () => {
          const name = trim(
            prompt("New Domain (include https://)", `https://`) || "",
            "/ "
          );
          if (name) {
            server.status = "saving";
            p.render();

            await api._deploy({
              type: "domain-add",
              id_site: p.site.id,
              domain: name,
            });
            domains.push(name);
            server.status = "ready";
            p.render();
            alert("DOMAIN ADDED");
          }
        }}
      >
        + New
      </div>
    </div>
  );
};

const ExternalDeployList = ({
  api,
  deploys,
}: {
  api: any;
  current: number;
  deploys: number[];
}) => {
  return (
    <div className="flex border-slate-200 boxed  flex flex-col items-stretch">
      <div className="flex justify-between py-2 px-2 ">
        <div>History:</div>
        <div className="px-1 border border-blue-500 text-blue-500 cursor-pointer  hover:bg-blue-500 hover:text-white">
          Deploy
        </div>
      </div>
      {deploys.length === 0 && (
        <div className="flex items-center justify-center pb-4">
          No Deployment
        </div>
      )}
    </div>
  );
};
