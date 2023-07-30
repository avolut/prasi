import { dir } from "dir";
import { apiContext } from "service-srv";
import mime from "mime-types";
import { readAsync } from "fs-jetpack";

export const _ = {
  url: "/npm/:mode/:id/*",
  async api(mode: "site" | "page", id: string, fname: string) {
    const { req, res } = apiContext(this);
    const path = dir.path(`../npm/${mode}/${id}/${req.params._}`);

    const contentType = mime.lookup(path);
    if (contentType) res.setHeader("content-type", contentType);
    if (req.params._ === "index.js" || "index.js.map") {
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
