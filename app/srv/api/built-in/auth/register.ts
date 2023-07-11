import argon2 from "@node-rs/argon2";
import { apiContext, session } from "service-srv";

export const _ = {
  url: "/register",
  async api(user: { username: string; password: string; email: string }) {
    const { res, req } = apiContext(this);

    const u = await db.user.findFirst({
      where: { OR: [{ username: user.username }, { email: user.email }] },
    });

    if (u) {
      return { status: "failed", reason: "Username/Email already exists" };
    } else {
      const create = await db.user.create({
        data: {
          email: user.email,
          username: user.username,
          phone: "",
          password: await argon2.hash(user.password),
        },
        include: {
          site: {},
        },
      });

      delete (create as any).password;
      const sdata = await session.new({ user: create });
      return { status: "ok", session: sdata };
    }
  },
};
