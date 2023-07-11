import { globalize } from "dir";
import { connectRPC, createRPC } from "rpc";
import { RPCActionResult, RPCServerAction } from "rpc/src/types";
import { rootAction } from "./action";

export const svc = globalize({
  name: "svc",
  value: {
    root: null as unknown as RPCActionResult<typeof rootAction>,
    definitions: {} as Record<
      string,
      Record<string, "object" | "function" | "proxy">
    >, // action definition
  },
  init: async (g) => {
    g.root = await connectRPC("root")
  },
});
