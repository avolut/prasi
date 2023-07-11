import { apiContext, session } from "service-srv";
import argon from "@node-rs/argon2";

export const _ = {
  url: "/verification",
  async api(phone: string) {
    const { res, req } = apiContext(this);

    const user = await db.user.findFirst({
      where: { OR: [{ email: phone }, { phone }] },
      include: {
        site: true,
      },
    });

    if (user !== null) {
      return { status: "ok", data: user };
    }

    return {
      status: "failed",
      reason: "Invalid phone / email",
    };
  },
};
