import { page } from "web-init";
import { SiteEditor } from "../../compo/editor/site";
import { useLocal } from "web-utils";
import { Loading } from "../../compo/ui/loading";
import { site } from "dbgen";
import { wsdoc } from "../../compo/editor/ws/wsdoc";

export default page({
  url: "/editor/:site/:page",
  layout: "blank",
  component: ({}) => {
    const local = useLocal({ site: null as site | null, init: false });
    if (!local.init) {
      let site_id = "";

      api.session().then(async (e) => {
        if (!e) {
          navigate("/login");
          return;
        }

        wsdoc.session = e;
        if (params.site.length < 4) {
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
            navigate(`/editor/${res.id}`);
          } else {
            local.init = true;
          }
        } else {
          site_id = params.site;
          local.site = await db.site.findFirst({ where: { id: params.site } });
          local.init = true;
        }

        local.render();
      });

      return <Loading />;
    }
    if (!local.init) return <Loading />;

    if (!local.site) {
      return (
        <div className="flex-1 flex justify-center items-center">
          Site Not Found
        </div>
      );
    }

    return <SiteEditor site={local.site} page_id={params.page} />;
  },
});
