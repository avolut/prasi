import { dir } from "dir";
import { apiContext } from "service-srv";
import mime from "mime-types";
import { readAsync } from "fs-jetpack";

export const _ = {
  url: "/npm/:mode/:id/*",
  async api(mode: "site" | "page", id: string) {
    const { req, res, mode: _mode } = apiContext(this);
    const path = dir.path(`../npm/${mode}/${id}/${req.params._}`);

    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    res.setHeader("Access-Control-Allow-Headers", "content-type rid");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");

    const contentType = mime.lookup(path);
    if (contentType) res.setHeader("content-type", contentType);
    if (path.length > dir.path(`../npm/${mode}/${id}`).length) {
      const file = await readAsync(path, "buffer");
      if (file) {
        res.setHeader("content-length", file.byteLength.toString());
        res.send(file);
        return;
      }
    }

    res.send("");
  },
};
