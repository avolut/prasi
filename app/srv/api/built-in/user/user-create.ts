import { apiContext, session } from "service-srv";
import argon2 from "@node-rs/argon2";
export const _ = {
  url: "/user-create",
  async api(user: { username: string; password: string; org: string }) {
    const { req, res } = apiContext(this);

    const u = await db.user.findFirst({
      where: { OR: [{ username: user.username }] },
    });

    if (u) {
      return { status: "failed", reason: "username already exists" };
    }

    const create = await db.user.create({
      data: {
        email: "",
        username: user.username.toLowerCase(),
        phone: "",
        password: await argon2.hash(user.password),
        id_organization: user.org,
      },
    });

    if (create) {
      return { status: "ok" };
    }

    return { status: "failed", reason: "Something wrong, please try again" };
  },
};
