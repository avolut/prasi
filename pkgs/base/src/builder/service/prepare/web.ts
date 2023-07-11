import { dir } from "dir";
import { writeAsync } from "fs-jetpack";
import { stat } from "fs/promises";
import { basename, extname } from "path";
import {
  generateLayout,
  generateLayoutEntry,
} from "../../../scaffold/web/layout";
import { generatePage, generatePageEntry } from "../../../scaffold/web/page";
import { generateSSR, generateSSREntry } from "../../../scaffold/web/ssr";
import { scaffoldWeb } from "../../../scaffold/web/web";

export const prepareWeb = async (name: string, changes?: Set<string>) => {
  if (!changes) {
    await scaffoldWeb();
    await generatePageEntry([name]);
    await generatePage(name, dir.root(`app/${name}/src/base/page`));
    await generateLayoutEntry([name]);
    await generateLayout(name, dir.root(`app/${name}/src/base/layout`));
    await generateSSREntry([name]);
    await generateSSR(name, dir.root(`app/${name}/src/base/ssr`));

    return { shouldRestart: false };
  }

  try {
    for (const e of changes.values()) {
      if (e.startsWith(dir.root(`app/${name}/src/base/page`))) {
        const s = await stat(e);
        if (s.size === 0) {
          const routeName = basename(
            e.substring(0, e.length - extname(e).length)
          );
          await writeAsync(
            e,
            `\
import { page } from "web-init";

export default page({
  url: "/${routeName}",
  component: ({ }) => {
    return <div>Hello World</div>;
  },
});
`
          );

          await generatePageEntry([name]);
          await generatePage(name, dir.root(`app/${name}/src/base/page`));
        }
      }
    }
  } catch (e) {
    console.error(e);
  }

  return { shouldRestart: true };
};
