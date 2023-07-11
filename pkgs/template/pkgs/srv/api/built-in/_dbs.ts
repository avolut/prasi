import { service } from "service";
import { apiContext } from "service-srv";
import { DBArg } from "service/pkgs/service-db/src/glbdb";


export const _ = {
  url: "/_dbs/:dbName/:action",
  async api(dbName: any, action?: string) {
    const { req, res } = apiContext(this);

    const body = (await req.json()) as DBArg;
    try {
      const result = await service.db.query(body);
      res.json(result);
    } catch (e: any) {
      res.sendStatus(500);
      console.error(e);
      res.json(e);
      console.error(e);
    }
  },
};
