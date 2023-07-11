import { apiContext, session } from "service-srv";
export const _ = {
  url: "/_payment",
  async api(info: any) {
    const { req, res } = apiContext(this);

    const create = await db.payment.create({
      data: {
        nominal: info.total,
        id_invoice: info.id_invoice,
        payment_method: "CC",
        payment_method_detail: info.cc,
        payment_date: info.payment_date,
        expired_date: info.expired_date,
        description: info.description,
        status: "NEW",
        payment_history: {
          createMany: {
            data: [
              {
                status: "NEW",
              },
              {
                status: "PAID",
              },
            ],
          },
        },
      },
    });

    if (create) {
      const upd = await db.invoice.update({
        data: {
          status: "PAID",
        },
        where: {
          id: info.id_invoice,
        },
      });

      if (upd) {
        const updpayment = await db.payment.update({
          data: {
            status: "PAID",
          },
          where: {
            id: create.id,
          },
        });

        if (updpayment) {
          return { status: "ok" };
        }
      }
    }

    return { status: "failed", reason: "Something wrong, please try again" };
  },
};
