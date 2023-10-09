import { apiContext } from "service-srv";

import { dir } from "dir";
import fs from "fs";
import { exists } from "fs-jetpack";
import { gzipSync } from "zlib";
import path from "path";

export const _ = {
  url: "/site-export/:site_id",
  async api(site_id: string) {
    const { req, res } = apiContext(this);
    const site = (await db.site.findFirst({
      where: { id: site_id },
    })) as any;
    const pages = await db.page.findMany({
      where: {
        id_site: site_id,
        is_deleted: false,
        name: { not: { startsWith: "layout:" } },
      },
    });

    if (site) {
      const layout = await db.page.findFirst({
        where: {
          id_site: site.id,
          name: { startsWith: "layout:" },
          is_default_layout: true,
          is_deleted: false,
        },
        select: { content_tree: true },
      });

      const cgroups = await db.site_use_comp.findMany({
        where: { id_site: site.id },
      });

      if (cgroups) {
        site.cgroup_ids = [];
        for (const id of cgroups.map((c) => c.use_id_site)) {
          site.cgroup_ids.push(id);
        }
      }

      if (layout) {
        const childs = (layout.content_tree as any).childs;
        if (childs && childs.length > 0) {
          (site as any).layout = childs[0];
        }
      }
    }

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

    const str = gzipSync(JSON.stringify({ site, pages, npm, comps }));
    res.send(str);
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
      if (item !== "node_modules") {
        const subdirResult = readDirectoryRecursively(itemPath, [
          ...(baseDir || []),
          item,
        ]);
        Object.assign(result, subdirResult);
      }
    }
  }

  return result;
}
