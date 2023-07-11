import { globalize } from "dir";
import { Server } from "hyper-express";
import { connectRPC } from "rpc";
import { RPCActionResult } from "rpc/src/types";
import { SERVICE_NAME } from "../../../src/types";
import { dbs } from "../../service-db";
import { dbAction } from "../../service-db/src/action";

export const srv = globalize({
  name: "srv",
  value: {
    name: "" as SERVICE_NAME,
    server: null as unknown as Server ,
    port: 0,
    serverURL: "",
    cookieKey: "",
    rpc: {
      db: null as unknown as RPCActionResult<typeof dbAction> ,
    },
  },
  async init() {
    srv.rpc.db = await connectRPC("db");
    (global as any).db = dbs(srv.rpc.db);
  },
});
