import { dir } from "dir";
import { apiContext } from "service-srv";
import { serveSPA } from "../edit/spa/serve-spa";
export const _ = {
  url: "/spa/**",
  async api() {
    serveSPA({ mode: "spa", ctx: apiContext(this) });
  },
};
