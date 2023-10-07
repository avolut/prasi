import { apiContext } from "service-srv";

import { dir } from "dir";
import fs from "fs";
import { exists, writeAsync } from "fs-jetpack";
import { compress, compressToUint8Array } from "lz-string";
import path from "path";

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

    const str = JSON.stringify({ site, pages, npm, comps });
    return str;
  },
};

function readDirectoryRecursively(
  dirPath: string,
  baseDir?: string[]
): Record<string, string> {
  const result: Record<string, string> = {};

  const contents = fs.readdirSync(dirPath);

  for (const item of contents) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isFile()) {
      const content = fs.readFileSync(itemPath, "utf-8");
      result[[...(baseDir || []), item].join("/")] = content;
    } else if (stats.isDirectory()) {
      const subdirResult = readDirectoryRecursively(itemPath, [
        ...(baseDir || []),
        item,
      ]);
      Object.assign(result, subdirResult);
    }
  }

  return result;
}
