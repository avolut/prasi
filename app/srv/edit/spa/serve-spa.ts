import crypto from "crypto";
import { dir } from "dir";
import { list, readAsync } from "fs-jetpack";
import mime from "mime-types";
import { APIContext } from "service-srv";
import { matchRoute } from "./match-route";

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
  const { pathname, site_id } = matchRoute(req.params._);

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
      (site[site_id] && Date.now() - site[site_id].ts > 1000)
    ) {
      const raw =
        `window.site=${JSON.stringify(
          await db.site.findFirst({
            where: { id: site_id },
            select: { id: true, name: true, js_compiled: true },
          })
        )};\n` + cache[index];

      site[site_id] = {
        ts: Date.now(),
        raw,
        etag: crypto.createHash("md5").update(raw).digest("hex"),
      };
    }
  }

  if (dirs[mode].includes(pathname)) {
    sendFile(`srv/${mode}/${pathname}`);
  } else if (dirs.web.includes(pathname) && pathname !== "index.js") {
    sendFile(`web/public/${pathname}`);
  } else {
    res.setHeader("content-type", "text/javascript");
    res.setHeader("ETag", site[site_id].etag);
    res.send(site[site_id].raw);
  }
};
