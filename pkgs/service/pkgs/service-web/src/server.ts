import { dir } from "dir";
import { dirAsync } from "fs-jetpack";
import { readdir } from "fs/promises";
import HyperExpress, { MiddlewareHandler } from "hyper-express";
import { join } from "path";
import { initAsset } from "./asset";
import { web } from "./glb-web";

export const server = async ({
  mode,
  port,
  name,
}: {
  mode: "dev" | "prod" | "staging";
  name: string;
  port: number;
}) => {
  const server = new HyperExpress.Server({
    max_body_length: 1000000000000,
  });

  const publicPath = join(dir.path(`${name}/public`));
  await dirAsync(publicPath);
  web.asset = initAsset(publicPath);

  const serveStatic: MiddlewareHandler = (req, res, next) => {
    let url = decodeURI(req.path);
    const asset = web.asset.get(decodeURI(url));

    if (!asset) next();
    else {
      res.setHeader("etag", asset.etag);
      if (asset.mime) res.setHeader("content-type", asset.mime);

      if (mode === "dev") {
        res.send(asset.content);
      } else {
        if (asset.etag === req.headers["if-none-match"]) {
          res.sendStatus(304);
          res.send("");
          return true;
        }

        res.send(asset.content);
      }
    }
    return true;
  };

  for (const f of await readdir(publicPath)) {
    if (f.startsWith("index")) {
      if (f.endsWith(".css") && !web.index.css) web.index.css = f;
      if (f.endsWith(".js") && !web.index.js) web.index.js = f;
    }
  }

  server.any("/*", (req, res) => {
    serveStatic(req, res, async () => {
      if (mode === "dev") {
        try {
          web.module = web.module.load();
        } catch (e) {
          console.error(e);
        }
      }
      await web.module.serve(req, res, mode);
    });
  });

  /** live reload ws -- only in dev */
  if (mode === "dev") {
    server.ws("/*", (ws) => {
      web.ws.add(ws);

      ws.on("close", () => {
        web.ws.delete(ws);
      });
    });
  }

  server.listen(port, "0.0.0.0");

  return server;
};

const dec = new TextDecoder();
