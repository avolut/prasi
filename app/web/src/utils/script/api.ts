import trim from "lodash.trim";

const w = window as unknown as {
  prasiApi: Record<string, any>;
};

export const createAPI = (url: string) => {
  return (window as any).apiClient(w.prasiApi[url]?.apiEntry, url);
};

export const createDB = (url: string) => {
  return (window as any).dbClient("db", url);
};

export const initApi = async (url: string) => {
  if (!w.prasiApi) w.prasiApi = {};
  if (!w.prasiApi[url]) {
    const apiEntry = await fetch(trim(url, "/") + "/_prasi/api-entry");
    w.prasiApi[url] = {
      apiEntry: (await apiEntry.json()).srv,
    };
  }
};
