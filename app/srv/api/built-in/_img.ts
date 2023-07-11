import { basename, dirname, join, resolve } from "path";
import {
  createReadStream,
  dirAsync,
  existsAsync,
  read,
  readAsync,
} from "fs-jetpack";
import { apiContext } from "service-srv";
import get from "lodash.get";
import sharp, { FitEnum } from "sharp";
import mime from "mime-types";
export const _ = {
  url: "/_img/**",
  async api() {
    const { req, res } = apiContext(this);
    const rpath = decodeURIComponent(req.params._);
    const upath = resolve(join(process.cwd(), "..", "content", "upload"));
    const path = resolve(join(upath, rpath));

    if (path.startsWith(upath)) {
      if (await existsAsync(path)) {
        if (path.endsWith("svg")) {
          const file = await readAsync(path, "buffer");
          const type = mime.lookup(path);
          if (type) {
            res.setHeader("content-type", type);
          }
          res.send(file);
          res.end();
          return;
        }

        const conf = optimizeImageConf(req.query);

        const imgpath = join(dirname(path), "img", conf.slug, basename(path));

        await dirAsync(dirname(imgpath));
        const contentType = mime.lookup(imgpath);
        if (contentType) res.setHeader("content-type", contentType);

        try {
          if (!(await existsAsync(imgpath))) {
            await optimizeImage(path, imgpath, conf);
          }
          const file = await readAsync(imgpath, "buffer");
          if (file) res.setHeader("content-length", file.byteLength.toString());
          res.send(file);
        } catch (e) {
          console.log(e);
        }
        res.end();
        return;
      }
    }
    res.sendStatus(404);
    res.json({ response: "not found" });
  },
};

const optimizeImageConf = (opt: any) => {
  const res = {
    w: get(opt, "w"),
    h: get(opt, "h"),
    fit: get(opt, "fit"),
  };

  if (typeof res.w === "string") res.w = parseInt(res.w);
  if (typeof res.h === "string") res.h = parseInt(res.h);

  let slug = "opt";
  if (res.w || res.h || res.fit) {
    slug = `${res.w || "_"}x${res.h || "_"}-${res.fit || "contain"}`;
  }

  return {
    ...res,
    slug,
  };
};

export const optimizeImage = async (
  path: string,
  target: string,
  conf: {
    w: number;
    h: number;
    fit: keyof FitEnum;
    slug: string;
  }
) => {
  const r =
    conf.slug === "opt"
      ? sharp(path)
      : sharp(path)
          .flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
          .resize({
            withoutEnlargement: true,
            width: conf.w,
            height: conf.h,
            fit: conf.fit,
          });
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
    await r.toFormat("jpeg", { progressive: true, quality: 70 }).toFile(target);
  } else if (path.endsWith(".png")) {
    await r.toFormat("png", { progressive: true, quality: 70 }).toFile(target);
  } else if (path.endsWith(".gif")) {
    await r.toFormat("gif").toFile(target);
  }
};
