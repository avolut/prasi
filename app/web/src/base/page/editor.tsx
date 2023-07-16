import { site } from "dbgen";
import trim from "lodash.trim";
import { page } from "web-init";
import { useLocal } from "web-utils";
import { SiteEditor } from "../../compo/editor/site";
import { wsdoc } from "../../compo/editor/ws/wsdoc";
import { w } from "../../compo/types/general";
import { Loading } from "../../compo/ui/loading";
import { SiteConfig } from "../../../../srv/edit/tools/load-site";

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
          const config = local.site?.config as SiteConfig;

          if (config.prasi) {
            config.api_url = `${location.protocol}//${location.hostname}:${config?.prasi?.port}`;
          }

          if (!w.prasiApi) {
            w.prasiApi = {};
          }

          if (config && config.api_url) {
            try {
              const base = trim(config.api_url, "/");
              const apiTypes = await fetch(base + "/_prasi/api-types");
              const apiEntry = await fetch(base + "/_prasi/api-entry");
              w.prasiApi[config.api_url] = {
                apiEntry: (await apiEntry.json()).srv,
                prismaTypes: {
                  "prisma.d.ts": await loadText(
                    `${base}/_prasi/prisma/index.d.ts`
                  ),
                  "runtime/index.d.ts": await loadText(
                    `${base}/_prasi/prisma/runtime/index.d.ts`
                  ),
                  "runtime/library.d.ts": await loadText(
                    `${base}/_prasi/prisma/runtime/library.d.ts`
                  ),
                },
                apiTypes: await apiTypes.text(),
              };
              wsdoc.apiDef = w.prasiApi[config.api_url];
            } catch (e) {
              console.log(e);
            }
          }

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

const loadText = async (url: string) => {
  const res = await fetch(url);
  return await res.text();
};
