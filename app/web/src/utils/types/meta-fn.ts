import { TypedMap } from "yjs-types";
import { IItem, MItem } from "./item";
import * as Y from "yjs";
import { YText } from "yjs/dist/src/internals";
export type FNLayout = {
  dir: "row" | "col" | "row-reverse" | "col-reverse";
  align: FNAlign;
  gap: number | "auto";
  wrap: undefined | "flex-wrap" | "flex-nowrap";
};

export type FMLayout = TypedMap<FNLayout>;

export type FNAdv = {
  js?: Y.Text | string;
  jsBuilt?: string;
  css?: Y.Text | string;
  html?: Y.Text | string;
};

export type FMAdv = TypedMap<FNAdv>;
export type FNComponent = {
  id: string;
  name: string;
  updated_at?: number;
  props: Record<string, FNCompDef>;
};

export type FNCompDef = {
  idx: number;
  type: string;
  value: any;
  valueBuilt: any;
  gen?: string;
  genBuilt?: string;
  content?: IItem;
  visible?: string;
  meta?: FNCompMeta;
};
type FNCompMeta = {
  type: "text" | "option" | "content-element";
  options?: string;
  optionsBuilt?: string;
  option_mode?: "dropdown" | "button";
};

export type FMCompDef = TypedMap<
  Omit<FNCompDef, "meta" | "content"> & {
    content: MItem;
    meta: TypedMap<FNCompMeta>;
  }
>;

export type FMComponent = TypedMap<
  Omit<FNComponent, "group" | "props"> & {
    props: TypedMap<Record<string, FMCompDef>>;
  }
>;

export type FNAlign =
  | "top-left"
  | "top-center"
  | "top-right"
  | "top"
  | "left"
  | "center"
  | "right"
  | "bottom"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "stretch";

export type FNPadding = {
  t?: number;
  b?: number;
  l?: number;
  r?: number;
};

export type FMPadding = TypedMap<FNPadding>;

export type FNDimension = {
  w?: number | "fit" | "full";
  h?: number | "fit" | "full";
  wUnit?: "px" | "%";
  hUnit?: "px" | "%";
  proportion?: boolean;
};
export type FMDimension = TypedMap<FNDimension>;

export type FNBackground = {
  color?: string;
  url?: string;
  size?: "cover" | "contain" | "full" | "auto" | "%" | "px";
  repeat?: "repeat" | "repeat-x" | "repeat-y" | "space" | "round" | "no-repeat";
  pos?: "top" | "left" | "center" | "bottom" | "right";
};

export type FMBackground = TypedMap<FNBackground>;
export type FNBorder = {
  style?: "solid" | "dash";
  stroke?: FNBorderCorner;
  rounded?: FNRounded;
  color?: string;
};
export type FNBorderCorner = {
  t?: number;
  b?: number;
  l?: number;
  r?: number;
};
export type FNRounded = {
  tr?: number;
  tl?: number;
  bl?: number;
  br?: number;
};
export type FMBorder = TypedMap<FNBorder>;
export type FNFont = {
  color?: string;
  size?: number;
  family?: string;
  height?: number | "auto";
  align?: "center" | "left" | "right";
  whitespace?:
    | "whitespace-normal"
    | "whitespace-nowrap"
    | "whitespace-pre"
    | "whitespace-pre-line"
    | "whitespace-pre-wrap"
    | "whitespace-break-spaces";
  wordBreak?: "break-normal" | "break-words" | "break-all" | "break-keep";
};
export type FMFont = TypedMap<FNFont>;

export type FNLinkTag = {
  tag?: string;
  link?: string;
  class?: string;
};
export type FMLinkTag = TypedMap<FNLinkTag>;
