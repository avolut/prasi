import {
  FMAdv,
  FMBackground,
  FMComponent,
  FMDimension,
  FMFont,
  FMLayout,
  FMLinkTag,
  FMPadding,
  FNBackground,
  FNDimension,
  FNFont,
  FNPadding,
} from "./meta-fn";

export type MetaItem = {
  id: string;
  type: "text" | "section" | "item";
  name: string;
  expand?: boolean;
  field?: string;
  collapsed?: boolean;
  deleted?: true;
  html?: string;
  text?: string;
  isPropContent?: boolean;
};

export type BasicItem = {
  padding?: FNPadding;
  bg?: FNBackground;
  font?: FNFont;
  dim?: FNDimension;
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
};
