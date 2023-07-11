export const createAPI = (url: string) => {
  return (window as any).apiClient((window as any).apiEntry, url);
};
export const createDB = (url: string) => {
  return (window as any).dbClient("db", url);
};
