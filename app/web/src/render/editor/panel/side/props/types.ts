import { IItem } from "../../../../../utils/types/item";
import { FNCompDef } from "../../../../../utils/types/meta-fn";

export type CPArgs = {
  name: string;
  prop: FNCompDef;
  onChange: (val: any) => void;
  editCode: (onClose: () => void) => void;
  reset: () => void;
};
