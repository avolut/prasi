import { page } from "web-init";
import { Editor } from "../../render/editor/editor";
import { useLocal } from "web-utils";
import { Loading } from "../../utils/ui/loading";

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

    if (!local.init) {
      api.session().then(async (e) => {
        local.init = true;
        if (!e) {
          navigate("/login");
          return;
        }
        local.session = e;
        if (!site_id) {
          const res = await db.site.findFirst({
            where: {
              is_deleted: false,
              org: {
                org_user: {
                  some: { id_user: e.data.user.id },
                },
              },
            },
            select: {
              id: true,
            },
          });
          if (res) {
            const page = await db.page.findFirst({
              where: { id_site: res.id },
              select: {
                id: true,
              },
            });
            if (page) {
              navigate(`/ed/${res.id}/${page.id}`);
            }
          } else {
            local.loading = false;
            local.render();
          }
        } else if (!page_id) {
          let res = await db.page.findFirst({
            where: { id_site: site_id },
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
            navigate(`/ed/${site_id}/${res.id}`);
          }
        } else {
          local.init = true;
          local.loading = false;
          local.render();
        }
      });
    }

    if (local.loading) return <Loading note="base-page" />;

    return (
      <Editor session={local.session} site_id={site_id} page_id={page_id} />
    );
  },
});
