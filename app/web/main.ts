import { createWeb } from "service/pkgs/service-web";

export const main = createWeb({
  name: "web",
  port: 4550,
  entry: "./src/index.tsx",
  ssrMode: "render",
});
