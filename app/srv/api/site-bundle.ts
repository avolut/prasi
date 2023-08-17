import { apiContext } from "service-srv";
export const _ = {
  url: "/site-bundle",
  async api() {
    const { req, res } = apiContext(this);
    return "hello";
  },
};