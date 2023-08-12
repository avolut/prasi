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

export const initApi = async (config: any) => {
  let url = "";
  if (config.prasi) {
    url = `https://${config.prasi.port}.prasi.world`;
  } else if (config.api_url) {
    url = config.api_url;
  }
  if (!w.prasiApi) w.prasiApi = {};
  if (!w.prasiApi[url]) {
    try {
      const apiEntry = await fetch(trim(url, "/") + "/_prasi/api-entry");
      const json = await apiEntry.json();
      w.prasiApi[url] = {
        apiEntry: json.srv,
      };
    } catch (e) {}
  }
  return url;
};
