import chalk from "chalk";
import { format } from "date-fns";
import { dir } from "dir";
import { readAsync } from "fs-jetpack";

export const versionCheck = async (opt: { timeout: number }) => {
  //check version on dev
  const version = await readAsync(dir.root("pkgs/version.json"), "json");
  let timeout = {
    timer: null as any,
  };

  fetch(`https://raw.githubusercontent.com/avolut/royal/main/pkgs/version.json`)
    .then(async (res) => {
      const remoteVersion = await res.json();
      timeout.timer = setTimeout(async () => {
        try {
          if (remoteVersion.ts > version.ts) {
            console.log(`
📣 New version available: ${chalk.cyan(
              `v${format(new Date(remoteVersion.ts), "1.Md.hm")}`
            )} 
${chalk.reset(`
To upgrade, please run: 
  > ${chalk.underline(chalk.green(`node base upgrade`))}

If somehow upgrade failed you can rollback using
  > ${chalk.red(`node base rollback`)}
`)}
────────────────────────────────────────
`);
          }
        } catch (e) {}
      }, opt.timeout);
    })
    .catch(() => {});
};
