import trim from "lodash.trim";

const w = window as unknown as {
  prasiApi: Record<string, any>;
  apiHeaders: any;
};

export const createAPI = (url: string) => {
  return (window as any).apiClient(w.prasiApi[url]?.apiEntry, url);
};

export const createDB = (url: string) => {
  return (window as any).dbClient("db", url);
};

export const initApi = async (config: any) => {
  let url = "";
  if (config.prasi) {
    if (
      location.hostname !== "prasi.app" &&
      location.hostname !== "localhost"
    ) {
      url = `http://${location.hostname}:${config.prasi.port}`;
    } else {
      url = `https://${config.prasi.port}.prasi.world`;
    }
  } else if (config.api_url) {
    url = config.api_url;
  }
  if (!w.prasiApi) w.prasiApi = {};
  if (url) {
    if (!w.prasiApi[url]) {
      await reloadDBAPI(url);
    }
  }
  return url;
};

const loadText = async (url: string) => {
  const res = await fetch(url);
  return await res.text();
};

export const reloadDBAPI = async (url: string) => {
  try {
    const base = trim(url, "/");
    const apiTypes = await fetch(base + "/_prasi/api-types");
    const apiEntry = await fetch(base + "/_prasi/api-entry");
    w.prasiApi[url] = {
      apiEntry: (await apiEntry.json()).srv,
      prismaTypes: {
        "prisma.d.ts": (
          await loadText(`${base}/_prasi/prisma/index.d.ts`)
        ).replace(`'./runtime/library';`, `'ts:runtime/library';`),
        "runtime/library.d.ts": await loadText(
          `${base}/_prasi/prisma/runtime/library.d.ts`
        ),
      },
      apiTypes: await apiTypes.text(),
    };
  } catch (e) {}
};
