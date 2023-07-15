import { page, site } from "dbgen";
import { validate as isValidUUID } from "uuid";
import * as Y from "yjs";

export type SiteConfig = {
  api_url?: string;
  prasi?: {
    port: number;
    dburl: string;
  };
};
export const loadSite = async (idOrDomain: string) => {
  let rname = idOrDomain;
  if (!rname) {
    rname = "prasi.app";
  }

  const res = await db.site.findFirst({
    where: isValidUUID(rname)
      ? {
          id: rname,
        }
      : {
          domain: rname,
        },
    include: {
      page: {
        select: {
          id: true,
          url: true,
          updated_at: true,
          name: true,
        },
      },
    },
  });

  if (res) {
    if (!res.page) {
      res.page = [];
    }
    if (res.page.length === 0) {
      const page = await createPage(res as any, {
        name: "Home",
        url: "/",
      });

      res.page.push(page);
    }

    for (const p of res.page) {
      const page = p as any;
      page.js = new Y.Text();
      page.js_compiled = new Y.Text();
      page.content_tree = new Y.Map();
    }
  }

  return res as
    | (Omit<site, "config"> & {
        config?: SiteConfig;
        page: {
          id: string;
          url: string;
          updated_at: Date | null;
          name: string;
        }[];
      })
    | null;
};

const createPage = async (
  site: site & { page: page[] },
  page: WithOptional<
    Parameters<typeof db.page.create>[0]["data"],
    "content_tree"
  >
) => {
  const raw = await db.page.create({
    data: {
      ...(page as any),
      content_tree: page.content_tree ? page.content_tree : blank,
      site: {
        connect: { id: site.id },
      },
    },
  });

  return raw;
};

const blank = { id: "root", type: "root", childs: [] };
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
