import { globalize } from "dir";
import { Server, Websocket } from "hyper-express";
import { ServiceModule } from "../../../export";
import { serve } from "../module";
import { Asset } from "./asset";

export type WebModule = {
  serve: typeof serve;
};

export const web = globalize({
  name: "web",
  value: {
    name: "",
    mode: "prod" as "dev" | "prod" | "staging",
    entry: "",
    index: {
      css: "",
      js: "",
    },
    asset: null as unknown as Asset,
    ws: new Set<Websocket>(),
    server: null as unknown as Server,
    module: null as unknown as ServiceModule<WebModule>,
  },
});
