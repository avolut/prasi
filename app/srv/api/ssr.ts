import { apiContext } from "service-srv";
export const _ = {
  url: "/ssr/:page_id",
  async api(page_id: string) {
    const { req, res } = apiContext(this);
    return "hello world";
  },
};
