import { apiClient } from "./api";

export const defineApi = async () => {
  let w = typeof window === "object" ? window : (globalThis as any);

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
