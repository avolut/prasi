import { inspectSchema } from "./action/inspect";
import { execQuery } from "./action/query";
import { DBArg, glbdb } from "./glbdb";

export const dbAction = {
  query: async (arg: DBArg) => {
    const result = await execQuery(arg, glbdb, "prisma");
    return result;
  },
  schema: async (table: string) => {
    return await inspectSchema(table, glbdb, "prisma");
  },
};
