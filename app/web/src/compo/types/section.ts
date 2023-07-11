import { TypedArray, TypedMap } from "yjs-types";
import { IItem, MItem } from "./item";
import { BasicItem, MBasicItem, MetaItem } from "./meta";
import {
  FMAdv,
  FMLayout,
  FMLinkTag,
  FNAdv,
  FNLayout,
  FNLinkTag,
} from "./meta-fn";
import { MRoot } from "./root";

export type ISection = {
  layout?: FNLayout;
  mobile?: ISection;
  linktag?: FNLinkTag;
  adv?: FNAdv;
  type: "section";
  childs: IItem[];
} & MetaItem &
  BasicItem;

export type MSection = TypedMap<
  {
    mobile?: MSection;
    type: "section";
    childs?: TypedArray<MItem>;
  } & MBasicItem &
    MetaItem
> & { parent: TypedArray<MSection> & { parent: MRoot } };
