import { runner } from "bundler/runner";
import chalk from "chalk";
import { dir } from "dir";
import { existsAsync } from "fs-jetpack";
import padEnd from "lodash.padend";
import { createRPC } from "rpc";
import { createService } from "service";
import { SERVICE_NAME } from "../../../src/types";
import { dbAction } from "./action";
import { fixPrismaName } from "./ensure-prisma";
import { glbdb } from "./glbdb";
import { parsePrisma } from "./parse-prisma";

export const createDB = async (arg: { name: SERVICE_NAME }) => {
  const { name } = arg;

  return await createService({
    name,
    mode: "single",
    init: async ({}) => {
      await createRPC(name, dbAction);

      const schemaPath = dir.path(`${name}/schema.prisma`);
      if (!(await existsAsync(schemaPath))) {
        console.log(
          `🚩 DB schema not found: ${chalk.cyan(
            schemaPath.substring(dir.root().length + 1)
          )}`
        );
      } else {
        const schema = await parsePrisma(schemaPath);
        if (schema?.dburl) {
          const db = new URL(schema?.dburl);
          console.log(
            `${chalk.magenta("Started")} ${chalk.green(
              `${padEnd(name, 12, " ")}`
            )} ${chalk.gray(`${db.hostname} • ${db.pathname.substring(1)}`)} `
          );
        } else {
          console.log(
            `${chalk.red("Skipped")} ${chalk.green(
              `${padEnd(name, 12, " ")}`
            )} Database URL is empty`
          );
        }

        const genExists = await existsAsync(
          dir.path(`${name}/node_modules/.gen`)
        );
        let shouldGenerate = false;

        if (!genExists) {
          shouldGenerate = true;
        }

        if (shouldGenerate) {
          console.log(`Generating prisma: ${chalk.cyan(`${name}`)}`);
          await runner.run({
            path: "pnpm",
            args: ["prisma", "generate"],
            cwd: dir.path(name),
            silent: true,
          });

          await fixPrismaName(
            dir.path(`${name}/node_modules/.gen/package.json`)
          );
        }
      }

      try {
        //@ts-ignore
        const PRISMA = await import("../../../../../app/db/node_modules/.gen");

        const prisma = (await import(
          dir.path(`${name}/node_modules/.gen/index.js`)
        )) as typeof PRISMA;

        glbdb.prisma = new prisma.PrismaClient();
        await glbdb.prisma.$connect();
      } catch (e) {}

      return dbAction;
    },
  });
};
