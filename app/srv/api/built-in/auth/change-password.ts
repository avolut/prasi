import { apiContext, session } from "service-srv";
import argon2 from "@node-rs/argon2";

export const _ = {
  url: "/change-password",
  async api(data: any) {
    const { res, req } = apiContext(this);

    const user = await db.user.findFirst({
      where: { token_reset_password: data.token },
      include: {
        site: true,
      },
    });

    if (user !== null) {
      if (data.new_password !== data.conf_password) {
        return {
          status: "failed",
          reason: "Confirmation Password is wrong!",
        };
      }

      const upd = await db.user.update({
        data: {
          password: await argon2.hash(data.new_password),
        },
        where: {
          id: user.id,
        },
      });
      if (upd) {
        return { status: "ok" };
      }
    }

    return {
      status: "failed",
      reason: "Something wrong, please try again later!",
    };
  },
};
