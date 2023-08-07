export type SingleScope = {
  value: Record<string, any>;
  types: Record<string, Record<string, string>>;
  effectRun: Record<string, true>;
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
  evargs: Record<string, { local: any; passprop: any; passchild: any }>;
};
