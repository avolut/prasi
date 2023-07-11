import { getSchema } from "@mrleebo/prisma-ast";
import { readAsync } from "fs-jetpack";

export const parsePrisma = async (prismaPath: string) => {
  let hasModel = false;
  let dburl = "";
  const schemaRaw = await readAsync(prismaPath, "utf8");
  if (schemaRaw) {
    const schema = getSchema(schemaRaw);

    for (const s of schema.list) {
      if (s.type === "model") {
        hasModel = true;
      }
      if (s.type === "generator") {
        if (s.name === "client") {
          s.assignments = [
            {
              type: "assignment",
              key: "provider",
              value: '"prisma-client-js"',
            },
            {
              type: "assignment",
              key: "output",
              value: '"./node_modules/.gen"',
            },
          ];
        } else if (s.name === "client_app") {
          s.assignments = [
            {
              type: "assignment",
              key: "provider",
              value: '"prisma-client-js"',
            },
            {
              type: "assignment",
              key: "output",
              value: '"../node_modules/.gen"',
            },
          ];
        }
      } else if (s.type === "datasource") {
        s.assignments.forEach((e) => {
          if (e.type === "assignment" && e.key === "url") {
            dburl = JSON.parse(e.value.toString());
          }
        });
      }
    }
    return { hasModel, dburl };
  }
};
