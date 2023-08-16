export const defaultPrasiLoader = {
  site: async (
    id?: string
  ): Promise<{ id: string; domain: string; js: string; npm: string }> => {
    return null as any;
  },
  page: async (
    id?: string
  ): Promise<
    {
      id: string;
      content_tree: string;
      url: string;
      npm: string;
      comps: {
        id: string;
        content_tree: string;
      }[];
    }[]
  > => {
    return null as any;
  },
  pages: async (
    id?: string[]
  ): Promise<
    {
      id: string;
      content_tree: string;
      url: string;
      npm: string;
      comps: {
        id: string;
        content_tree: string;
      }[];
    }[]
  > => {
    return null as any;
  },
  comp: async (
    id?: string
  ): Promise<{
    id: string;
    content_tree: string;
  }> => {
    return null as any;
  },
};

export type PrasiLoader = typeof defaultPrasiLoader;
