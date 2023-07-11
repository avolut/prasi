import { apiContext, session } from "service-srv";
export const _ = {
  url: "/_logout",
  async api() {
    const { res, req } = apiContext(this);

    const current = session.get(req);
    if (current) {
      session.del(current.id);
      res.header("set-cookie", `${session.cookieKey}=; SameSite=None; Secure`);
    }
    return { status: "logged-out" };
  },
};
