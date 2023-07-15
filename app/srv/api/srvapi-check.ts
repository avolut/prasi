import { apiContext } from "service-srv";
export const _ = {
  url: "/srvapi-check/:site_id",
  async api(site_id: string) {
    const { req, res } = apiContext(this);
    return {};
  },
};
