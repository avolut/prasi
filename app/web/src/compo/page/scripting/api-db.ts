import { w } from "../../types/general";

export const createAPI = (url: string) => {
  if (w.prasiApi[url]?.apiEntry) {
    return (window as any).apiClient(w.prasiApi[url]?.apiEntry, url);
  }
};
export const createDB = (url: string) => {
  return (window as any).dbClient("db", url);
};
