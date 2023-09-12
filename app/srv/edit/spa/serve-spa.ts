import crypto from "crypto";
import { dir } from "dir";
import { list, readAsync } from "fs-jetpack";
import mime from "mime-types";
import { APIContext } from "service-srv";
import { matchRoute } from "./match-route";
import { createRouter } from "service/pkgs/service-web/pkgs/web-init";
import { loadPage } from "../tools/load-page";
import { scanComponent } from "../../api/comp-scan";

const dirs = {
  spa: list(`srv/spa`) || [],
  "spa-raw": list(`srv/spa-raw`) || [],
  web: list(`web/public`) || [],
};
const etag = {} as Record<string, string>;
const cache = {} as Record<string, any>;
const site = {} as Record<string, { raw: string; etag: string; ts: number }>;

export const serveSPA = async ({
  mode,
  ctx,
}: {
  mode: "spa" | "spa-raw";
  ctx: APIContext;
}) => {
  const { res, req, mode: runMode } = ctx;
  let { site_id, pathname: routePath } = matchRoute(req.params._);

  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "content-type rid");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    res.send("");
    return;
  }

  let pathname = undefined as undefined | string;
  if (req.query_parameters["pathname"]) {
    pathname = req.query_parameters["pathname"];
  } else {
    pathname = routePath;
  }

  const sendFile = async (path: string) => {
    if (runMode === "dev") {
      res.sendFile(dir.path(path));
      return;
    }
    if (!cache[path]) {
      const src = await readAsync(dir.path(path));
      if (src) {
        cache[path] = src;
      }
    }

    if (!etag[path] && cache[path]) {
      etag[path] = crypto.createHash("md5").update(cache[path]).digest("hex");
    }

    if (etag[path]) {
      res.setHeader("ETag", etag[path]);
    }
    const type = mime.contentType(path.split(".").pop() || "");
    if (type) {
      res.setHeader("content-type", type);
    }
    res.send(cache[path]);
  };

  if (!site[site_id] || runMode === "dev") {
    const index = `srv/${mode}/${mode}.js`;
    if (!cache[index] || runMode === "dev") {
      cache[index] = await readAsync(index);
    }

    if (
      !site[site_id] ||
      (site[site_id] && Date.now() - site[site_id].ts >= 2 * 1000) ||
      typeof req.query_parameters["reset"] === "string"
    ) {
      const baseUrl =
        runMode === "dev"
          ? "http://localhost:12300/"
          : "https://api.prasi.app/";

      const pages = await db.page.findMany({
        where: {
          id_site: site_id,
          is_deleted: false,
        },
        select: {
          id: true,
          url: true,
        },
      });

      let page: any = null;
      let comps: any = {};

      if (typeof pathname === "string") {
        const router = createRouter<{ id: string; url: string }>({
          strictTrailingSlash: false,
        });
        for (const page of pages) {
          router.insert(page.url, page);
        }

        const found = router.lookup(`/${pathname}`);
        if (found) {
          page = await loadPage(found.id);
        }
      } else if (typeof req.query_parameters["page_id"] === "string") {
        if (req.query_parameters["page_id"]) {
          page = await loadPage(req.query_parameters["page_id"]);
        }
      }

      if (page) {
        const ppage = pages.find((e) => e.id === page.id);
        if (ppage) {
          for (const [k, v] of Object.entries(page)) {
            (ppage as any)[k] = v;
          }
        }
        await scanComponent(page.content_tree, comps);
      }

      const raw =
        cache[index] +
        `\n
window.__SRV_URL__ = "${baseUrl}";
window.siteApiUrl = __SRV_URL__;
window.prasi_pages = ${JSON.stringify(pages)};
window.prasi_page = ${JSON.stringify(page)};
window.prasi_comps = ${JSON.stringify(comps)};
window.site=${JSON.stringify(
          await db.site.findFirst({
            where: { id: site_id },
            select: { id: true, name: true, js_compiled: true, config: true },
          })
        )};\n`;

      site[site_id] = {
        ts: Date.now(),
        raw,
        etag: crypto.createHash("md5").update(raw).digest("hex"),
      };
    }
  }

  if (pathname) {
    if (dirs[mode].includes(pathname)) {
      sendFile(`srv/${mode}/${pathname}`);
    } else if (dirs.web.includes(pathname) && pathname !== "index.js") {
      sendFile(`web/public/${pathname}`);
    } else {
      res.setHeader("content-type", "text/javascript");
      res.setHeader("ETag", site[site_id].etag);
      res.send(site[site_id].raw);
    }
  } else {
    res.setHeader("content-type", "text/javascript");
    res.setHeader("ETag", site[site_id].etag);
    res.send(site[site_id].raw);
  }
};
