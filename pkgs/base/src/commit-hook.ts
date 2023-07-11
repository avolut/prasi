import { spawnSync } from "child_process";
import { dir } from "dir";
import { existsAsync, readAsync, removeAsync, writeAsync } from "fs-jetpack";
import { spawn } from "utility/spawn";
import { $ } from "execa";
export const commitHook = async (args: string[]) => {
  const isMainRepo = async () => {
    const conf = await readAsync(dir.root(".git/config"), "utf8");
    if (conf?.includes("url = https://github.com/avolut/royal")) {
      return true;
    }
    return false;
  };

  if (args.includes("pre-commit")) {
    if (await isMainRepo()) {
      if (!(await existsAsync(dir.root(".husky/_/husky.sh")))) {
        await $`pnpm husky install`;
      }

      await writeAsync(dir.root(".output/.commit"), "");
    }
    process.exit(1);
    return true;
  }

  if (args.includes("post-commit")) {
    if (await isMainRepo()) {
      if (await existsAsync(dir.root(".output/.commit"))) {
        await removeAsync(dir.root(".output/.commit"));
        await writeAsync(dir.root("pkgs/version.json"), { ts: Date.now() });

        await $`git add .pkgs/version.json`;
        await $`git commit --ammend -C HEAD --no-verify`;
      }
    }

    process.exit(1);
    return true;
  }
  return false;
};
