import { bundle } from "bundler";
import chalk from "chalk";
import { dir } from "dir";
import { existsAsync } from "fs-jetpack";
import { prepareBuild } from "./service/prepare";

export const buildServiceModule = async (
  name: string,
  arg: { watch: boolean }
) => {
  if (await existsAsync(dir.root(`app/${name}/module.ts`))) {
    await bundle({
      input: dir.root(`app/${name}/module.ts`),
      output: dir.root(`.output/app/${name}/module.js`),
      tstart: false,
      watch: arg.watch,
      pkgjson: {
        input: dir.root(`app/${name}/package.json`),
      },
      event: arg.watch
        ? {
            async onStart({}) {
              await prepareBuild(name);
            },
            async onEnd({ isRebuild }) {
              if (isRebuild) {
                console.log(`${chalk.magenta("Reload")}  ${chalk.green(name)}`);
              }
            },
          }
        : undefined,
    });
  }
};
