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
    max_body_length: Number.MAX_SAFE_INTEGER,
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
      res.send(asset.content);
    }
    return true;
  };

  for (const f of await readdir(publicPath)) {
    if (f.startsWith("index")) {
      if (f.endsWith(".css")) web.index.css = f;
      if (f.endsWith(".js")) web.index.js = f;
    }
  }

  await web.module.initSSR();


  server.any("/*", (req, res) => {
    serveStatic(req, res, async () => {
      if (mode === "dev") {
        try {
          web.module = web.module.load();
          await web.module.initSSR();
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

  server.listen(port);

  return server;
};

const dec = new TextDecoder();
