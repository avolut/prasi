import { apiContext } from "service-srv";
import createCompress from "compress-brotli";

import fs from "fs";
import path from "path";
import { dir } from "dir";
import { exists } from "fs-jetpack";

const { compress } = createCompress();
export const _ = {
  url: "/site-export/:site_id",
  async api(site_id: string) {
    const { req, res } = apiContext(this);
    const site = await db.site.findFirst({ where: { id: site_id } });
    const pages = await db.page.findMany({
      where: {
        id_site: site_id,
        is_deleted: false,
      },
    });
    const comps = await db.component.findMany({
      where: {
        component_group: {
          component_site: {
            some: {
              id_site: site_id,
            },
          },
        },
      },
    });
    const npm = {
      site: {} as Record<string, string>,
      pages: {} as Record<string, Record<string, string>>,
    };
    npm.site = readDirectoryRecursively(dir.path(`../npm/site/${site_id}`));

    for (const page of pages) {
      if (exists(dir.path(`../npm/page/${page.id}`))) {
        npm.pages[page.id] = readDirectoryRecursively(
          dir.path(`../npm/page/${page.id}`)
        );
      }
    }

    const compressed = await compress(
      JSON.stringify({ site, pages, npm, comps })
    );
    return compressed.toString();
  },
};

function readDirectoryRecursively(dirPath: string): Record<string, string> {
  const result: Record<string, string> = {};

  const contents = fs.readdirSync(dirPath);

  for (const item of contents) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isFile()) {
      const content = fs.readFileSync(itemPath, "utf-8");
      result[item] = content;
    } else if (stats.isDirectory()) {
      const subdirResult = readDirectoryRecursively(itemPath);
      Object.assign(result, subdirResult);
    }
  }

  return result;
}
