import { dir } from "dir";
import { readdir } from "fs/promises";
import { Request, Response } from "hyper-express";
import { join } from "path";
import { renderToPipeableStream } from "react-dom/server";
import { g } from "web-init/src/types";
import { web } from "./glb-web";
import { liveReloadSrc } from "./live-reload";

const ts = Date.now();
export const renderSSR =
  (req: Request, res: Response, code: number, ssrMode: "stream" | "render") =>
  (props: any) => {
    return new Promise<string>(async (resolve) => {
      const { App } = g.__SSR__;

      res.sendStatus(code);
      if (!web.index.js) {
        try {
          const publicPath = join(dir.path(`${web.name}/public`));
          for (const f of await readdir(publicPath)) {
            if (f.startsWith("index")) {
              if (f.endsWith(".css")) web.index.css = f;
              if (f.endsWith(".js")) web.index.js = f;
            }
          }
        } catch (e) {}
      }

      if (App) {
        const { pipe } = renderToPipeableStream(
          <App
            name={web.name}
            initScript={g.__SSR__.initScript(
              `w.__SSR_PROP__=${JSON.stringify(props)};w.__MODE__="${
                web.mode
              }";w.__STATUS_CODE__=${code};${
                web.mode === "dev" ? liveReloadSrc : ""
              };`
            )}
            indexCSS={web.index.css + `?${ts}`}
            props={props || {}}
            res={{ pathname: req.path, params: {}, statusCode: code }}
          />,
          {
            bootstrapScripts: [`/${web.index.js}?${ts}`],
            onShellReady() {
              if (ssrMode === "stream") {
                try {
                  res.setHeader("content-type", "text/html");
                  if (!res.closed) pipe(new ProxyWritable(res) as any);
                } catch (e) {}
              }
            },
            async onAllReady() {
              let result = "";
              if (ssrMode === "render") {
                result = await new Promise<string>((resolve) => {
                  pipe(new ProxyWritable(resolve) as any);
                });
              }
              resolve(result);
            },
          }
        );
      }
    });
  };

const dec = new TextDecoder();

class ProxyWritable extends WritableStream {
  res: ((result: string | PromiseLike<string>) => void) | Response;
  output: string;

  constructor(
    res: ((result: string | PromiseLike<string>) => void) | Response
  ) {
    super();
    this.res = res;
    this.output = "";
  }

  flush() {}

  write(buf: Uint8Array) {
    if (typeof this.res !== "function") this.res.write(buf);
    else {
      this.output += dec.decode(buf);
    }
  }

  on(event: "drain" | "error" | "close", callback: any) {
    if (typeof this.res !== "function") this.res.on(event, callback);
  }

  end() {
    if (typeof this.res !== "function") this.res.end();
    else {
      this.res(this.output);
    }
  }
}
