import { IItem } from "./item";
import { IRoot } from "./root";

export type COMPONENT_ID = string;
export type PAGE_ID = string;
export type COMPONENT_PROPS = Record<string, any>;
export type PRASI_PAGE = {
  id: string;
  url: string;
  name: string;
  js_compiled?: string;
  content_tree?: IRoot | null;
  updated_at?: Date;
};

export type PRASI_COMPONENT = {
  id: string;
  name: string;
  content_tree: IItem;
};
