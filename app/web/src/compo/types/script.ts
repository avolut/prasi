export type SingleScope = {
  value: Record<string, any>;
  effect: Record<string, { name: string; effect: (local: any) => any }>;
  tree: Record<
    string,
    {
      childs: Set<string>;
      // type: string;
      // name: string;
      // lv: number;
      parent_id: string;
    }
  >;
  evargs: Record<string, { local: any; passprop: any }>;
};
