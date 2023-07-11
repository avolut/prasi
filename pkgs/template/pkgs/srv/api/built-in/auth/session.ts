import { apiContext, session } from "service-srv";

export const _ = {
  url: "/_session",
  async api() {
    const { req } = apiContext(this);
    return session.get(req);
  },
};
