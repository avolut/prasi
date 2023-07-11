import { waitUntil } from "web-utils";
import { createFrameCors } from "./iframe-cors";
import hash_sum from "hash-sum";

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

const cachedQueryResult: Record<string, { timestamp: number; result: any }> =
  {};

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

  const hsum = hash_sum(params);
  const cached = cachedQueryResult[hsum];
  if (!cached || (cached && Date.now() - cached.timestamp > 1000)) {
    cachedQueryResult[hsum] = {
      timestamp: Date.now(),
      result: null,
    };
    const result = await frm.send(url, params, w.apiHeaders);
    cachedQueryResult[hsum].result = result;
    return result;
  }

  return cached.result;
};
