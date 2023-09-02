import { dir } from "dir";
import { apiContext } from "service-srv";
import { serveSPA } from "../edit/spa/serve-spa";
export const _ = {
  url: "/spa-raw/**",
  async api() {
    await serveSPA({ mode: "spa-raw", ctx: apiContext(this) });
  },
};
