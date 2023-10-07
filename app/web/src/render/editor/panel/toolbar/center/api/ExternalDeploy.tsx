import { useGlobal, useLocal } from "web-utils";
import { createAPI } from "../../../../../../utils/script/init-api";
import { EditorGlobal, PG } from "../../../../logic/global";
import { AutoHeightTextarea } from "../../../../../../utils/ui/auto-textarea";
import { useEffect } from "react";
import trim from "lodash.trim";
import { formatDistance } from "date-fns/esm";
import { format } from "date-fns";

const server = {
  status: "ready" as
    | "ready"
    | "deploying"
    | "saving"
    | "pulling"
    | "restarting",
};

const DefaultLocal = {
  api: null as any,
  db: { url: "" },
  domains: [],
  current: 0,
  now: 0,
  deploys: [] as number[],
};

export const ExternalDeploy = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal(structuredClone(DefaultLocal));

  useEffect(() => {
    (async () => {
      const newlocal = structuredClone(DefaultLocal);
      for (const [k, v] of Object.entries(newlocal)) {
        (local as any)[k] = v;
      }
      local.render();

      try {
        local.api = createAPI(p.site.api_url);
        let res = await local.api._deploy({
          type: "check",
          id_site: p.site.id,
        });
        if (res) {
          local.db.url = res.db.url;
          local.now = res.now;
          local.current = res.current;
          local.domains = res.domains;
          local.deploys = res.deploys;
        }
      } catch (e) {}
      local.render();
    })();
  }, [p.site.api_url]);

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
          <ExternalDeployList api={local.api} local={local} />
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
    <div className="flex border-y mt-1 py-2 px-2 border-slate-300 boxed  flex flex-col items-stretch">
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
      <div className="flex flex-col items-stretch justify-center h-[20px]">
        {server.status === "saving" || server.status === "deploying" ? (
          <div className="flex justify-between">
            <div className="px-2 text-[12px] text-blue-500 capitalize">
              {server.status}...
            </div>
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
    <div className="flex border-b py-2 px-2 border-slate-300 boxed  flex items-center space-x-1">
      <div>Domains:</div>
      {domains.map((e) => {
        return (
          <div className="border flex items-stretch" key={e}>
            <a
              className="border-r flex items-center px-1 hover:underline hover:text-blue-500"
              href={e}
              target="_blank"
            >
              {e}
            </a>
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
  local,
}: {
  api: any;
  local: {
    current: number;
    now: number;
    deploys: number[];
    render: () => void;
  };
}) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const { deploys } = local;
  return (
    <div className="flex border-slate-200 boxed  flex flex-col items-stretch">
      <div className="flex justify-between py-2 px-2 ">
        <div>History:</div>
        <div
          className={cx(
            "px-1 border border-blue-500 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white",
            server.status === "deploying" && "opacity-50"
          )}
          onClick={async () => {
            if (server.status !== "deploying") {
              server.status = "deploying";
              p.render();

              const res = await api._deploy({
                type: "deploy",
                id_site: p.site.id,
                dlurl: `${serverurl}/site-export/${p.site.id}`,
              });

              server.status = "ready";
              p.render();
              if (res && res.current && Array.isArray(res.deploys)) {
                local.current = res.current;
                local.deploys = res.deploys;
                alert("DEPLOY: OK");
              } else {
                alert("DEPLOY: FAILED");
              }
            }
          }}
        >
          {server.status === "deploying" ? "Deploying..." : "Deploy"}
        </div>
      </div>
      {deploys.length === 0 && (
        <div className="flex items-center justify-center pb-4">
          No Deployment
        </div>
      )}
      <div className="overflow-auto h-[200px] relative border-t">
        <div className="absolute inset-0">
          {deploys
            .sort()
            .reverse()
            .map((e) => {
              let ago = "";
              let date = "";
              try {
                date = format(e, "yyyy-MM-dd HH:mm:ss");
                ago = formatDistance(e, local.now, { addSuffix: true });
              } catch (e) {}
              return (
                <div
                  key={e}
                  onClick={async () => {
                    if (local.current === e) return;
                    if (
                      server.status !== "deploying" &&
                      server.status !== "saving"
                    ) {
                      server.status = "deploying";
                      p.render();

                      const res = await api._deploy({
                        type: "redeploy",
                        id_site: p.site.id,
                        ts: e,
                      });

                      server.status = "ready";
                      p.render();
                      if (res && res.current && Array.isArray(res.deploys)) {
                        local.current = res.current;
                        local.deploys = res.deploys;
                        alert("DEPLOY: OK");
                      } else {
                        alert("DEPLOY: FAILED");
                      }
                    }
                  }}
                  className={cx(
                    "pr-4 pl-1 py-1 hover:bg-blue-50 border-b flex justify-between items-center h-[30px] font-mono text-[10px]",
                    local.current === e
                      ? "bg-green-50 border-l-4 border-l-green-700"
                      : "border-l-4 border-l-transparent",
                    server.status !== "deploying" &&
                      server.status !== "saving" &&
                      local.current !== e
                      ? "cursor-pointer"
                      : "",
                    css`
                      &:hover {
                        .deploy {
                          display: flex;
                        }
                      }
                    `
                  )}
                >
                  <div className="">
                    {date} · {ago}
                  </div>
                  {local.current !== e && (
                    <div className="text-slate-400 hidden deploy">Redeploy</div>
                  )}
                  {local.current === e ? (
                    <div className="text-green-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        fill="none"
                        viewBox="0 0 15 15"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 01-.944.12l-2.75-2.5a.625.625 0 01.841-.925l2.208 2.007 3.849-5.886a.625.625 0 01.865-.181z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <div
                      className="text-red-700 hidden deploy px-3 rounded-md hover:bg-red-100 -my-1 py-1 -mr-3 "
                      onClick={async (evt) => {
                        evt.stopPropagation();
                        evt.preventDefault();
                        if (!confirm("Delete this deploy ?")) return;
                        server.status = "deploying";
                        p.render();

                        const res = await api._deploy({
                          type: "deploy-del",
                          id_site: p.site.id,
                          ts: e,
                        });

                        server.status = "ready";
                        p.render();
                        if (res && res.current && Array.isArray(res.deploys)) {
                          local.current = res.current;
                          local.deploys = res.deploys;
                          alert("DELETE: OK");
                        } else {
                          alert("DELETE: FAILED");
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        fill="none"
                        viewBox="0 0 15 15"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
