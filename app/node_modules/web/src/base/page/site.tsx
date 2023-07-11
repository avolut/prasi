import { validate } from "uuid";
import { createRouter, page } from "web-init";
import { useLocal } from "web-utils";
import { w } from "../../compo/types/general";
import { Loading } from "../../compo/ui/loading";

const SELECT_FIELD = {
  id: true,
  js: true,
  url: true,
  js_compiled: true,
  content_tree: true,
};

export default page({
  url: "/site/:name/**",
  component: () => {
    const local = useLocal({});
    if (params._ === "_") {
      params._ = "";
    }
    const urlpath = (params._ || "").startsWith("/")
      ? params._
      : `/${params._}`;

    const site_id = params.name;
    const q = new URLSearchParams(location.search);
    const page_id = q.get("p");

    if (!w.isPreview && q.get("preview")) {
      if (validate(site_id)) {
        w.isPreview = true;
      }
    }

    if (!w.prasiSite || !w.prasiRouter) {
      api
        .site_load(
          params.name || "",
          page_id ? { id: page_id } : { path: urlpath }
        )
        .then(({ site, page, pages }) => {
          if (site) {
            w.prasiSite = site;
            if (page) {
              w.prasiPage = page;
            }

            w.prasiRouter = createRouter();
            const pageIDS: string[] = [];
            for (const p of pages) {
              if (page && page.id === p.id) {
                for (const [k, v] of Object.entries(page)) {
                  (p as any)[k] = v;
                }
              } else {
                pageIDS.push(p.id);
              }
              w.prasiRouter.insert(p.url, p);
            }
            local.render();

            db.page
              .findMany({
                where: { id: { in: pageIDS }, is_deleted: false },
                select: SELECT_FIELD,
              })
              .then((items) => {
                if (items && w.prasiRouter) {
                  for (const item of items) {
                    for (const p of pages) {
                      if (p.id === item.id) {
                        for (const [k, v] of Object.entries(item)) {
                          (p as any)[k] = v;
                        }
                      }
                    }
                  }
                }
              });
          }
        });
    }

    if (w.prasiRouter && !page_id) {
      const found = w.prasiRouter.lookup(urlpath);
      if (found) {
        if (found.content_tree) {
          w.prasiPage = found as any;
        } else {
          db.page
            .findFirst({
              where: { id: found.id, is_deleted: false },
              select: SELECT_FIELD,
            })
            .then((item) => {
              if (item) {
                for (const [k, v] of Object.entries(item)) {
                  (found as any)[k] = v;
                }
                w.prasiPage = found as any;
                local.render();
              }
            });
        }
      } else {
        return null;
      }
    }

    // if (w.isPreview) {
    //   usePreview();
    // }

    // if (w.prasiPage && w.prasiSite)
    //   return <EPage site={w.prasiSite} page={w.prasiPage} usage="render" />;

    return <Loading />;
  },
});
