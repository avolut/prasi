import { apiContext } from "service-srv";
export const _ = {
  url: "/check",
  async api() {
    const { req, res } = apiContext(this);

    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    res.setHeader("Access-Control-Allow-Headers", "content-type rid");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return "OK";
  },
};
