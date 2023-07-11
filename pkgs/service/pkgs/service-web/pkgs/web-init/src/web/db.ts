import { waitUntil } from "web-utils";
import { createFrameCors } from "./iframe-cors";

export const dbClient = (name: string, dburl?: string) => {
  return new Proxy(
    {},
    {
      get(_, table: string) {
        if (table === "_tables") {
          return () => {
            return fetchSendDb(
              name,
              {
                name,
                action: "definition",
                table: "*",
              },
              dburl
            );
          };
        }

        if (table === "_definition") {
          return (table: string) => {
            return fetchSendDb(
              name,
              {
                name,
                action: "definition",
                table,
              },
              dburl
            );
          };
        }

        if (table.startsWith("$")) {
          return (...params: any[]) => {
            return fetchSendDb(
              name,
              {
                name,
                action: "query",
                table,
                params,
              },
              dburl
            );
          };
        }

        return new Proxy(
          {},
          {
            get(_, action: string) {
              return (...params: any[]) => {
                if (table === "query") {
                  table = action;
                  action = "query";
                }
                return fetchSendDb(
                  name,
                  {
                    name,
                    action,
                    table,
                    params,
                  },
                  dburl
                );
              };
            },
          }
        );
      },
    }
  );
};

export const fetchSendDb = async (
  name: string,
  params: any,
  dburl?: string
) => {
  const w = typeof window === "object" ? window : (globalThis as any);
  let url = `/_dbs/${name}`;
  let frm: Awaited<ReturnType<typeof createFrameCors>>;

  if (params.table) {
    url += `/${params.table}`;
  }

  const _base = dburl || w.serverurl;

  if (isSSR) {
    let data = params;
    const headers: any = { "content-type": "application/json" };

    const init = { body: data, headers, method: "POST" };
    if (init && init.body && init.body instanceof File) {
      const body = new FormData();
      body.append("file", init.body);
      init.body = body;
    } else {
      init.body = JSON.stringify(data);
    }
    const res = await fetch(_base + url, init);
    const body = await res.text();
    try {
      return JSON.parse(body);
    } catch (e) {
      return body;
    }
  }

  if (!w.frmapi) {
    w.frmapi = {};
  }
  if (!w.frmapi[_base]) {
    w.frmapi[_base] = await createFrameCors(_base);
  }

  frm = w.frmapi[_base];

  if (!frm) {
    await waitUntil(() => {
      frm = w.frmapi[_base];
      return frm;
    });
  }

  return await frm.send(url, params, w.apiHeaders);
};
