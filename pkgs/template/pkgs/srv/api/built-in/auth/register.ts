import { apiContext } from "service-srv";

export const _ = {
  url: "/register",
  async api(user: any) {
    const { res, req } = apiContext(this);

    return { status: "ok" };
  },
};
