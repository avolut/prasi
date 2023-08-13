import { TypedArray, TypedMap } from "yjs-types";
import { BasicItem, MBasicItem, MetaItem } from "./meta";
import {
  FNAdv,
  FNComponent,
  FNLayout,
  FNLinkTag
} from "./meta-fn";
import { MSection } from "./section";
import { IText, MText } from "./text";
export type IItem = {
  layout?: FNLayout;
  linktag?: FNLinkTag;
  mobile?: IItem;
  adv?: FNAdv;
  type: "item";
  component?: FNComponent;
  childs: (IItem | IText)[];
} & MetaItem &
  BasicItem;

export type MItem = TypedMap<
  {
    type: "item";
    mobile?: MItem;
    childs?: TypedArray<MItem | MText>;
  } & MBasicItem &
    MetaItem
> & { parent: TypedArray<MSection | MItem> & { parent: MSection | MItem } };
