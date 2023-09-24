import trim from "lodash.trim";
import type { dbClient } from "web-init";
const w = window as unknown as {
  prasiApi: Record<string, any>;
  apiHeaders: any;
};

export const createAPI = (url: string) => {
  return (window as any).apiClient(w.prasiApi[url]?.apiEntry, url);
};

export const createDB = (url: string) => {
  const dbc: typeof dbClient = (window as any).dbClient;
  return dbc("db", url);
};

export const initApi = async (config: any) => {
  let url = "";
  if (config.prasi) {
    if (
      !(
        location.hostname === "prasi.app" ||
        location.hostname === "api.prasi.app"
      ) // android localhost
    ) {
      if (
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1" ||
        location.hostname === "10.0.2.2"
      ) {
        url = `https://${config.prasi.port}.prasi.world`;
      } else {
        url = `https://${location.hostname}:${config.prasi.port}`;
      }
    } else {
      url = `https://${config.prasi.port}.prasi.world`;
    }
  } else if (config.api_url) {
    url = config.api_url;
  }
  if (!w.prasiApi) {
    w.prasiApi = {};
  }
  if (url) {
    if (!w.prasiApi[url]) {
      await reloadDBAPI(url);
    }
  }
  return url;
};

const loadText = async (url: string, v2?: boolean) => {
  const res = await fetch(url);
  return await res.text();
};

export const reloadDBAPI = async (url: string, useCache: boolean = true) => {
  try {
    const base = trim(url, "/");

    if (!w.prasiApi) {
      w.prasiApi = {};
    }
    if (useCache === false) {
      delete w.prasiApi[url];
      localStorage.removeItem(`prasi-api-${url}`);
    }
    if (w.prasiApi[url]) return;

    w.prasiApi[url] = {};

    const cached = localStorage.getItem(`prasi-api-${url}`);
    if (cached) {
      w.prasiApi[url] = JSON.parse(cached);
    }
    (async () => {
      try {
        const ver = await fetch(base + "/_prasi/_");
        if ((await ver.json()).prasi === "v2") {
          await new Promise<void>((done) => {
            const d = document;
            const script = d.body.appendChild(d.createElement("script"));
            script.onload = () => {
              done();
            };
            script.src = `${base}/_prasi/load.js?url=${url}`;
          });
        } else {
          const apiTypes = await fetch(base + "/_prasi/api-types");
          const apiEntry = await fetch(base + "/_prasi/api-entry");
          w.prasiApi[url] = {
            apiEntry: (await apiEntry.json()).srv,
            prismaTypes: {
              "prisma.d.ts": await loadText(`${base}/_prasi/prisma/index.d.ts`),
              "runtime/index.d.ts": await loadText(
                `${base}/_prasi/prisma/runtime/index.d.ts`
              ),
              "runtime/library.d.ts": await loadText(
                `${base}/_prasi/prisma/runtime/library.d.ts`
              ),
            },
            apiTypes: await apiTypes.text(),
          };
        }

        localStorage.setItem(
          `prasi-api-${url}`,
          JSON.stringify(w.prasiApi[url])
        );
      } catch (e) {}
    })();
  } catch (e) {}
};
