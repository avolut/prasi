export type Req = ReturnType<typeof prepReq>;
import { open } from "lmdb";
type Cache = {
  content: string;
  prasi: { site_id: string; page_id: string };
  timestamp: number;
};
export const db = open<
  Cache,
  [domain: string, method: string, pathname: string]
>({
  path: "lmdb/cache.lmdb",
  compression: true,
});

export const prepReq = (req: Request) => {
  const url = new URL(req.url);

  return {
    url,
    set cache(value: Omit<Cache, "timestamp"> | undefined) {
      if (!value) {
        db.removeSync([url.hostname, req.method, url.pathname]);
      } else {
        db.put([url.hostname, req.method, url.pathname], {
          ...value,
          content: value.content || "",
          timestamp: Date.now(),
        });
      }
    },
    get cache() {
      return db.get([url.hostname, req.method, url.pathname]);
    },
    raw: req,
  };
};
