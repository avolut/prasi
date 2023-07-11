import { runner } from "bundler/runner";
import chalk from "chalk";
import { dir } from "dir";
import { removeAsync } from "fs-jetpack";
import {
  ensurePrisma,
  fixPrismaName,
} from "../../../../../service/pkgs/service-db/export";

export const prepareDB = async (name: string, changes?: Set<string>) => {
  if (!changes) {
    const prisma = await ensurePrisma(name);

    if (!prisma.generated && !!prisma.dburl) {
      console.log(`Generating prisma: ${chalk.cyan(`app/${name}`)}`);
      await runner.run({
        path: "pnpm",
        args: ["prisma", "generate"],
        cwd: dir.root(`app/${name}`),
        silent: true,
      });

      await fixPrismaName(
        dir.root(`app/${name}/node_modules/.gen/package.json`)
      );

      // di delete biar digenerate sama runtime, supaya pake yg paling baru
      await removeAsync(dir.root(`.output/app/${name}/node_modules/.gen`));
    }
  }
  return { shouldRestart: true };
};
