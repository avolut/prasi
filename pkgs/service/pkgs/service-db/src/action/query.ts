import { waitUntil } from "utility/wait-until";
import { DBArg, DbDefCols, DbDefRels } from "../glbdb";
import { inspectSchema } from "./inspect";

export const execQuery = async (args: DBArg, prismaLocal: any, key: string) => {
  const { table, action, params } = args;

  if (!prismaLocal[key]) {
    console.log(`Waiting db to connect...`);
    await waitUntil(() => prismaLocal[key]);
  }

  if (table === "*") {
    return prismaLocal["prisma"]._baseDmmf.datamodel.models.map(
      (e: any) => e.name
    );
  }

  const tableInstance = (prismaLocal[key] as any)[table];

  if (tableInstance) {
    if (action === "query" && table.startsWith("$query")) {
      try {
        const q = params.shift();
        q.sql = true;
        Object.freeze(q);
        return await tableInstance.bind(prismaLocal[key])(q, ...params);
      } catch (e) {
        console.log(e);
        return e;
      }
    }

    if (action === "definition") {
      const schema = await inspectSchema(table, prismaLocal, "prisma");
      const rels = {} as DbDefRels;
      const columns = {} as DbDefCols;

      schema.fields.map((e) => {
        if (!e.relationName) {
          columns[e.name] = {
            name: e.name,
            nullable: !e.isRequired,
            pk: e.isId,
            type: e.type.toLowerCase(),
          };
        }
        return e;
      });

      schema.fields.map((e) => {
        if (e.relationName) {
          rels[e.relationName] = {
            modelClass: e.name,
            relation:
              e.relationType === "has_many"
                ? "Model.HasManyRelation"
                : "Model.BelongsToOneRelation",
            join: {
              from: `${e.name}.${e.relationFromFields[0]}`,
              to: `${e.kind}.${e.relationToFields[0]}`,
            },
          };

          if (e.relationType === "belongs_to") {
            columns[e.relationFromFields[0]].rel = "belongs-to";
          }
        }
        return e;
      });

      const def = {
        db: {
          name: table,
        },
        rels,
        columns,
      };
      return def;
    }

    const method = tableInstance[action];
    if (method) {
      try {
        const result = await method(...params);
        if (!result) {
          return JSON.stringify(result);
        }

        return result;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
  }
};
