import { createStore, get, set } from "idb-keyval";
import trim from "lodash.trim";
import { apiClient, dbClient } from "web-init";
import { createFrameCors } from "web-init/src/web/iframe-cors";
export const w = window as unknown as {
  prasiApi: Record<string, any>;
  apiHeaders: any;
  apiClient: typeof apiClient;
  dbClient: typeof dbClient;
  serverurl: string;
  apiurl: string;
};

export const createAPI = (url: string) => {
  if (!w.apiClient) {
    w.apiClient = apiClient;
  }

  return w.apiClient(w.prasiApi[url]?.apiEntry, url);
};

export const createDB = (url: string) => {
  if (!w.dbClient) {
    w.dbClient = dbClient;
  }

  const dbc: typeof dbClient = w.dbClient;
  return dbc("db", url);
};

export const initApi = async (config: any, mode: "dev" | "prod" = "dev") => {
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
      try {
        await reloadDBAPI(url, mode);
      } catch (e) {}
    }
  }
  return url;
};

const loadText = async (url: string, v2?: boolean) => {
  const res = await fetch(url);
  return await res.text();
};

export const reloadDBAPI = async (
  url: string,
  mode: "dev" | "prod" = "dev"
) => {
  const base = trim(url, "/");

  if (!w.prasiApi) {
    w.prasiApi = {};
  }

  const cache = createStore(`prasi-api`, "config");

  const forceReload = async () => {
    if (!w.prasiApi[url]) {
      w.prasiApi[url] = {};
    }
    const frm = await createFrameCors(base);
    const raw = await frm.sendRaw(`/_prasi/_`);
    let ver = "";
    if (raw && (raw as any).prasi) {
      ver = (raw as any).prasi;
    }

    if (ver === "v2") {
      await new Promise<void>((done) => {
        const d = document;
        const script = d.body.appendChild(d.createElement("script"));
        script.onload = () => {
          done();
        };
        script.src = `${base}/_prasi/load.js?url=${url}${
          mode === "dev" ? "&dev=1" : ""
        }`;
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

    await set(url, JSON.stringify(w.prasiApi[url]), cache);
  };

  const found = await get(url, cache);
  if (found) {
    w.prasiApi[url] = JSON.parse(found);
    forceReload();
  } else {
    await forceReload();
  }
};
