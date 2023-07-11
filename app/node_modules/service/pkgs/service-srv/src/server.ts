import { DeepProxy } from "@qiwi/deep-proxy";
import { Server, WSRouteHandler } from "hyper-express";
import { createRouter } from "radix3";
import { apiFrm } from "./api/api-frm";
import { session } from "./api/session";
export const server = async ({
  port,
  name,
  cookieKey,
  ws,
  mode,
}: {
  mode: "dev" | "prod" | "staging";
  name: string;
  port: number;
  cookieKey: string;
  ws?: Record<string, WSRouteHandler>;
}) => {
  const server = new Server({
    max_body_length: Number.MAX_SAFE_INTEGER,
    auto_close: true,
    trust_proxy: true,
    fast_buffers: true,
  });

  let apiEntry: any = null;

  try {
    //@ts-ignore
    apiEntry = await import("../../../../../app/gen/srv/api/entry");
  } catch (e) {
    return "API entry not found";
  }

  if (ws) {
    for (const [k, v] of Object.entries(ws)) {
      server.ws(k, v);
    }
  }

  server.any("/", (_, res) => {
    res.send("OK");
  });
  server.any("/_api_frm", apiFrm);

  await session.init({ cookieKey });
  const api = (apiEntry as any)[name];

  if (api) {
    const router = createRouter({});
    const pushed = new Set<string>();

    await Promise.all(
      Object.values(api).map(async (v) => {
        const item = v as {
          name: string;
          path: string;
          args: string[];
          url: string;
          handler: Promise<{ _: { url: string; api: (...arg: any[]) => any } }>;
        };

        const itemHandlerRaw = await item.handler;
        if (!itemHandlerRaw) return;
        const itemHandler = itemHandlerRaw._;
        if (!itemHandler) return;

        const handler = itemHandler.api;
        item.url = itemHandler.url;

        if (!item || (!!item && !item.url)) return;

        const urlParts = item.url.split("/");
        const cleanedUrl = urlParts
          .map((e, idx) => {
            return idx === urlParts.length - 1 &&
              (e.startsWith(":") || e === "*")
              ? ""
              : e;
          })
          .join("/");
        const urls = [item.url, cleanedUrl];

        for (const url of urls) {
          if (pushed.has(url) || !url) {
            continue;
          }
          pushed.add(url);

          router.insert(url, item);
          server.any(url, async (req, res) => {
            let found = router.lookup(req.path);

            const nreq = new DeepProxy(req, ({ target, path, key, value }) => {
              if (typeof value === "function") {
                return async (...args: any[]) => {
                  const result = (req as any)[key](...args);

                  if (result instanceof Promise) {
                    const awaited = await result;
                    return awaited;
                  }
                  return result;
                };
              }

              if (key === "params") {
                if (found) {
                  const params = found.params || {};
                  if (params._0 && !params._) {
                    params._ = params._0;
                  }
                  return found.params || {};
                } else {
                  return {};
                }
              }

              return value;
            });

            const im = handler.bind({ req: nreq, res, mode });

            const params: any = {};

            // parse from query string (?name=...)
            if (req.query) {
              for (const [k, v] of Object.entries(req.query)) {
                if (v) params[k] = v;
              }
            }

            // parse from parameterized url (/:name/)
            if (nreq.params) {
              for (const [k, v] of Object.entries(nreq.params)) {
                if (v) params[k] = v;
              }
            }

            // parse from POST-ed body ({name: "..."})
            if ((req.header("content-type") || "").includes("json")) {
              for (const [k, v] of Object.entries(await req.json())) {
                if (v) params[k] = v;
              }
            }
            let result: any = null;
            if (typeof params === "object") {
              const passedParams: any[] = [];

              for (const [k, paramName] of Object.entries(item.args)) {
                if (params[k]) {
                  passedParams[parseInt(k)] = params[k];
                }

                if (params[paramName]) {
                  passedParams[parseInt(k)] = params[paramName];
                }
              }

              result = await im(...passedParams);
            }

            if (!res.headersSent && !res.aborted) {
              if (typeof result === "object") {
                res.header("content-type", "application/json");
                res.send(JSON.stringify(result));
              } else {
                res.send(result);
              }
            }
          });
        }
      })
    );
  }

  server.listen(port);
  return server;
};
