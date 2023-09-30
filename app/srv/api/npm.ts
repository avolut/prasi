import { dir } from "dir";
import { apiContext } from "service-srv";
import mime from "mime-types";
import { readAsync } from "fs-jetpack";
import crypto from "crypto";
import { glb } from "../global";

export const _ = {
  url: "/npm/:mode/:id/*",
  async api(mode: "site" | "page", id: string) {
    const { req, res, mode: _mode } = apiContext(this);
    let path = dir.path(`../npm/${mode}/${id}/${req.params._}`);

    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    res.setHeader("Access-Control-Allow-Headers", "content-type rid");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");

    const contentType = mime.lookup(path);
    if (contentType) res.setHeader("content-type", contentType);

    if (path.endsWith(`${mode}.js`)) {
      path = path.substring(0, path.length - `${mode}.js`.length) + `index.js`;

      if (glb.npm[mode][id]) {
        const npm = glb.npm[mode][id];
        if (npm) {
          res.setHeader("etag", npm.etag);
          res.setHeader("content-length", npm.file.byteLength.toString());
          res.send(npm.file);

          readAsync(path, "buffer").then((file) => {
            if (file && path.endsWith("index.js")) {
              glb.npm[mode][id] = {
                file,
                etag: crypto.createHash("md5").update(file).digest("hex"),
              };
              const npm = glb.npm[mode][id];
            }
          });
          return;
        }
      }
    }

    if (path.length > dir.path(`../npm/${mode}/${id}`).length) {
      const file = await readAsync(path, "buffer");

      if (file) {
        if (path.endsWith("index.js")) {
          glb.npm[mode][id] = {
            file,
            etag: crypto.createHash("md5").update(file).digest("hex"),
          };
          const npm = glb.npm[mode][id];
          if (npm) res.setHeader("etag", npm.etag);
        }
        res.setHeader("content-length", file.byteLength.toString());
        res.send(file);
        return;
      } else {
        glb.npm[mode][id] = null;
      }
    }

    res.send("");
  },
};
