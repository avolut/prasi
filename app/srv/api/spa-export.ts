import { apiContext } from "service-srv";
export const _ = {
  url: "/spa-export/:site_id",
  async api(site_id: string) {
    const { res, req } = apiContext(this);

    if (typeof req.query_parameters["open"] !== "string") {
      res.setHeader("content-disposition", `attachment; filename="Prasi.tsx"`);
    }
    return "hello world";
  },
};
