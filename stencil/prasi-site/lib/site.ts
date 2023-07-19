export type Site = {
  id: string;
  domain: string;
  pages: {
    id: string;
    content_tree: any;
    js_compiled: string;
  }[];
  components: {
    id: string;
    props: Record<string, any>;
    content_tree: any;
  };
};
