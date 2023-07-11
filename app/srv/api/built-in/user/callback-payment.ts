import { apiContext, session } from "service-srv";
export const _ = {
  url: "/callback-payment",
  async api() {
    const { req, res } = apiContext(this);
    return "hello world";
  },
};
            