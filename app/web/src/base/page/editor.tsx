import { page } from "web-init";
import { Editor } from "../../render/editor/editor";
import { useLocal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { useEffect } from "react";

export default page({
  url: "/editor/:site_id/:page_id",
  component: ({}) => {
    const local = useLocal({
      loading: true,
      session: null as any,
      notfound: false,
      init: false,
    });
    const site_id = params.site_id === "_" ? "" : params.site_id;
    const page_id = params.page_id === "_" ? "" : params.page_id;

    useEffect(() => {
      if (!local.init) {
        (async () => {
          let ses: any = null;
          try {
            ses = JSON.parse(localStorage.getItem("prasi-session") || "");
          } catch (e) {}

          await new Promise<void>(async (done) => {
            if (!!ses) {
              done();
            }
            let e = await api.session();
            if (!e) {
              (window as any).redirectTo = location.pathname;
              navigate("/login");
              localStorage.removeItem("prasi-session");
            } else {
              localStorage.setItem("prasi-session", JSON.stringify(e));
            }
            if (!ses) {
              ses = e;
              done();
            }
          });

          if (ses) {
            local.session = ses;

            if (!site_id) {
              const res = await db.site.findFirst({
                where: {
                  is_deleted: false,
                  org: {
                    org_user: {
                      some: { id_user: ses.data.user.id },
                    },
                  },
                },
                select: {
                  id: true,
                },
              });
              if (res) {
                const page = await db.page.findFirst({
                  where: {
                    id_site: res.id,
                    is_deleted: false,
                  },
                  select: {
                    id: true,
                  },
                });
                if (page) {
                  local.loading = false;
                  local.render();
                  navigate(`/editor/${res.id}/${page.id}`);
                  return;
                }
              } else {
                local.loading = false;
                local.render();
                return;
              }
            } else if (!page_id) {
              let res = await db.page.findFirst({
                where: {
                  id_site: site_id,
                  is_deleted: false,
                },
                select: {
                  id: true,
                },
              });

              if (!res) {
                res = await db.page.create({
                  data: {
                    content_tree: {
                      childs: [],
                      id: "root",
                      type: "root",
                    },
                    name: "home",
                    url: "/",
                    id_site: site_id,
                  },
                });
              }

              if (res) {
                local.loading = false;
                local.render();
                navigate(`/editor/${site_id}/${res.id}`);
                return;
              }
            }
          }

          local.init = true;
          local.loading = false;
          local.render();
        })();
      }
    }, [local.init]);

    if (local.loading) return <Loading note="base-page" />;

    return (
      <Editor session={local.session} site_id={site_id} page_id={page_id} />
    );
  },
});
