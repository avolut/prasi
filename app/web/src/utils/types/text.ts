import { TypedArray, TypedMap } from "yjs-types";
import { BasicItem, MBasicItem, MetaItem } from "./meta";
import {
  FMAdv,
  FMLayout,
  FMLinkTag,
  FNAdv,
  FNLayout,
  FNLinkTag,
} from "./meta-fn";
import { MItem } from "./item";

export type IText = {
  mobile?: IText;
  type: "text";
  layout?: FNLayout;
  linktag?: FNLinkTag;
  text: string;
  html: string;
  adv?: FNAdv;
} & BasicItem &
  MetaItem;

export type MText = TypedMap<
  {
    type: "text";
    mobile?: MText;
    childs?: TypedArray<void>;
  } & MBasicItem &
    MetaItem
> & { parent: TypedArray<MItem> & { parent: MItem } };
