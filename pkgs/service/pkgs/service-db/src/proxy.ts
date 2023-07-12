import { connectRPC } from "rpc";
import { RPCActionResult } from "rpc/src/types";
import { dbAction } from "./action";
import { glbdb } from "./glbdb";

export type DBName = "db";

export type DBTables<T> = T extends DBName
  ? Exclude<
      keyof typeof glbdb.prisma,
      | "$connect"
      | "$disconnect"
      | "$execute"
      | "$executeRaw"
      | "$executeRawUnsafe"
      | "$on"
      | "$queryRaw"
      | "$queryRawUnsafe"
      | "$transaction"
      | "$use"
      | "_schema"
    >
  : never;

export type ExtendPrisma<T extends DBName> = {
  _schema: {
    [tableName in DBTables<T>]: Promise<{
      pk: string[];
    }>;
  };
};

type DBProxy = (rpc: RPCActionResult<typeof dbAction>) => typeof glbdb.prisma;

export const dbs: DBProxy = (rpc) => {
  return new Proxy(
    { schema: {} as Record<string, { pk: string[] }> },
    {
      get(_, table: string) {
        if (!_.schema) {
          _.schema = {};
        }

        const schema = new Proxy(
          {},
          {
            async get(__, table: string) {
              if (!_.schema[table]) {
                _.schema[table] = await rpc.schema(table);
              }
              return _.schema[table];
            },
          }
        );
        if (table === "_schema") {
          return schema;
        }

        if (table.startsWith("$")) {
          if (table === "$transaction") {
            return async (transaction: any) => {
              const txID = await rpc.startTx();
              await transaction(
                new Proxy(
                  {},
                  {
                    get(_, table: string) {
                      return new Proxy(
                        {},
                        {
                          get(_, action: string) {
                            return async (...params: any[]) => {
                              if (table === "query") {
                                table = action;
                                action = "query";
                              }
                              //@ts-ignore
                              return rpc.queryTx({
                                action,
                                table,
                                params,
                                txid: txID,
                              });
                            };
                          },
                        }
                      );
                    },
                  }
                )
              );
              await rpc.endTx(txID);
            };
          }

          if (table === "$query") {
            return (...params: any[]) => {
              //@ts-ignore
              return rpc.query({
                action: "query",
                table,
                params,
              });
            };
          }
        }

        return new Proxy(
          {},
          {
            get(_, action: string) {
              return async (...params: any[]) => {
                if (table === "query") {
                  table = action;
                  action = "query";
                }

                //@ts-ignore
                const result = await rpc.query({
                  action,
                  table,
                  params,
                });

                return result;
              };
            },
          }
        );
      },
    }
  ) as any;
};
