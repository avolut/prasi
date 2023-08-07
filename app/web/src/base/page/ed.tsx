import { page } from "web-init";
import { Editor } from "../../render/editor/editor";
import { useLocal } from "web-utils";
import { Loading } from "../../utils/ui/loading";

export default page({
  url: "/ed/:site_id/:page_id",
  component: ({}) => {
    const local = useLocal({
      loading: true,
      session: null as any,
      notfound: false,
      init: false,
    });

    if (!local.init) {
      local.init = true;
      api.session().then(async (e) => {
        if (!e) {
          navigate("/login");
          return;
        }
        local.session = e;
        local.loading = false;
        local.render();
        if (params.site_id.length < 4) {
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
            navigate(`/ed/${res.id}`);
          } else {
            local.loading = false;
            local.render();
          }
        } else if (params.page_id.length < 4) {
          const res = await db.page.findFirst({
            where: { id_site: params.site_id },
            select: {
              id: true,
            },
          });

          if (res) {
            navigate(`/ed/${params.site_id}/${res.id}`);
          } else {
            local.loading = false;
            local.notfound = true;
            local.render();
          }
        }
      });
    }

    if (local.loading) return <Loading />;

    return <Editor site_id={params.site_id} page_id={params.page_id} />;
  },
});
