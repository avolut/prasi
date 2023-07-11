import { user } from "dbgen";
import { apiContext, session } from "service-srv";

export const _ = {
  url: "/_session",
  async api() {
    const { req, res } = apiContext(this);
    const sdata = session.get<{
      user: user & {
        org: {
          id: string;
          name: string;
        }[];
      };
    }>(req);
    if (sdata) {
      res.header(
        "set-cookie",
        `${session.cookieKey}=${sdata.id}; SameSite=None; Secure; HttpOnly`
      );
    }
    return sdata;
  },
};
