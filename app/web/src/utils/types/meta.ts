import {
  FMAdv,
  FMBackground,
  FMBorder,
  FMComponent,
  FMDimension,
  FMFont,
  FMLayout,
  FMLinkTag,
  FMPadding,
  FNBackground,
  FNBorder,
  FNDimension,
  FNFont,
  FNPadding,
} from "./meta-fn";

export type MetaItem = {
  id: string;
  type: "text" | "section" | "item";
  name: string;
  field?: string;
  originalId?: string;
  html?: string;
  text?: string;
  hidden?: "only-editor" | "all" | false;
};

export type BasicItem = {
  padding?: FNPadding;
  bg?: FNBackground;
  font?: FNFont;
  dim?: FNDimension;
  border?: FNBorder;
};

export type MBasicItem = {
  padding?: FMPadding;
  bg?: FMBackground;
  font?: FMFont;
  component?: FMComponent;
  dim?: FMDimension;
  layout?: FMLayout;
  linktag?: FMLinkTag;
  adv?: FMAdv;
  border?: FMBorder;
};
