import { dir } from "dir";
import { writeAsync } from "fs-jetpack";
import { stat } from "fs/promises";
import { basename, extname } from "path";
import { generateAPI, generateAPIEntry } from "../../../scaffold/srv/api";

export const prepareSrv = async (name: string, changes?: Set<string>) => {
  if (!changes) {
    await generateAPIEntry([name]);
    await generateAPI(name, dir.root(`app/${name}/api`));

    return { shouldRestart: false };
  }

  try {
    for (const e of changes.values()) {
      if (e.startsWith(dir.root(`app/${name}/api`))) {
        const s = await stat(e);
        if (s.size === 0) {
          const routeName = basename(
            e.substring(0, e.length - extname(e).length)
          );
          await writeAsync(
            e,
            `\
import { apiContext } from "service-srv";
export const _ = {
  url: "/${routeName}",
  async api() {
    const { req, res } = apiContext(this);
    return "hello world";
  },
};`
          );
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
  await generateAPIEntry([name]);
  await generateAPI(name, dir.root(`app/${name}/api`));

  return { shouldRestart: true };
};
