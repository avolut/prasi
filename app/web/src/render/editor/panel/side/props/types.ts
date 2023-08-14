import { IItem } from "../../../../../utils/types/item";
import { FNCompDef } from "../../../../../utils/types/meta-fn";

export type CPArgs = {
  prop: FNCompDef;
  onChange: (val: any) => void;
  editCode: () => void;
  reset: () => void;
};
