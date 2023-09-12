import { apiClient } from "./api";
import { dbClient } from "./db";

export const defineApi = async () => {
  let w = typeof window === "object" ? window : (globalThis as any);

  w.db = dbClient("db");
  w.dbClient = dbClient;

  const apiEntry = import("../../../../../../../../app/gen/srv/api/entry-args");
  await new Promise<void>((resolve) => {
    apiEntry.then((e) => {
      w.apiEntry = e["srv"];
      w.api = apiClient(w.apiEntry);
      w.apiClient = apiClient;
      resolve();
    });
  });
};
