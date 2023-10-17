import { service } from "service";
import { apiContext } from "service-srv";
import { DBArg } from "service/pkgs/service-db/src/glbdb";

const replacer = (key: string, value: string) => {
  if (typeof value === "string" && value.startsWith("BigInt::")) {
    return BigInt(value.substring(8));
  }
  return value;
};

export const _ = {
  url: "/_dbs/:dbName/:action",
  async api(dbName: any, action?: string) {
    const { req, res } = apiContext(this);

    const body = JSON.parse(await req.text(), replacer) as DBArg;

    try {
      const result = await service.db.query(body);

      console.log(result);
      res.json(result);
    } catch (e: any) {
      res.sendStatus(500);
      res.json(e);
    }
  },
};
