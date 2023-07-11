import { getSchema, printSchema } from "@mrleebo/prisma-ast";
import { runner } from "bundler/runner";
import { dir } from "dir";
import {
  copyAsync,
  dirAsync,
  existsAsync,
  readAsync,
  writeAsync,
} from "fs-jetpack";
import { dirname } from "path";

export const fixPrismaName = async (path: string) => {
  try {
    const pkg = (await readAsync(path, "json")) as { name: string };
    if (pkg && pkg.name) {
      pkg.name = pkg.name.replace(/[\W_]+/g, "_");
      await writeAsync(path, pkg);
    }
  } catch (e) {}
};

export const ensurePrisma = async (name: string) => {
  const prismaPath = dir.root(`app/${name}/prisma/schema.prisma`);
  let dburl = "";
  if (!(await existsAsync(prismaPath))) {
    await dirAsync(dirname(prismaPath));
    await writeAsync(
      prismaPath,
      `\
generator client {
  provider = "prisma-client-js"
  output   = "./node_modules/.gen"
}

generator client_app {
  provider = "prisma-client-js"
  output   = "../node_modules/.gen"
}

datasource db {
  provider = "postgresql"
  url      = ""
}`
    );
  }

  const schemaRaw = await readAsync(prismaPath, "utf8");

  if (!schemaRaw) {
    console.log(
      `Warning ${prismaPath.substring(dir.root().length + 1)} is empty.`
    );
  }

  if (schemaRaw) {
    const schema = getSchema(schemaRaw);
    let hasModel = false;
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
    const newSchemaRaw = printSchema(schema).trim();
    await writeAsync(prismaPath, newSchemaRaw);

    if (newSchemaRaw !== schemaRaw.trim() || !hasModel) {
      return { generated: false, pulled: false, dburl };
    }

    let prismaOutputSame = false;
    if (await existsAsync(dir.root(`.output/app/${name}/schema.prisma`))) {
      prismaOutputSame = true;

      const outputSchema = await readAsync(
        dir.root(`.output/app/${name}/schema.prisma`)
      );

      if (newSchemaRaw.trim() !== outputSchema?.trim()) {
        prismaOutputSame = false;
      }
    }

    await copyAsync(
      dir.root(`app/${name}/prisma/schema.prisma`),
      dir.root(`.output/app/${name}/schema.prisma`),
      {
        overwrite: true,
      }
    );

    if (
      !prismaOutputSame ||
      !(await existsAsync(dir.root(`app/${name}/node_modules/.gen`)))
    ) {
      return { generated: false, pulled: true, dburl };
    }
  }

  return { generated: true, pulled: true, dburl };
};
