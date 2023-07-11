import { ChildProcess } from "child_process";
import { RPCActionResult } from "rpc/src/types";
import { rootAction as ServiceAction } from "../../service/src/action";
import { SERVICE_TYPE } from "../../service/src/types";
import { buildServiceMain } from "./builder/service-main";
import { prepareApp } from "./scaffold/app";

export const baseGlobal = global as unknown as {
  rpc: { service: RPCActionResult<typeof ServiceAction> };
  app: Awaited<ReturnType<typeof prepareApp>>;
  parcels: Set<ChildProcess>;
  mode: "dev" | "prod" | "staging";
};

export const action = {
  rebuildService: async (name: SERVICE_TYPE) => {
    return await buildServiceMain(name, {
      watch: true,
    });
  },
};
