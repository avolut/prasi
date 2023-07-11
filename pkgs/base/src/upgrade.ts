import { spawnSync } from "child_process";
import { dir } from "dir";
import { unzipSync } from "fflate";
import { readdirSync } from "fs";

import {
  copyAsync,
  dirAsync,
  existsAsync,
  moveAsync,
  removeAsync,
  writeAsync,
} from "fs-jetpack";
import { join } from "path";

export const upgradeHook = async (args: string[]) => {
  if (args.includes("upgrade")) {
    const backupDir = dir.root(".output/upgrade/backup");

    await removeAsync(dir.root(".output/upgrade"));
    await dirAsync(backupDir);

    console.log(`Upgrading Base Framework`);
    console.log(` > Downloading upgrade zip`);

    const downloadURI = `https://github.com/avolut/royal/archive/refs/heads/main.zip`;
    const res = await fetch(downloadURI);
    const ab = await res.arrayBuffer();
    console.log(` > Extracting: .output/upgrade/royal`);
    const uzi = unzipSync(new Uint8Array(ab));
    await dirAsync(dir.root(".output/upgrade/royal-main"));
    await Promise.all(
      Object.entries(uzi).map(async ([filename, buf]) => {
        if (buf.length === 0) {
          await dirAsync(dir.root(`.output/upgrade/${filename}`));
        } else {
          await writeAsync(
            dir.root(`.output/upgrade/${filename}`),
            Buffer.from(buf)
          );
        }
      })
    );

    console.log(` > Backing up existing pkgs to: .output/upgrade/backup`);
    const root = dir.root("");

    for (const f of readdirSync(dir.root(""))) {
      if (f !== "app" && f !== ".output" && f !== ".husky" && f !== ".git") {
        if (await existsAsync(join(root, `.output/upgrade/backup/${f}`))) {
          await moveAsync(
            join(root, f),
            join(root, `.output/upgrade/backup/${f}`)
          );
        }
      }
    }

    console.log(` > Applying upgrade`);

    for (const f of readdirSync(join(root, ".output/upgrade/royal-main"))) {
      if (
        f !== "app" &&
        f !== ".output" &&
        f !== "." &&
        f !== ".." &&
        f !== ".husky" &&
        f !== ".git"
      ) {
        await copyAsync(
          join(root, `.output/upgrade/royal-main/${f}`),
          join(root, f),
          {
            overwrite: true,
          }
        );
      }
    }

    spawnSync("pnpm", ["i"], { cwd: dir.root(""), stdio: "inherit" });

    if (process.send) {
      process.send("exit");
    } else {
      process.exit();
    }
    process.exit(1);
    return true;
  }
};
