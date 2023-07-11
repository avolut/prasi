import { createHash } from "crypto";
import { readFileSync, statSync } from "fs";
import mime from "mime-types";
import { join, normalize } from "path";
import { walkDir } from "pkg";
import { web } from "./glb-web";

export type Asset = ReturnType<typeof initAsset>;
export const initAsset = (basepath: string) => {
  const cache = {} as Record<
    string,
    { stat: ReturnType<typeof statSync>; content: Buffer }
  >;
  return {
    scan: async () => {
      for await (const p of walkDir(basepath)) {
      }
    },
    exists: (path: string) => {
      return false;
    },
    get: (path: string, useCache?: boolean) => {
      const safePath = normalize(path).replace(/^(\.\.(\/|\\|$))+/, "");
      const p = join(basepath, safePath);

      if (!cache[p] || useCache === false || web.mode === "dev") {
        try {
          cache[p] = { stat: statSync(p), content: readFileSync(p) };
        } catch (e) {}
      }
      if (cache[p]) {
        if (cache[p].stat?.isDirectory()) {
          return false;
        } else {
          return {
            etag: createHash("md5")
              .update(cache[p].content.length + p)
              .digest("hex"),
            mime: mime.lookup(p),
            content: cache[p].content,
          };
        }
      }

      return false;
    },
  };
};
