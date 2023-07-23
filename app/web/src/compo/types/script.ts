export type SingleScope = {
  value: Record<string, any>;
  types: Record<string, Record<string, string>>;
  effect: Record<
    string,
    { name: string; effects: { effect: (local: any) => any; deps: any[] }[] }
  >;
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
