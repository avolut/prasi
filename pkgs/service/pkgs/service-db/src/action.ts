import { inspectSchema } from "./action/inspect";
import { execQuery } from "./action/query";
import { DBArg, glbdb } from "./glbdb";
import { createId } from "@paralleldrive/cuid2";

type Tx = Parameters<Parameters<typeof glbdb.prisma.$transaction>[0]>[0];
const transactions: Record<string, { tx: Tx; done: () => void }> = {};

export const dbAction = {
  query: async (arg: DBArg) => {
    const result = await execQuery(arg, glbdb, "prisma");
    return result;
  },
  startTx: async () => {
    const txid = createId();
    transactions[txid] = { tx: null as any, done: () => {} };
    const promise = new Promise<void>((done) => {
      transactions[txid].done = done;
    });
    let gotTx: any = () => {};
    const shouldReturn = new Promise<void>((resolve) => {
      gotTx = resolve;
    });
    glbdb.prisma.$transaction(async (tx: Tx) => {
      transactions[txid].tx = tx;
      gotTx();
      await promise;
    });

    await shouldReturn;
    return txid;
  },
  queryTx: async (arg: DBArg & { txid: string }) => {
    const trx = transactions[arg.txid];
    if (trx) {
      const result = await execQuery(arg, { prisma: trx.tx }, "prisma");
      return result;
    }
    return null;
  },
  endTx: (txid: string) => {
    const trx = transactions[txid];
    if (trx) {
      trx.done();
      delete transactions[txid];
    }
  },
  schema: async (table: string) => {
    return await inspectSchema(table, glbdb, "prisma");
  },
};
