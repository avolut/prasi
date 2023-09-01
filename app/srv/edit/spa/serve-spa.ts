import crypto from "crypto";
import { dir } from "dir";
import { list, readAsync } from "fs-jetpack";
import mime from "mime-types";
import { APIContext } from "service-srv";
import { matchRoute } from "./match-route";

const dirs = {
  spa: list(`srv/spa`) || [],
  "spa-raw": list(`srv/spa-raw`) || [],
};
const etag = {} as Record<string, string>;
const cache = {} as Record<string, any>;

export const serveSPA = ({
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
  if (dirs[mode].includes(pathname)) {
    sendFile(`srv/${mode}/${pathname}`);
  } else {
    sendFile(`srv/${mode}/${mode}.js`);
  }
};
