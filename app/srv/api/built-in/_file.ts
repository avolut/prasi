import { existsAsync, readAsync } from "fs-jetpack";
import mime from "mime-types";
import { join, resolve } from "path";
import { apiContext } from "service-srv";

export const _ = {
  url: "/_file/**",
  async api() {
    const { req, res } = apiContext(this);
    const rpath = decodeURIComponent(req.params._);
    const upath = resolve(join(process.cwd(), "..", "content", "upload"));
    const path = resolve(join(upath, rpath));

    if (path.startsWith(upath)) {
      if (await existsAsync(path)) {
        const contentType = mime.lookup(path);
        if (contentType) res.setHeader("content-type", contentType);
        const file = await readAsync(path, "buffer");
        if (file) {
          res.setHeader("content-length", file.byteLength.toString());
          res.send(file);
        }
        return;
      }
    }

    res.sendStatus(404);
    res.json({ response: "not found" });
  },
};
