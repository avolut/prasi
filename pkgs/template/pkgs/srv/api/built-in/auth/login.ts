import argon from "@node-rs/argon2";
import { apiContext, session } from "service-srv";

export const _ = {
  url: "/_login",
  async api(username: string, password: string) {
    const { res, req } = apiContext(this);

    const current = session.get(req);
    if (!current) {
      // const user = await db.user.findFirst({
      //   where: { OR: [{ username: phone }, { phone }] },
      //   include: {
      //     site: true,
      //   },
      // });

      return { status: "ok", session: { username } };

      // if (user !== null && (await argon.verify(user.password, password))) {
      //   //@ts-ignore
      //   delete user.password;
      //   const sdata = await session.new({ user });
      //   res.header("set-cookie", `${session.cookieKey}=${sdata.id};`);
      // }
    } else {
      return { status: "ok", session: current };
    }

    return {
      status: "failed",
      reason: "Invalid phone / password",
    };
  },
};
