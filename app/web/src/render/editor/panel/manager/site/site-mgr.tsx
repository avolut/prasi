import { org } from "dbgen";
import { useGlobal, useLocal } from "web-utils";
import { Loading } from "../../../../../utils/ui/loading";
import { EditorGlobal } from "../../../logic/global";
import { SiteForm } from "./site-form";

export type SiteItem = {
  id: string;
  name: string;
  domain: string;
  id_org: null | string;
};

export const SiteManager = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    edit: null as null | Partial<SiteItem>,
    loading: true,
    sites: [] as SiteItem[],
    orgs: {} as Record<string, org>,
    active_org: "",
  });

  const reloadSites = async () => {
    const orgs = await db.org_user.findMany({
      where: {
        id_user: p.session.data.user.id,
      },
      select: {
        org: true,
      },
    });

    local.orgs = {};

    if (orgs) {
      for (const org of orgs) {
        local.orgs[org.org.id] = org.org;
      }
      const sites = await db.site.findMany({
        where: {
          id_org: { in: Object.keys(local.orgs) },
          is_deleted: false,
        },
        select: {
          id_org: true,
          id: true,
          name: true,
          responsive: true,
          domain: true,
        },
      });
      local.sites = sites;
    }

    local.loading = false;
    local.render();
  };

  const boxClass =
    "flex flex-col items-start w-[200px] h-[100px] p-2 text-sm border cursor-pointer hover:bg-blue-100 ml-1 mb-1";

  const site_id = p.site.id;

  if (local.sites.length === 0) {
    reloadSites();
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-10 cursor-pointer"
        onClick={() => {
          p.manager.site = false;
          p.render();
        }}
      ></div>
      <div className="fixed inset-[50px] bg-white shadow-2xl">
        {local.loading ? (
          <div className="flex w-full h-full items-center justify-center">
            <Loading note="site-mgr" backdrop={false} />
          </div>
        ) : (
          <div
            className={cx(
              "relative w-full h-full pt-1",
              css`
                contain: content;
                overflow: auto;
              `
            )}
          >
            <div className="flex flex-col space-y-2">
              {Object.values(local.orgs).map((org) => {
                return (
                  <div className="flex flex-col" key={org.id}>
                    <div className="p-1 text-base capitalize">{org.name}</div>
                    <div className="flex items-start flex-wrap">
                      {local.sites.map((e) => {
                        if (e.id_org !== org.id) return null;

                        return (
                          <div
                            key={e.id}
                            className={cx(
                              boxClass,
                              "justify-between transition-all",
                              site_id === e.id && "border-4  border-blue-500",
                              css`
                                .edit {
                                  display: none;
                                }

                                &:hover {
                                  .edit {
                                    display: flex;
                                  }
                                }
                              `
                            )}
                            onClick={() => {
                              location.href = `/editor/${e.id}`;
                            }}
                          >
                            <div>{e.name}</div>
                            <div
                              className={cx(
                                "edit bg-blue-200 hover:bg-blue-500 transition-all px-3 rounded-sm text-sm text-white"
                              )}
                              onClick={(ev) => {
                                ev.preventDefault();
                                ev.stopPropagation();

                                local.edit = e;
                                local.render();
                              }}
                            >
                              Edit
                            </div>
                          </div>
                        );
                      })}

                      <div
                        className={cx(
                          boxClass,
                          "flex flex-col items-center justify-center space-y-1"
                        )}
                        onClick={(ev) => {
                          ev.preventDefault();
                          ev.stopPropagation();

                          local.active_org = org.id;
                          local.edit = {};
                          local.render();
                        }}
                      >
                        <svg
                          className="text-slate-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 15 15"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M7.5.877a6.623 6.623 0 100 13.246A6.623 6.623 0 007.5.877zM1.827 7.5a5.673 5.673 0 1111.346 0 5.673 5.673 0 01-11.346 0zM7.5 4a.5.5 0 01.5.5V7h2.5a.5.5 0 110 1H8v2.5a.5.5 0 01-1 0V8H4.5a.5.5 0 010-1H7V4.5a.5.5 0 01.5-.5z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <div className="text-sm text-slate-500">
                          Create New Site
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {local.edit && (
          <SiteForm
            onClose={() => {
              local.edit = null;
              local.active_org = "";
              local.render();
            }}
            onSave={async () => {
              local.edit = null;
              local.render();
              local.loading = true;
              local.render();
              await reloadSites();
              local.loading = false;
              local.render();
            }}
            site={local.edit}
            group_id={local.active_org}
          />
        )}
      </div>
    </>
  );
};
