import { validate } from "uuid";
import { page } from "web-init";
import { Prasi } from "../../compo/renderer/prasi/prasi-renderer";
import { PRASI_PAGE } from "../../compo/renderer/base/renderer-types";

export default page({
  url: "/site/:name/**",
  component: () => {
    const site = new Prasi({
      load: {
        async site() {
          const site = await db.site.findFirst({
            where: validate(params.name)
              ? { id: params.name }
              : { domain: params.name },
            select: {
              id: true,
              config: true,
            },
          });
          if (site) {
            return {
              id: site.id,
              api_url: (site.config as any)?.api_url || "",
            };
          }
          return { id: "", api_url: "" };
        },
        async page(rg, page_id) {
          const page = await db.page.findFirst({
            where: { id: page_id },
            select: {
              id: true,
              url: true,
              name: true,
              js_compiled: true,
              content_tree: true,
            },
          });

          if (page) {
            return page as Required<PRASI_PAGE>;
          }
          return null;
        },
        async pages(rg) {
          const all = await db.page.findMany({
            where: {
              id_site: rg.site.id,
              is_deleted: false,
            },
            select: {
              id: true,
              url: true,
              name: true,
            },
          });

          const pages: any = {};
          for (const p of all) {
            pages[p.id] = p;
          }

          return pages;
        },
      },
    });

    return site.renderPage(params._ === "_" ? "/" : `/${params._}`);
    // const local = useLocal({});
    // if (params._ === "_") {
    //   params._ = "";
    // }
    // const urlpath = (params._ || "").startsWith("/")
    //   ? params._
    //   : `/${params._}`;

    // const site_id = params.name;
    // const q = new URLSearchParams(location.search);
    // const page_id = q.get("p");

    // if (!w.isPreview && q.get("preview")) {
    //   if (validate(site_id)) {
    //     w.isPreview = true;
    //   }
    // }

    // if (!w.prasiSite || !w.prasiRouter) {
    //   api
    //     .site_load(
    //       params.name || "",
    //       page_id ? { id: page_id } : { path: urlpath }
    //     )
    //     .then(({ site, page, pages }) => {
    //       if (site) {
    //         w.prasiSite = site;
    //         if (page) {
    //           w.prasiPage = page;
    //         }

    //         w.prasiRouter = createRouter();
    //         const pageIDS: string[] = [];
    //         for (const p of pages) {
    //           if (page && page.id === p.id) {
    //             for (const [k, v] of Object.entries(page)) {
    //               (p as any)[k] = v;
    //             }
    //           } else {
    //             pageIDS.push(p.id);
    //           }
    //           w.prasiRouter.insert(p.url, p);
    //         }
    //         local.render();

    //         db.page
    //           .findMany({
    //             where: { id: { in: pageIDS }, is_deleted: false },
    //             select: SELECT_FIELD,
    //           })
    //           .then((items) => {
    //             if (items && w.prasiRouter) {
    //               for (const item of items) {
    //                 for (const p of pages) {
    //                   if (p.id === item.id) {
    //                     for (const [k, v] of Object.entries(item)) {
    //                       (p as any)[k] = v;
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           });
    //       }
    //     });
    // }

    // if (w.prasiRouter && !page_id) {
    //   const found = w.prasiRouter.lookup(urlpath);
    //   if (found) {
    //     if (found.content_tree) {
    //       w.prasiPage = found as any;
    //     } else {
    //       db.page
    //         .findFirst({
    //           where: { id: found.id, is_deleted: false },
    //           select: SELECT_FIELD,
    //         })
    //         .then((item) => {
    //           if (item) {
    //             for (const [k, v] of Object.entries(item)) {
    //               (found as any)[k] = v;
    //             }
    //             w.prasiPage = found as any;
    //             local.render();
    //           }
    //         });
    //     }
    //   } else {
    //     return null;
    //   }
    // }

    // // if (w.isPreview) {
    // //   usePreview();
    // // }

    // // if (w.prasiPage && w.prasiSite)
    // //   return <EPage site={w.prasiSite} page={w.prasiPage} usage="render" />;

    // return <Loading />;
  },
});
