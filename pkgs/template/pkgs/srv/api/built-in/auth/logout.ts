import { apiContext, session } from "service-srv";
export const _ = {
  url: "/_logout",
  async api() {
    const { res, req } = apiContext(this);

    const current = session.get(req);
    if (current) {
      res.header("set-cookie", `${session.cookieKey}=;`);
    }
    return { status: "logged-out" };
  },
};
